/**
 * @name SportSee
 * @author Alexandre Bidaud 
 * @version 1.0 
 * 
 * @file The SportSee app measures your performance and fitness indicators so you can track your physical activity. 
 * see [SportSee diagram]{@link https://github.com/AlxBDo/BidaudAlexandre_12_02112021/docs/SportSee_diagram.png }
 */

import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import './index.css';
import reportWebVitals from './reportWebVitals';

import Header from './components/header';
import PageMenu from './components/pageMenu';
import Home from './pages/home';
import Profil from './pages/profil'
import Error from './pages/error'


ReactDOM.render(
  <React.StrictMode>
    <Router>
      <Header />
      <PageMenu />
      <Switch>
        <Route exact path="/"><Home /></Route>
        <Route path="/Profil/:idUser/:dataFrom"><Profil /></Route>
        <Route path="*"><Error /></Route>
      </Switch>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
