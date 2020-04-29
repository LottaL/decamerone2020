const URL = 'http://media.mw.metropolia.fi/wbma';

export const getTexts = (token) => {
    if (token) {
    return fetch(URL + '/tags/decamerone')
        .then(res => res.json())
        .then(res => {
            let promises = res.map((text) => {
                return fetch(URL + "/tags/file/" + text.file_id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then((res) => {
                    
                    text.tags = res.map(r => r.tag);
                    return text;
                })
            })
            return Promise.all(promises)
            .then(responses => {
                //console.log(responses);
                return responses;
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    } else {
        return fetch(URL + '/tags/public')
        .then(res => res.json())
        .then(res => {
            let promises = res.map((text) => {
                return fetch(URL + "/tags/file/" + text.file_id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then((res) => {
                    text.tags = res.map(r => r.tag);
                    return text;
                })
            })
            return Promise.all(promises)
            .then(responses => {
                let filtered = responses.filter(r => {
                    return r.tags.includes('decamerone');
                })
                return filtered;
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
    }
}

export const getAuthors = (token, texts) => {
    let promises = texts.map(text => 
        fetch(URL + "/users/" + text.user_id, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            }
        })
        .then(res => res.json())
        .then(res => {
            text.author = {user_id: res.user_id, username: res.username};
            return text;
        })
        .catch(err => console.log(err))
    )
    return Promise.all(promises);
}

export const getOwnTexts = (token) => {
    return fetch(URL + "/media/user", {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        }
    })
        .then(res => res.json())
        .then(res => {
            let promises = res.map((text) => {
                return fetch(URL + "/tags/file/" + text.file_id, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(res => res.json())
                .then((res) => {   
                    text.tags = res.map(r => r.tag);
                    return text;
                })
            })
            return Promise.all(promises)
            .then(responses => {
                let filtered = responses.filter(r => {
                    return r.tags.includes('decamerone');
                })
                return filtered;
            })
            .catch(err => console.log(err))
        })
        .catch(err => console.log(err))
}

export const postText = (token, inputObj, tags) => {
    let formData  = new FormData();
    for(const key in inputObj) {
        formData.append(key, inputObj[key]);
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
        //tagging
        let promises = tags.map((tag) => {
            return fetch(URL + "/tags", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': token
                },
                body: JSON.stringify({file_id: res.file_id, tag: tag})
            })
        })
        Promise.all(promises)
        .then(responses => {
            for (let r in responses) {
                console.log(r);
            }
        })
        .catch(err => console.log(err))
    })
    .catch(err => console.log(err))
}

export const putText = (token, textObj, tags, file_id) => {
    return fetch(URL + "/media/" + file_id, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
        },
        body: JSON.stringify(textObj)
    })
    .then(res => res.json())
    .then(res => {
        return res
    })
    .catch(err => console.log(err))
}