import React, { useContext } from 'react';
import { TextContext, TextListContext } from '../Contexts/TextContexts';
import { UserContext } from '../Contexts/UserContexts';
import authorIcon from '../img/quillBottle_black.png';
import likeIcon_black from '../img/like_black.png';
import likeIcon_white from '../img/like_white.png';
import unlikeIcon from '../img/unlike_white.png';
import newTextIcon from '../img/newText_white.png'

const imgURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

export const OneText = (props) => {
    const { updateTexts } = useContext(TextListContext);
    const { likeText } = useContext(TextContext);
    const { unlikeText } = useContext(TextContext);
    const { user } = useContext(UserContext);

    const likeAndUpdate = (e) => {
        e.preventDefault();
        console.log('like');
        likeText(props.t.file_id)
        .then(res => updateTexts())
    }

    const unlikeAndUpdate = (e) => {
        e.preventDefault();
        console.log('unlike');
        unlikeText(props.t.file_id)
        .then(res => updateTexts())
    }

    const switchView = (e) => {
        if (e) e.preventDefault();
        props.setContent('edit');
    }

    return (
        <div className='OneText'>
            {props.t ?
                <div>
                    <img className='illustration' src={imgURL + props.t.filename} alt='kuvituskuva'/>
                    <h3>{props.t.title}</h3>
                    <p className='novella'>{props.t.description}</p>
                    {localStorage.getItem('token') ? 
                            <div>   
                                <p className='iconText info'>
                                    <img className='icon' alt='kirjoittaja' src={authorIcon}/>
                                    {props.t.author ? props.t.author.username : ''} 
                                </p>
                                <p className='iconText info'>
                                    <img className='icon' alt='tykkäyksiä' src={likeIcon_black}/>
                                    {props.t.likes? props.t.likes.length : ''}
                                </p>
                                {props.t.likes.filter(like => { return like.user_id === user.user_id }).length > 0 ? 
                                    <button className='openBTN' onClick={unlikeAndUpdate}>
                                        <p className='iconText'>
                                            <img className='icon' alt='ikoni' src={unlikeIcon}/>
                                            Peru tykkäys
                                        </p>
                                    </button>
                                    :
                                    <button className='openBTN' onClick={likeAndUpdate}>
                                        <p className='iconText'>
                                            <img className='icon' alt='ikoni' src={likeIcon_white}/>
                                            Tykkää
                                        </p>
                                    </button>
                                }
                            </div>
                        : ''
                    }
                    {props.t.author ? 
                        (user.user_id === props.t.author.user_id ? 
                            <button className='openBTN' onClick={switchView}>
                                <p className='iconText'>
                                    <img className='icon' alt='muokkaa' src={newTextIcon}/>
                                    Muokkaa
                                </p>
                            </button>
                            : '')
                        : ''
                    }
                    <p className='tags'>Aihesanat: {props.t.tags.map(i => { 
                        if (i !== 'public' && i !== 'private' && i !== 'decamerone') {
                            return i + ' '}
                        })}
                    </p>
                </div>
                :
                ''
            }
        </div>
    );
}

const ModalStyle = {
    display: 'flex',
    position: 'absolute',
    backgroundColor: 'lightgray',
    flexDirection: 'column',
    textDecoration: 'none',
    width: '80vh',
    margin: 'auto',
    border: 'dotted 2px #00b359'
}