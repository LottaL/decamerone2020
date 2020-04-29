import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';

import './App.css';
import { UserContextProvider } from './Contexts/UserContexts';
import { TextListContextProvider, TextContextProvider } from './Contexts/TextContexts';

import { NavBar } from './Components/NavBar';
import { Home } from './Pages/Home';
import { About } from './Pages/About';
import { Profile } from './Pages/Profile';
import { Texts } from './Pages/Texts';
import { LoginRegister } from './Pages/LoginRegister';

function App() {
  return (
    <div className="App">
      <Router>
        <UserContextProvider>
          <TextListContextProvider>
            <TextContextProvider>

              <NavBar/>
              <Switch>
                <Route exact path="/">
                  <Home />
                </Route>
                <Route path="/tietoa">
                  <About />
                </Route>
                <Route path="/profiili">
                  <Profile />
                </Route>
                <Route path="/kirjaudu">
                  <LoginRegister />
                </Route>
                <Route path="/kirjoitukset">
                  <Texts />
                </Route>
              </Switch>

            </TextContextProvider>
          </TextListContextProvider>
        </UserContextProvider> 
      </Router>          
    </div>
  );
}

export default App;
