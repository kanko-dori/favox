import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

const App: React.FC = () => (
  <Router>
    <Switch>
      <Route exact path="/" />
      <Route path="/:username" />
      <Redirect to="/" />
    </Switch>
  </Router>
)

export default App;
