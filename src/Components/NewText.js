import React, { useState, useContext } from 'react';
import { TextContext, TextListContext } from '../Contexts/TextContexts';

export const NewText = (props) => {
    const { saveText } = useContext(TextContext);
    const { updateTexts } = useContext(TextListContext);

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');
    const [description, setDesc] = useState('');
    const [isPrivate, setPrivate] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let textObj = {
            file: image,
            title: title,
            description: description
        } 
        let trimmed = tags.split(' ').map(t => t.trim().toLowerCase());
        let visibility = isPrivate ? 'private' : 'public';
        let tagArray = ['decamerone', visibility, ...trimmed];
        saveText(textObj, tagArray)
        .then(res => {
            console.log(res);
            updateTexts();
            props.toggleForm();
        })
    }
    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <h3>Luo uusi teksti</h3>
            <br></br>
            <label>Tekstin nimi</label>
            <input type="text" 
                value={title} 
                required 
                onChange={(evt) => 
                    setTitle(evt.target.value)}/>
            <label>Teksti</label>
            <textarea type="text" 
                value={description} 
                required 
                onChange={(evt) => 
                    setDesc(evt.target.value)}/>
            <label>Kuva</label>
            <input type="file" 
                required
                onChange={(evt) => 
                    setImage(evt.target.files[0])}/>
            <label>Tunnisteet</label>
            <input type="text"
                value={tags} 
                onChange={(evt) => 
                    setTags(evt.target.value)}/>
            <label>Vain rekisteröityneille</label>
            <p className='note'>Huom! Julkista tekstiä ei voi jälkeenpäin muuttaa yksityiseksi!</p>
            <input
                name="isPrivate"
                type="checkbox"
                checked={isPrivate}
                onChange={(evt) => {
                    if (isPrivate) {
                        console.log(evt.target.checked)
                        setPrivate(evt.target.checked)
                    } else { 
                        console.log(evt.target.value)
                        setPrivate(evt.target.value)
                    }
                }} />
            <input type="submit" value="Tallenna" style={{backgroundColor: '#00b359'}}/>
        </form>
    )
}
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    width: '60vh',
    margin: 'auto',
    border: 'dotted 2px #00b359'
}