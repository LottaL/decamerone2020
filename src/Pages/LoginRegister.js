import React from 'react';
import { Redirect } from 'react-router-dom';
import { Register } from '../Components/Register';
import { Login } from '../Components/Login';

export const LoginRegister = () => {
    //const { user } = useContext(UserContext);
    if (localStorage.getItem('token')) {
        return <Redirect to='/profiili'/>
    } else {
        return (
            <div className='LoginRegister'>
                <h1>Kirjaudu sisään</h1>
                <Login/>
                <Register/>
            </div>
        )
    }   
}