import React from 'react';

const imgURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

export const OneText = (props) => {
    //name, username, image, description, tags
    return (
        <div className='OneText' style={ModalStyle}>
            <button onClick={props.close}>Sulje</button>
            <img src={imgURL + props.t.filename} alt='Thematic art'/>
            <h3>{props.t.title}</h3>
            <p>{props.t.description}</p>
            {localStorage.getItem('token') ? <p>Kirjoittaja: {props.t.username} Tykkäyksiä: N kpl</p>: ''}
            <p className='tags'>Aihesanat: {props.t.tag/*props.t.tags.map(tag => tag + ' ')*/}</p>
            <button>Tykkää</button>
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