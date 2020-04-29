import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContexts';

import { EditUser } from './EditUser';

import defaultIMG from '../img/DefaultUser.jpg'

const imgURL = 'http://media.mw.metropolia.fi/wbma/uploads/';
//{user.image ? imgURL + user.image : '/img/DefaultUser.jpg'}
export const UserInfo = () => {
    const { user } = useContext(UserContext);
    return (
        <div className='UserInfo' style={profileBoxStyle}>
            <img className='ProfileImg' src={user.image ? imgURL + user.image : defaultIMG} alt='profile' style={profileImageStyle}/>
            <ul>
                <li>{user.name}</li>
                <li>{user.username}</li>
                <li>{user.email}</li>
            </ul>
            <EditUser/>
        </div>
    );
}

const profileImageStyle = {
    width: '20vh', 
    height: '30vh'
}

const profileBoxStyle = {
    width: '60vh',
    margin: 'auto',
    border: 'dotted 2px #00b359'
}