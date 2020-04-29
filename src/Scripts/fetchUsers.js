const URL = 'http://media.mw.metropolia.fi/wbma';

export const registerUser = (userObject) => {
    return fetch(URL + "/users", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject)
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        return res})
    .catch(err => console.log(err))
}

export const loginUser = (userObject) => {
    return fetch(URL + '/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject)
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err))
}

export const checkUser = (token) => {
    return fetch(URL + "/users/user", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    })
    .then(res => res.json())
    .then(res => res)
    .catch(err => console.log(err))
}

export const editUser = (token, userObject) => {
    if (userObject) {
        return fetch(URL + "/users", {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(userObject)
        })
        .then(res => res.json())
        .then(res => {
            if(res.message) {
                //no distinct error codes or messages in finnish
                return {error: res}
            } else {
                return res
            }
        })
        .catch(err => console.log(err))
    } else {
        console.log(userObject);
    }
}

export const uploadProfileImg = (token, imgObject) => {
    console.log(token);
    console.log(imgObject);
    let formData  = new FormData();
    for(const key in imgObject) {
        formData.append(key, imgObject[key]);
    }
    for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }

    return fetch(URL + "/media", {
        method: 'POST',
        headers: {
            //'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: formData
    })
    .then(res => res.json())
    .then(res => {
        console.log(res);
        return fetch(URL + "/favourites", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify({file_id: res.file_id})
        })
        .then(res => res.json())
        .then(res => res)
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

export const getImage = (token) => {
    return fetch(URL + "/favourites", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    })
    .then(res => res.json())
    .then(res => {
        let i = res.length - 1;
        return fetch(URL + "/media/" + res[i].file_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(res => res.filename)
    })
    .catch(err => console.log(err))
}

/*fetch(URL + "/users", {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userObject)
    })*/