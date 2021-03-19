import axios from 'axios';
import { useEffect, useState } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Dashboard from './Dashboard';
import Home from './Home';
import Navbar from './Navbar';
import Signin from './Signin';
import Signup from './Signup';

const PrivateRoute = ({ path, isAuthenticated, component: Component }) => {
  if (!isAuthenticated) {
    return <Redirect to='/signin' />;
  }

  return (
    <Route
      path={path}
      render={routeParams => (
        <>
          <Navbar isAuthenticated={isAuthenticated} />
          <Component {...routeParams} />
        </>
      )}
    />
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(
          'http://localhost:8000/api/v1/users/isAuthenticated',
          {
            headers: {
              authorization: `Bearer ${localStorage.getItem('authToken')}`,
            },
          }
        );
        if (response.data.ok) {
          setIsAuthenticated(true);
          setLoading(false);
        }
      } catch (err) {
        setLoading(false);
      }
    })();
  });

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Switch>
        <PrivateRoute
          path='/dashboard'
          isAuthenticated={isAuthenticated}
          component={Dashboard}
        />
        <Route path='/signin' component={Signin} />
        <Route path='/signup' component={Signup} />
        <Route path='/' component={Home} exact />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
