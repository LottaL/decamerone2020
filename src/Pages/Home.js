import React, { useContext, useEffect } from 'react';
import { UserContext } from '../Contexts/UserContexts';
import { TextCard } from '../Components/TextCard';
import { TextListContext } from '../Contexts/TextContexts';

export const Home = () => {
    const { updateTexts } = useContext(TextListContext)
    const { user } = useContext(UserContext);
    const { texts } = useContext(TextListContext);
    //let randomText = texts[Math.floor(Math.random()*texts.length)];

    useEffect(() => {
        updateTexts();
    }, [])
    return (
        <div className='Home'>
            <h1>Kotisivu</h1>
            Näyteteksti:
            <TextCard t={texts[Math.floor(Math.random()*texts.length)]/*randomize this or smth*/}/>
        </div>
    );
}