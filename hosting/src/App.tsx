import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import Home from './pages/Home';
import Fanvox from './pages/Fanvox';

import './App.css';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/:username" component={Fanvox} />
      <Redirect to="/" />
    </Switch>
  </Router>
);

export default App;
