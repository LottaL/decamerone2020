import React, { useContext, useState, useEffect } from 'react';
import { TextList } from '../Components/TextList';
import { NewText } from '../Components/NewText';
import { TextListContext } from '../Contexts/TextContexts';
import { UserContext } from '../Contexts/UserContexts';

export const Texts = () => {
    const { updateTexts } = useContext(TextListContext);
    const { updateUser } = useContext(UserContext);
    const [state, setState] = useState(
        {showForm: false}
    );

    const toggleForm = (e) => {
        e.preventDefault();
        setState({showForm: !state.showForm});
    }
    
    const checkAuth = () => {
        updateUser()
        .then(res => {
            console.log(res);
        })
    }

    useEffect(() => {
        updateTexts();
        updateUser();
    }, [])
    return (
        <div className='Texts'>
            <h1>Kirjoitukset</h1>
            <button onClick={toggleForm}>{state.showForm ? 'Sulje' : 'Lisää uusi teksti'}</button>
            {state.showForm ? <NewText/> : ''}
            <TextList/>
        </div>
    );
}