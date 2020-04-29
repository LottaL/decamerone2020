import React, { createContext,  useState } from 'react';
import { 
    getTexts, 
    postText, 
    getAuthors, 
    getOwnTexts,
    putText 
} from '../Scripts/fetchTexts';

//creating and updating texts
export const TextContext = createContext();
export const TextContextProvider = (props) => {
    const [text, setText] = useState(
        {
            name: '',
            username: '', 
            image: 'img/DefaultUser.jpg',
            description: '',// = the text
            tags : []
        }
    );
    const oneText = (inputObject) => {
        setText(inputObject)
    }

    const saveText = (inputObject, tags) => {
        postText(localStorage.getItem('token'), inputObject, tags)
    }

    const editText = (textObj, tags, file_id) => {
        putText(localStorage.getItem('token'), textObj, tags, file_id)
        .then(res => console.log(res))
    }

    return (
        <TextContext.Provider value={{text, oneText, saveText, editText}}>
            {props.children}
        </TextContext.Provider>
    );
}

//fetching several texts
export const TextListContext = createContext();
export const TextListContextProvider = (props) => {
    const [texts, setTexts] = useState(
        []
    );

    const updateTexts = () => {
        getTexts(localStorage.getItem('token')).then(list => {
            setTexts(list);
            if (localStorage.getItem('token')) {
                getAuthors(localStorage.getItem('token'), list)
                .then(res => setTexts(res))
            }
            console.log(list)});
    }
    
    const updateOwnTexts = () => {
        getOwnTexts(localStorage.getItem('token'))
        .then(list => 
            getAuthors(localStorage.getItem('token'), list)
            .then(res => {setTexts(res);
            console.log(res)})
        )
    }

    const newText = (name, username, image, description, tags) => {
        setTexts([...texts, {name, username, image, description, tags}]);
    }
    return (
        <TextListContext.Provider value={{texts, updateTexts, newText, updateOwnTexts}}>
            {props.children}
        </TextListContext.Provider>
    );
}