import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContexts';

import {AboutContent} from '../Components/AboutContent';

export const About = () => {
    return (
        <div className='About'>
            <h1>Tietoja projektista</h1>
            <AboutContent/>
        </div>
    );
}