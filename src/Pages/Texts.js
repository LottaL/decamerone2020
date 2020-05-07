import React, { useContext, useState, useEffect } from 'react';
import { TextList } from '../Components/TextList';
import { NewText } from '../Components/NewText';
import { TextListContext } from '../Contexts/TextContexts';
import { UserContext } from '../Contexts/UserContexts';

export const Texts = () => {
    const { updateTexts } = useContext(TextListContext);
    const { updateUser } = useContext(UserContext);
    
    useEffect(() => {
        updateTexts();
        updateUser();
    }, [])
    return (
        <div className='Texts'>
            <h1>Kirjoitukset</h1>
            {localStorage.getItem('token') ? <NewText/> : ''}
            <TextList/>
        </div>
    );
}