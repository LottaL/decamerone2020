import React, { useContext, useEffect, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import { UserInfo } from '../Components/UserInfo';
import { NewText } from '../Components/NewText';
import { TextList } from '../Components/TextList';
import { UserContext } from '../Contexts/UserContexts';
import { TextListContext } from '../Contexts/TextContexts';

export const Profile = () => {
    const { texts } = useContext(TextListContext);
    const { updateUser } = useContext(UserContext);
    const { logout } = useContext(UserContext);
    const { updateOwnTexts } = useContext(TextListContext)
    const history = useHistory();

    const [showTexts, setTexts] = useState(false);

    const checkAuth = () => {
        updateUser()
        .then(res => {
            if (res) {
                history.push('/profiili')
            }
        })
    }

    const seeTexts = () => {
        setTexts(true);
        const element = document.getElementById('ownTexts');
        console.log(element)
        if (element) element.scrollIntoView({behavior: 'smooth'});
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
                <button className='openBTN' onClick={logout}>Kirjaudu ulos</button>
                <UserInfo/>
                <div className='newTextContainer'>
                    <a onClick={seeTexts}><h3>Olet kirjoittanut {texts.length} julkaisua</h3></a>
                    <NewText/>
                </div>
                <div id='ownTexts' className='ownTexts'>
                    <h2>Tarkastele omia tekstejäsi</h2>
                    <TextList/>
                </div>
            </div>
        )
    }
}