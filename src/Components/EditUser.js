import React, { useState, useContext, useEffect } from 'react';

import { UserContext } from '../Contexts/UserContexts';

import { uploadProfileImg } from '../Scripts/fetchUsers';

export const EditUser = () => {
    const { updateUser } = useContext(UserContext);
    const { editUser } = useContext(UserContext);
    const { user } = useContext(UserContext);

    const [showForm, setForm] = useState(false);
    const [username, setUsername] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [email, setEmail] = useState('');
    const [image, setImage] = useState('');
    
    const close = () => {
        setForm(false);
        setUsername('');
        setName('');
        setPassword('');
        setPassword2('');
        setEmail('');
        setImage('');
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let userObject = {};
        let state = {
            username: username, 
            password: password, 
            email: email, 
            full_name: name
        };
        for (let obj in state) {          
            if (state[obj]) {
                userObject[obj] = state[obj];
            }
        }
        editUser(userObject, {file: image, title: user.username, description: 'profile'});
    }

    return (
        <div>
        {showForm ?
        <form onSubmit={handleSubmit}>
            <h3>Muokkaa käyttäjätietoja</h3>
            <label>Etunimi sukunimi</label>
            <input type="text" 
                value={name}  
                onChange={(evt) => 
                    setName(evt.target.value)}/>
            <label>Käyttäjänimi</label>
            <input type="text" 
                value={username} 
                onChange={(evt) => 
                    setUsername(evt.target.value)}/>
            <label>Sähköposti</label>
            <input type="text" 
                value={email} 
                onChange={(evt) => 
                    setEmail(evt.target.value)}/>
            <label>Kuva</label>
            <input type="file"    
                onChange={(evt) => 
                    setImage(evt.target.files[0])}/>
            <label>Salasana</label>
            <input type="password"
                value={password} 
                onChange={(evt) => 
                    setPassword(evt.target.value)}/>
            <label>Salasana uudelleen</label>
            <input type="password"
                value={password2} 
                onChange={(evt) => 
                    setPassword2(evt.target.value)}/>
            <div className='buttonContainer'>
                <input className='openBTN' type="submit" value="Lähetä tiedot" style={{backgroundColor: '#00b359'}}/>
                <button className='openBTN' onClick={close}>peruuta</button>
            </div>
            
        </form>
        :
        <button className='openBTN' onClick={() => setForm(true)}>Muokkaa käyttäjätietoja</button>
        }
        </div>
    )
}