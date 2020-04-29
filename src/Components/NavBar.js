import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../Contexts/UserContexts';

export const NavBar = () => {
    const { logout } = useContext(UserContext);

    return (
        <div className='NavBar' >
            <header>Decamerone</header>
            <div style={navStyle}>
                <Link to='/'>Etusivu</Link>
                <Link to='/tietoa'>Tietoja meistä</Link>
                <Link to='/kirjoitukset'>Katsele kirjoituksia</Link>
                {localStorage.getItem('token') ? 
                    <Link to='/profiili'>Profiili</Link>
                    :
                    <Link to='/kirjaudu'>Kirjaudu sisään</Link>
                }
                {localStorage.getItem('token') && 
                    <Link to='/' onClick={logout}>Kirjaudu ulos</Link>
                }
            </div>
        </div>
    );
}

const navStyle = {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    backgroundColor: '#00b359',
    padding: '2vh'
}