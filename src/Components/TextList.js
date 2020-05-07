import React, { useContext, useState, useEffect } from 'react';
import { TextCard } from '../Components/TextCard';
import { SearchBar } from '../Components/SearchBar';
import { TextContext, TextListContext } from '../Contexts/TextContexts';

export const TextList = () => {
    const { texts } = useContext(TextListContext);
    const [localTexts, setTexts] = useState([]);
    const [descending, setDescending] = useState({status: true})

    const toggleDescending = () => {
        setDescending({status: !descending.status});
        console.log(descending);
    }

    const reorganize = (list) => {
        setTexts(list);
    }

    return (
        <div>
            <SearchBar reorganize={reorganize} toggleDescending={toggleDescending}/>
            <div className='TextList'>
                {descending && localTexts.length > 0 ? 
                    localTexts.map(t => <TextCard key={t.file_id} t={t}/>) 
                    : 
                    texts.map(t => <TextCard key={t.file_id} t={t}/>)}
            </div>      
        </div>
    );
}