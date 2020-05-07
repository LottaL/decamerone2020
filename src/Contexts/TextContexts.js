import React, { createContext,  useState } from 'react';
import { 
    getTexts, 
    postText, 
    getAuthors, 
    getOwnTexts,
    putText,
    addTags,
    delText, 
    addLike,
    removeLike
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
        setText(inputObject);
    }

    const saveText = (inputObject, tags) => {
        return postText(localStorage.getItem('token'), inputObject, tags);
    }

    const deleteText = (file_id) => {
        return delText(localStorage.getItem('token'), file_id)
        .then(res => {
            return res;
        });
    }

    const editText = (textObj, tags, file_id) => {
        return putText(localStorage.getItem('token'), textObj, tags, file_id)
        .then(res => {
            return addTags(localStorage.getItem('token'), tags, file_id)
            .then(res => true)
        });
        
    }

    const likeText = (file_id) => {
        return addLike(localStorage.getItem('token'), file_id)
        .then(res => {
            if (res) {
                console.log('liked');
            } else {
                console.log('cannot like');
            }
            return res;
        })
    }

    const unlikeText = (file_id) => {
        return removeLike(localStorage.getItem('token'), file_id)
        .then(res => {
            if (res) {
                console.log('unliked');
            } else {
                console.log('cannot unlike');
            }
            return res;
        })
    }

    return (
        <TextContext.Provider value={{text, oneText, saveText, editText, deleteText, likeText, unlikeText}}>
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