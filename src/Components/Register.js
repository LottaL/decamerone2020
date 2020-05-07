import React, { useState, useContext, useEffect } from 'react';
//import { registerUser } from '../Scripts/fetchUsers';
import { UserContext } from '../Contexts/UserContexts';

export const Register = () => {
    const { registerUser } = useContext(UserContext);

    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    
    const handleSubmit = (evt) => {
        evt.preventDefault();
        //redirect on login
        if (password === password2) {
            registerUser(
                {username: username, password: password, email: email, full_name: name}, 
                {file: image, title: username, description: 'profile'}
                );
        } else {
            alert('Korjaa salasana!');
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <br></br>
            <label>Etunimi sukunimi</label>
            <input type="text" 
                value={name} 
                required 
                onChange={(evt) => 
                    setName(evt.target.value)}/>
            <label>Käyttäjänimi</label>
            <input type="text" 
                value={username} 
                required 
                onChange={(evt) => 
                    setUsername(evt.target.value)}/>
            <label>Sähköposti</label>
            <input type="text" 
                value={email} 
                required 
                onChange={(evt) => 
                    setEmail(evt.target.value)}/>
            <label>Kuva</label>
            <input type="file"    
                onChange={(evt) => 
                    setImage(evt.target.files[0])}/>
            <label>Salasana</label>
            <input type="password"
                value={password} 
                required
                onChange={(evt) => 
                    setPassword(evt.target.value)}/>
            <label>Salasana uudelleen</label>
            <input type="password"
                value={password2} 
                required
                onChange={(evt) => 
                    setPassword2(evt.target.value)}/>
            <input className='openBTN' type="submit" value="Rekisteröidy" style={{backgroundColor: '#00b359'}}/>
        </form>
    )
}