import React, { useState, useContext } from 'react';
import { UserContext } from '../Contexts/UserContexts';
import { useHistory, Redirect } from 'react-router-dom';

export const Login = () => {
    const { user } = useContext(UserContext);
    const { login } = useContext(UserContext)
    const history = useHistory();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        login(username, password)
        .then (res => {
            if (res)
            {
                console.log('Kirjauduttu sisään');
            } else {
                alert('Kirjautuminen epäonnistui');
                //tähän tietoa siitä että miksi, lisätetoa-napin taakse in eng?
            }
        })
    }

    return (
        <form onSubmit={handleSubmit}>
            <br></br>
            <label>Käyttäjänimi</label>
            <input type="text" 
                value={username} 
                required 
                onChange={(evt) => 
                    setUsername(evt.target.value)}/>
            <label>Salasana</label>
            <input type="password"
                value={password} 
                required
                onChange={(evt) => 
                    setPassword(evt.target.value)}/>
            <input className='openBTN' type="submit" value="Kirjaudu sisään" style={{backgroundColor: '#00b359'}}/>
        </form>
    )
    
}