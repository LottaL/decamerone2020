import React, { useState, useContext } from 'react';
import { TextContext } from '../Contexts/TextContexts';

const imgURL = 'http://media.mw.metropolia.fi/wbma/uploads/';

export const EditText = (props) => {
    //edit function etc here
    const { editText } = useContext(TextContext);

    const [title, setTitle] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState('');
    const [description, setDesc] = useState('');
    const [isPrivate, setPrivate] = useState(false);

    const handleSubmit = (evt) => {
        evt.preventDefault();
        let textObj = {
            title: title,
            description: description
        } 
        let trimmed = tags.split(' ').map(t => t.trim().toLowerCase());
        let visibility = isPrivate ? 'private' : 'public';
        let tagArray = ['decamerone', visibility, ...trimmed];
        console.log(textObj, tagArray);
        editText(textObj, tags, props.t.file_id)
    }

    return (
        <div className='EditText' style={ModalStyle}>
            <form onSubmit={handleSubmit} style={formStyle}>
                <button onClick={props.close}>Sulje</button>
                <h3>Muokkaa tekstiä</h3>
                <br></br>
                <img src={imgURL + props.t.filename} alt='Thematic art'/>
                <input type="text" 
                    value={title} 
                    placeholder={props.t.title} 
                    onChange={(evt) => 
                        setTitle(evt.target.value)}/>
                <textarea type="text" 
                    value={description} 
                    placeholder={props.t.description}
                    onChange={(evt) => 
                        setDesc(evt.target.value)}/>        
                <input type="text"
                    value={tags} 
                    placeholder={props.t.tags.map(i => { 
                            if (i !== 'public' && i !== 'private' && i !== 'decamerone') {
                                return i + ' '
                            }
                        })}            
                    onChange={(evt) => 
                        setTags(evt.target.value)}/>
                <label>Vain rekisteröityneille</label>
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
        </div>
    );
}

const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    width: '60vh',
    margin: 'auto',
    border: 'dotted 2px #00b359'
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