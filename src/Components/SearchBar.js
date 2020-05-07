import React, { useState, useContext, useEffect } from 'react';
import { TextContext, TextListContext } from '../Contexts/TextContexts';

export const SearchBar = (props) => {
    const [search, setSearch] = useState('');
    const { texts } = useContext(TextListContext);
    const [results, setResults] = useState('');

    const handleSubmit = (evt) => {
        if (evt) evt.preventDefault();
        if ( search === '') {
            emptySearch();
        } else {
            let filtered = texts.filter(t => 
                t.tags.includes(search.toLowerCase())
            )
            setResults(filtered.length);
            props.reorganize(filtered);
        }
    }

    const emptySearch = (evt) => {
        if (evt) evt.preventDefault();
        setSearch('');
        props.reorganize([]);
        setResults(texts.length);
    }

    return (
        <form onSubmit={handleSubmit} style={formStyle}>
            <br></br>
            <label>Asiasana</label>
            <input type="text" 
                value={search} 
                onChange={(evt) => 
                    setSearch(evt.target.value)}/>
            <input type="submit" value="Hae" style={{backgroundColor: '#00b359'}}/>
            <button onClick={emptySearch}>Näytä kaikki</button>
            Tuloksia {results !== '' ? results : texts.length} kappaletta
        </form>
    )
    
}
const formStyle = {
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    width: '60vh',
    margin: 'auto',
    border: 'dotted 2px #00b359'
}