import React, { createContext,  useState } from 'react';
import { useHistory } from 'react-router-dom';
import { loginUser, 
    checkUser, 
    editUser as edit, 
    registerUser as register,
    uploadProfileImg, 
    getImage
} from '../Scripts/fetchUsers';

export const UserContext = createContext();
export const UserContextProvider = (props) => {
    const [user, setUser] = useState({
        /*username: '',
        name: '',
        email: '',
        user_id: '',
        time_created: '',
        image: ''*/
    });
    const history = useHistory();

    const login = (username, password) => {
        return loginUser({username: username, password: password})
        .then(res => {
            if (res.token)
            {
                localStorage.setItem('token', res.token);
                getImage(localStorage.getItem('token'))
                    .then(res2 => setUser(
                        {
                            ...user, 
                            user_id: res.user_id, 
                            username: res.username, 
                            email: res.email, 
                            name: res.full_name,
                            time_created: res.user.time_created,
                            image: res2
                        }
                    ))
                history.push('/profiili');
                return res.token;
            } else {
                return false;
            }
        })
    }

    
    const logout = () => {
        setUser('');
        localStorage.clear();
        history.push('/');
    }

    const editUser = (userObject) => {
        edit(localStorage.getItem('token'), userObject)
        .then(res => {
            console.log(res);
            if(res.error) {
                alert("Tietojen päivitys ei onnistunut");
            }
            updateUser();
        })
    }

    const registerUser = (userObject, imgObject) => {
        register(userObject)
        .then(res => {
            if (res.user_id) {
                alert('Käyttäjä luotu!');
                login(userObject.username, userObject.password)
                .then(res => {
                    if (res) 
                    {
                        uploadProfileImg(res, imgObject);
                    } else {
                        alert('Kuvaa ei voitu ladata');
                    }
                })
            } else {
                alert('Jokin meni pieleen, yrittäkää uudelleen!');
            }
        })
    }

    const updateUser = () => {
        return checkUser(localStorage.getItem('token'))
            .then(res => {
                if (res.user_id) {
                    getImage(localStorage.getItem('token'))
                    .then(res2 => setUser(
                        {
                            ...user, 
                            user_id: res.user_id, 
                            username: res.username, 
                            email: res.email, 
                            name: res.full_name,
                            image: res2
                        }
                    ))
                    return res.user_id;
                } else {
                    setUser('');
                    localStorage.clear();
                    return false;
                }
            })
    }
    return (
        <UserContext.Provider value={{user, login, updateUser, logout, editUser, registerUser}}>
            {props.children}
        </UserContext.Provider>
    );
}