import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContexts';

import { EditUser } from './EditUser';

import defaultIMG from '../img/DefaultUser.jpg'

const imgURL = 'http://media.mw.metropolia.fi/wbma/uploads/';
//{user.image ? imgURL + user.image : '/img/DefaultUser.jpg'}
export const UserInfo = () => {
    const { user } = useContext(UserContext);
    return (
        <div className='UserInfo'>
            <h2>{user.username}</h2>
            <div className='userContainer'>
                <img className='profileIMG' src={user.image ? imgURL + user.image : defaultIMG} alt='profile'/>
                <ul>
                    <li>{user.name}</li>
                    <li>{user.username}</li>
                    <li>{user.email}</li>
                </ul>
            </div>
            <EditUser/>
        </div>
    );
}