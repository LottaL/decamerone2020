import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContexts';

import {AboutContent} from '../Components/AboutContent';

export const About = () => {
    return (
        <div className='AboutPage'>
            <h1>Tietoja</h1>
            <AboutContent/>
        </div>
    );
}