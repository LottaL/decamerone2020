import React, { useState, useContext } from 'react';
import { OneText } from './OneText';
import { EditText } from './EditText';
import { UserContext } from '../Contexts/UserContexts';
import authorIcon from '../img/quillBottle_black.png';
import likeIcon from '../img/like_black.png';
import newTextIcon from '../img/newText_white.png'

const imgURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

export const TextCard = (props) => {

    const [state, setState] = useState(
        {
            showForm: false,
            showEdit: false
        }
    );
    const { user } = useContext(UserContext);
    const toggleForm = (e) => {
        e.preventDefault();
        setState({showForm: !state.showForm});
    }
    const toggleEdit = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setState({showEdit: !state.showEdit});
    }

    //name, username, image, description, tags
    if (props.t)
    {
        return (
        <div className={props.addClass ? 'TextCard onHomepage' : 'TextCard'} onClick={toggleForm} >
            <h3>{props.t.title}</h3>
            <img className='cardIMG' src={imgURL + props.t.filename} alt='Thematic art'/>  
            <p>
                {props.t.description.slice(0, 100)}
                {props.t.description.length >= 100 ? '...' : ''}
            </p>
            <button className='openBTN' onClick={toggleForm}>Avaa koko teksti</button>
            {props.t.author ? 
                (user.user_id === props.t.author.user_id ? 
                    <button className='openBTN' onClick={toggleEdit}>
                        <p className='iconText'>
                            <img className='icon' alt='muokkaa' src={newTextIcon}/>
                            Muokkaa
                        </p>
                    </button>
                    : '')
                 : ''}
            {localStorage.getItem('token') ? 
                <p>   
                    <p className='iconText'>
                        <img className='icon' alt='kirjoittaja' src={authorIcon}/>
                        {props.t.author ? props.t.author.username : ''} 
                    </p>
                    <p className='iconText'>
                        <img className='icon' alt='tykkäyksiä' src={likeIcon}/>
                        {props.t.likes? props.t.likes.length : ''}
                    </p>
                </p>
                : 
                ''}
            <p className='tags'>Aihesanat: {props.t.tags.map(i => { 
                if (i !== 'public' && i !== 'private' && i !== 'decamerone') {
                    return i + ' '
                }
                })}</p>

            {state.showForm ? <OneText 
                t={props.t} 
                close={toggleForm} 
                /*isCurrentUser={user.user_id === props.t.author.user_id}*/
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