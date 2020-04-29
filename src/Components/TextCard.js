import React, { useState, useContext } from 'react';
import { OneText } from './OneText';
import { EditText } from './EditText';
import { UserContext } from '../Contexts/UserContexts';

const imgURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

export const TextCard = (props) => {
    const [state, setState] = useState(
        {
            showForm: false,
            showEdit: false
        }
    );
    const { user } = useContext(UserContext);
        console.log(user);
    const toggleForm = (e) => {
        e.preventDefault();
        setState({showForm: !state.showForm});
    }
    const toggleEdit = (e) => {
        e.preventDefault();
        setState({showEdit: !state.showEdit});
    }

    //name, username, image, description, tags
    if (props.t)
    {
        return (
        <div className='TextCard' style={formStyle}>
            <img src={imgURL + props.t.filename} alt='Thematic art'/>
            <h3>{props.t.title}</h3>
            <p>{props.t.description}</p>{/*only part of this (preview), not all!*/}
            <button onClick={toggleForm}>Avaa koko teksti</button>
            {props.t.author ? 
                (user.user_id === props.t.author.user_id ? 
                    <button onClick={toggleEdit}>Muokkaa</button> 
                    : '')
                 : ''}
            {localStorage.getItem('token') ? <p>Kirjoittaja: {props.t.author ? props.t.author.username : ''} Tykkäyksiä: N kpl</p>: ''}
            <p className='tags'>Aihesanat: {props.t.tags.map(i => { 
                if (i !== 'public' && i !== 'private' && i !== 'decamerone') {
                    return i + ' '
                }
                })}</p>

            {state.showForm ? <OneText 
                t={props.t} 
                close={toggleForm} 
                isCurrentUser={user.user_id === props.t.author.user_id}
                /> : ''
            }
            {state.showEdit ? <EditText 
                t={props.t} 
                close={toggleEdit} 
                isCurrentUser={user.user_id === props.t.author.user_id}
                /> : ''
            }
        </div>
        )
    } else {
        return (
            <div className='TextCard' style={formStyle}>
            
            </div>
        )
    }
}

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    width: '60vh',
    margin: 'auto',
    marginTop: '4vh',
    border: 'dotted 2px #00b359'
}