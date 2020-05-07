import React, { useState, useContext } from 'react';
import { OneText } from './OneText';
import { EditText } from './EditText';
import { Modal } from './Modal';
import { UserContext } from '../Contexts/UserContexts';
import authorIcon from '../img/quillBottle_black.png';
import likeIcon from '../img/like_black.png';
import newTextIcon from '../img/newText_white.png'

const imgURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

export const TextCard = (props) => {
    const [showModal, setModal] = useState(false);
    const [modalContent, setContent] = useState('view');
    const { user } = useContext(UserContext);

    const toggleEdit = (e) => {
        console.log('toggle edit')
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setContent('edit');
        setModal(!showModal);
        console.log(showModal);
    }

    const toggleView = (e) => {
        if (e) {
            e.preventDefault();
            e.stopPropagation();
        }
        setContent('view');
        setModal(!showModal);
        console.log(showModal);
    }

    //name, username, image, description, tags
    if (props.t)
    {
        return (
        <div className={props.addClass ? 'TextCard onHomepage' : 'TextCard'} onClick={toggleView} >
            <h3>
                {props.t.title.slice(0, 30)}
                {props.t.title.length >= 30 ? '...' : ''}
            </h3>
            <img className='cardIMG' src={imgURL + props.t.filename} alt='Thematic art'/>  
            <p>
                {props.t.description.slice(0, 100)}
                {props.t.description.length >= 100 ? '...' : ''}
            </p>
            <button className='openBTN' onClick={toggleView}>Avaa koko teksti</button>
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
                <div>   
                    <p className='iconText info'>
                        <img className='icon' alt='kirjoittaja' src={authorIcon}/>
                        {props.t.author ? props.t.author.username : ''} 
                    </p>
                    <p className='iconText info'>
                        <img className='icon' alt='tykkäyksiä' src={likeIcon}/>
                        {props.t.likes? props.t.likes.length : ''}
                    </p>
                </div>
                : 
                ''}
            <p className='tags'>Aihesanat: {props.t.tags.map(i => { 
                if (i !== 'public' && i !== 'private' && i !== 'decamerone') {
                    return i + ' '
                }
                })}</p>
            {showModal ? 
                <Modal 
                    t={props.t}
                    setContent={setContent}
                    setModal={setModal}
                    toggleView={toggleView}
                    toggleEdit={toggleEdit}
                    modalContent={modalContent}/> 
                : 
                ''}
        </div>
        )
    } else {
        return (
            <div className='TextCard'>
                Haetaan...
            </div>
        )
    }
}