import React, { useContext } from 'react';
import { TextCard } from '../Components/TextCard';
import { TextContext, TextListContext } from '../Contexts/TextContexts';

export const TextList = () => {
    const { texts } = useContext(TextListContext);
    console.log(texts);
    return (
        <div className='TextList'>
            {texts.map(t => <TextCard key={t.file_id} t={t}/>)}
        </div>
    );
}