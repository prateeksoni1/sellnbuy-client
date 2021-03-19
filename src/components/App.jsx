import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import Signin from './Signin';
import Signup from './Signup';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/dashboard' component={Dashboard} />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/' component={Home} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
