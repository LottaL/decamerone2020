import React, { useContext, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { UserInfo } from '../Components/UserInfo';
import { NewText } from '../Components/NewText';
import { TextList } from '../Components/TextList';
import { UserContext } from '../Contexts/UserContexts';
import { TextListContext } from '../Contexts/TextContexts';

export const Profile = () => {
    const { updateUser } = useContext(UserContext);
    const { logout } = useContext(UserContext);
    const { updateOwnTexts } = useContext(TextListContext)
    const history = useHistory();

    const checkAuth = () => {
        updateUser()
        .then(res => {
            if (res) {
                history.push('/profiili')
            }
        })
    }

    useEffect(() => {
        checkAuth();
        updateOwnTexts();
    }, [])
    
    if (!localStorage.getItem('token')) {
        return <Redirect to='/'/>
    } else {
        return (
            <div className='Profile'>
                <h1>Profiili</h1>
                <UserInfo/>
                <button onClick={logout}>Kirjaudu ulos</button>
                <NewText/>
                <TextList/>
            </div>
        )
    }
}