import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom'
import { UserContext } from '../Contexts/UserContexts';
import { TextCard } from '../Components/TextCard';
import { TextListContext } from '../Contexts/TextContexts';
import { AboutContent } from '../Components/AboutContent';

export const Home = () => {
    const { updateTexts } = useContext(TextListContext)
    const { texts } = useContext(TextListContext);

    useEffect(() => {
        updateTexts();
    }, [])
    return (
        <div className='Home'>
            <h1>Kotisivu</h1>
            <h2>Satunnainen näyteteksti sivun julkisten julkaisujen joukosta:</h2>
            <TextCard addClass='onHomepage' t={texts[Math.floor(Math.random()*texts.length)]}/>
            <AboutContent/>
        </div>
    );
}