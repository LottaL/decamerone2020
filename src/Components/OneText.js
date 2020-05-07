import React, { useContext } from 'react';
import { TextContext, TextListContext } from '../Contexts/TextContexts';
import { UserContext } from '../Contexts/UserContexts';

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

    return (
        <div className='OneText' style={ModalStyle}>
            <button onClick={props.close}>Sulje</button>
            {props.t ?
                <div>
                    <img src={imgURL + props.t.filename} alt='Thematic art'/>
                    <h3>{props.t.title}</h3>
                    <p>{props.t.description}</p>
                    {localStorage.getItem('token') ? 
                        <p>
                            Kirjoittaja: {props.t.author ? props.t.author.username : ''}
                            <br></br> 
                            Tykkäyksiä: {props.t.likes ? props.t.likes.length : ''}
                            <br></br>
                            {props.t.likes.filter(like => { return like.user_id === user.user_id }).length > 0 ? 
                            <button className='like' onClick={unlikeAndUpdate}>Peru tykkäys</button>
                            :
                            <button className='unlike' onClick={likeAndUpdate}>Tykkää</button>
                            }
                        </p>
                        : ''}
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