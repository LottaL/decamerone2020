import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';

import { UserContext } from '../Contexts/UserContexts';

import image from '../img/Decamerone.jpg'

export const NavBar = () => {
    const { logout } = useContext(UserContext);
    const [showMenu, setMenu] = useState(false);

    const findCurrent = () => {
        switch (window.location.pathname) {
            case '/':
                return 'Etusivu';
            case '/tietoa':
                return 'Tietoja';
            case '/kirjoitukset':
                return 'Katsele kirjoituksia';
            case '/profiili':
                return 'Profiili';
            case '/kirjaudu':
                return 'Kirjaudu';
            default:
                return '';
        }
    }

    const toggleMenu = () => {
        setMenu(!showMenu);
    }

    return (
        <div className='NavBar' >
            <div id='headerNav'>
                <header><p>Decamerone</p></header>
                <div className='menuDesktop menuItems'>
                    <Link to='/' 
                        className={window.location.pathname === '/' ? 'current' : ''}>
                            Etusivu</Link>
                    <Link to='/tietoa' 
                        className={window.location.pathname === '/tietoa' ? 'current' : ''}>
                            Tietoja meistä</Link>
                    <Link to='/kirjoitukset' 
                        className={window.location.pathname === '/kirjoitukset' ? 'current' : ''}>
                            Katsele kirjoituksia</Link>
                    {localStorage.getItem('token') ? 
                        <Link to='/profiili' 
                            className={window.location.pathname === '/profiili' ? 'current' : ''}>
                                Profiili</Link>
                        :
                        <Link to='/kirjaudu' 
                            className={window.location.pathname === '/kirjaudu' ? 'current' : ''}>
                                Kirjaudu sisään</Link>
                    }
                    {localStorage.getItem('token') && 
                        <Link to='/' onClick={logout}>
                            Kirjaudu ulos</Link>
                    }
                </div>
                <div className='menuMobile menuItems' onClick={toggleMenu}>
                    <p id='navText'>{findCurrent()}</p>
                    {/*here an arrow */}
                    <div className={showMenu ? 'arrow up' : 'arrow down'}></div>               
                </div>
            </div>
            
            <div className={showMenu ? 'dropdownMenu menuItems' : 'dropdownMenu menuItems hidden'}>
                <Link to='/' 
                    className={window.location.pathname === '/' ? 'current' : ''} onClick={toggleMenu}>
                        Etusivu</Link>
                <Link to='/tietoa' 
                    className={window.location.pathname === '/tietoa' ? 'current' : ''} onClick={toggleMenu}>
                        Tietoja meistä</Link>
                <Link to='/kirjoitukset' 
                    className={window.location.pathname === '/kirjoitukset' ? 'current' : ''} onClick={toggleMenu}>
                        Katsele kirjoituksia</Link>
                {localStorage.getItem('token') ? 
                    <Link to='/profiili' 
                        className={window.location.pathname === '/profiili' ? 'current' : ''} onClick={toggleMenu}>
                            Profiili</Link>
                    :
                    <Link to='/kirjaudu' 
                        className={window.location.pathname === '/kirjaudu' ? 'current' : ''} onClick={toggleMenu}>
                            Kirjaudu sisään</Link>
                }
                {localStorage.getItem('token') && 
                    <Link to='/' onClick={() => {
                        logout(); 
                        toggleMenu()}}>
                        Kirjaudu ulos</Link>
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