import React, { useContext } from 'react';
import { UserContext } from '../Contexts/UserContexts';

import creatorIMG from '../img/lotta.jpg';
import kokeilu1 from '../img/kokeilu1.jpg';
import kokeilu2 from '../img/kokeilu2.jpg';
import arvio from '../img/arvio.jpg';

export const AboutContent = () => {
    return (
        <div className='About'>
            <h2>Tietoja projektista</h2>
            <div className='section'>
                <h3>Tekijä</h3>
                <div className='personContainer'>
                    <img id='face' alt='Kuva sivuston tekijästä' src={creatorIMG}/>
                    <p>
                        Lotta Laukkanen, kolmannen vuoden tieto- ja viestintätekniikan opiskelija Metropolia Ammattikorkeakoulussa.
                    </p>
                </div>
            </div>
            <div className='section'>
                <h3>Sovelluksen yleiskuvaus</h3>
                <p>
                    Decamerone on kirjoittamisesta kiinnostuneille suunnattu alusta, jossa käyttäjät voivat 
                    jakaa ja tarkastella muiden tuottamia lyhyitä tekstejä eli raapaleita tai novelleja. 
                    Käyttäjiä yhdistää kiinnostus kirjoittamiseen erityisesti tekstin tuottamisen näkokulmasta, 
                    mutta palvelulla on tarjottavaa myös lähinnä lyhytproosan lukemisesta kiinnostuneille.
                </p>
            </div>
            <div className='section'>
                <h3>Kokeilut ja arviot</h3>
                <h4>Ensimmäinen kokeilu: konsepti</h4>
                <img id='kokeilu1' alt='Kuva ensimmäisen kokeilun kokeilusuunnitelmasta' src={kokeilu1}/>
                <p>
                    Ennen palvelun kehitystyön käynnistämistä tehtiin pieni selvitys Facebookin kautta. Tavoitteena 
                    oli selvittää olisiko tällaiselle palvelulle kysyntää. Kyselyyn osallistujat olivat raapaleiden 
                    jakamiseen keskittyvän ryhmän jäseniä. Tulokset olivat lupaavia, seitsemästä vastaajasta kaikki 
                    vastasivat 'kyllä' tai 'ehkä' kysymykseen kiinnostuksesta rekisteröityä käyttäjäksi tällaiseen 
                    verkkopalveluun.
                </p>
                <img id='kokeilu2' alt='Taulukko ensimmäisen kokeilun tuloksista' src={kokeilu2}/>
                <h4>Toinen kokeilu, korvattiin heuristisella arvioinnilla</h4>
                <p>
                    Heuristisessa arvioinnissa sovelluksen prototyyppi käytiin läpi pyrkien huomaamaan mahdollisimman 
                    moni käytettävyyteen ja käyttäjäkokemukseen vaikuttavista epäkohdista. Suurin osa huomatuista 
                    johtui toki prototyypin karkeudesta, mutta joitakin hyödyllisiäkin havaintoja arvioon sisältyi.
                </p>
                <img id='arvio' alt='Taulukko ensimmäisen kokeilun tuloksista' src={arvio}/>
            </div>
            <div className='section'>
                <h3>Oppimiskokemuksena</h3>
                <p>
                    Projekti on jälleen laajentanut React-osaamista: erityisesti Context API on tullut tutuksi. 
                    Käyttäjätutkimuksen osalta heuristisen arvioinnin tekeminen oli uutta, vaikka konsepti olikin 
                    viime keväältä tuttu. Jos tekisin projektin uudelleen, ajoittaisin sen niin, että käyttäjätestejä 
                    voisi tehdä käyttäjien kanssa, sillä näissä oloissa käytettävyystestaus jäi parhaassakin 
                    tapauksessa mututuntuman varaan.
                </p>
            </div>
            <div id='signature'>~ Lotta Laukkanen ~</div>
        </div>
    );
}