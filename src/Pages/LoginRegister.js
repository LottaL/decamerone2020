import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { Register } from '../Components/Register';
import { Login } from '../Components/Login';

export const LoginRegister = () => {
    const [showLogin, setLogin] = useState(true);
    const toggleLogin = () => {
        setLogin(!showLogin);
    }

    if (localStorage.getItem('token')) {
        return <Redirect to='/profiili'/>
    } else {
        return (
            <div className='LoginRegister'>
                {showLogin ? 
                    <div>
                        <h1>Kirjaudu sisään</h1>
                        <Login/>
                        <p>Etkö ole vielä rekisteröitynyt?</p>
                        <a onClick={toggleLogin}>Rekisteröidy tästä</a>
                    </div> : 
                    <div>
                        <h1>Rekisteröidy käyttäjäksi</h1>
                        <Register/>
                        <p>Oletko jo jäsen?</p>
                        <a onClick={toggleLogin}>Kirjaudu sisään tästä</a>
                    </div>
                }
            </div>
        )
    }   
}