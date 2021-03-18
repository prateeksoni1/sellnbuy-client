import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/' component={Home} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
