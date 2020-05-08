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
        <form className='search' onSubmit={handleSubmit}>
            <h3>Haku</h3>
            <label>Aihesana</label>
            <input type="text" 
                value={search} 
                onChange={(evt) => 
                    setSearch(evt.target.value)
            }/>
            <div className='buttonContainer'>
                <div>
                    <input className='openBTN' type="submit" value="Hae" style={{backgroundColor: '#00b359'}}/>
                    <button className='openBTN' onClick={emptySearch}>Näytä kaikki</button>
                </div>
                <p className='note'>Tuloksia {results !== '' ? results : texts.length} kappaletta</p>
            </div>
        </form>
    )
    
}