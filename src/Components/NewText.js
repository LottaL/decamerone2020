import React, { useState, useContext } from 'react';
import { TextContext, TextListContext } from '../Contexts/TextContexts';
import newTextIcon from '../img/newText_white.png';

export const NewText = (props) => {
    const { saveText } = useContext(TextContext);
    const { updateTexts } = useContext(TextListContext);

    const [showForm, setForm] = useState(false);
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
            setForm(!showForm);
        })
    }
    return (
        <div>
            {showForm ? 
                <form onSubmit={handleSubmit}>
                    <h3>Luo uusi teksti</h3>
                    <br></br>
                    <label className='newTitle'>Tekstin nimi <p className='note'>* pakollinen</p></label>
                    <input className='newTitle' type="text" 
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
                    <label>Kuva <p className='note'>* pakollinen</p></label>
                    <input type="file" 
                        required
                        onChange={(evt) => 
                            setImage(evt.target.files[0])}/>
                    <label>Aihesanat</label>
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
                    <div className='buttonContainer newText'>
                        <input className='openBTN' type="submit" value="Tallenna" style={{backgroundColor: '#00b359'}}/>
                        <button className='openBTN' onClick={() => setForm(!showForm)}>Sulje</button>
                    </div>
                </form>
                :
                <button className='openBTN' onClick={() => setForm(!showForm)}>
                    <p className='iconText'>
                        <img className='icon' alt='muokkaa' src={newTextIcon}/>
                        Luo uusi
                    </p>
                </button>
            }
        </div>
    )
}