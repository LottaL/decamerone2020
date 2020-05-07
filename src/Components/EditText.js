import React, { useState, useContext } from 'react';
import { TextContext, TextListContext } from '../Contexts/TextContexts';

const imgURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

export const EditText = (props) => {
    //edit function etc here
    const { editText } = useContext(TextContext);
    const { updateTexts } = useContext(TextListContext);
    const { deleteText } = useContext(TextContext);

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [description, setDesc] = useState('');
    const [isPrivate, setPrivate] = useState(false);

    const verifyDelete = (evt) => {
        evt.preventDefault();
        if (window.confirm('Olet poistamassa tekstiä. Jatketaanko?')) {
            deleteText(props.t.file_id)
            .then(res => {
                if (res.message === 'File deleted') {
                    props.close();
                    alert('Tiedosto poistettu');
                    updateTexts();
                }
            })
        }
    }

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let textObj = {
            title: title,
            description: description
        } 
        let trimmed = tags.split(' ').map(t => t.trim().toLowerCase());
        let visibility = isPrivate ? 'private' : 'public';
        let tagArray = [...trimmed, visibility];
        console.log(textObj, tagArray);
        editText(textObj, tagArray, props.t.file_id)
        .then(res => {
            props.close();
            updateTexts();
        })
    }

    return (
        <div className='EditText' >
            <form onSubmit={handleSubmit}>
                <button className='openBTN' onClick={() => props.setContent('view')}>Paluu katseluun</button>
                <h3>Muokkaa tekstiä</h3>
                <img className='illustration' src={imgURL + props.t.filename} alt='Kuvituskuva'/>
                <label>Uusi otsikko</label>
                <input type="text" 
                    value={title} 
                    placeholder={props.t.title} 
                    onChange={(evt) => 
                        setTitle(evt.target.value)}/>
                <label>Muokattu teksti</label>
                <textarea type="text" 
                    value={description} 
                    placeholder={props.t.description}
                    onChange={(evt) => 
                        setDesc(evt.target.value)}/>
                <label className='tags'>Asiasanat: {props.t.tags.map(i => { 
                            if (i !== 'public' && i !== 'private' && i !== 'decamerone') {
                                return i + ' '
                            }
                        })}</label>        
                <input type="text"
                    value={tags} 
                    placeholder={'lisää asiasanoja'}           
                    onChange={(evt) => 
                        setTags(evt.target.value)}/>
                <label>Vain rekisteröityneille </label>
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
                <div className='buttonContainer'>
                    <input className='openBTN' type="submit" value="Tallenna" style={{backgroundColor: '#00b359'}}/>
                    <p className='note'>Huom! Poistettu teksti poistuu pysyvästi.</p>
                    <button className='openBTN delete' onClick={verifyDelete}>Poista teksti</button>
                </div>
                
            </form>
            <br></br>     
        </div>
    );
}