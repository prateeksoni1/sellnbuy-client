import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Cart from './Cart';
import Dashboard from './Dashboard';
import Home from './Home';
import Navbar from './Navbar';
import Signin from './Signin';
import Signup from './Signup';
import AddProduct from './AddProduct';
import OrderHistory from './OrderHistory';
import AdminPage from './Admin';
const PublicRoute = ({
  path,
  isAuthenticated,
  component: Component,
  setIsAuthenticated,
}) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }

  return (
    <Route
      path={path}
      render={routeParams => (
        <Component {...routeParams} setIsAuthenticated={setIsAuthenticated} />
      )}
    />
  );
};

const PrivateRoute = ({
  path,
  isAuthenticated,
  component: Component,
  setIsAuthenticated,
  userEmail,
}) => {
  if (!isAuthenticated) {
    return <Redirect to='/signin' />;
  }
  return (
    <Route
      path={path}
      render={routeParams => (
        <>
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Component {...routeParams} userEmail={userEmail} />
        </>
      )}
    />
  );
};

const AdminRoute = ({
  path,
  component: Component,
  isAuthenticated,
  isSuperAdmin,
  setIsAuthenticated,
}) => {
  if (!isAuthenticated || !isSuperAdmin) {
    return <Redirect to='/signin' />;
  }

  return (
    <Route
      path={path}
      render={routeParams => (
        <>
          <Navbar
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <Component {...routeParams} />
        </>
      )}
    />
  );
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSuperAdmin, setIsSuperAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (loading) {
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

            if (response.data.superAdmin) {
              setIsSuperAdmin(true);
            }

            setLoading(false);
          }
        } catch (err) {
          setLoading(false);
        }
      })();
    }
  }, [loading]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <BrowserRouter>
        <Switch>
          <AdminRoute
            path='/admin'
            component={AdminPage}
            isSuperAdmin={isSuperAdmin}
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
          />
          <PrivateRoute
            path='/dashboard'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            component={Dashboard}
          />
          <PrivateRoute
            path='/cart'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            component={Cart}
          />
          <PrivateRoute
            path='/orderHistory'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            component={OrderHistory}
          />
          <PrivateRoute
            path='/addProduct'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            component={AddProduct}
          />

          <PublicRoute
            path='/signin'
            isAuthenticated={isAuthenticated}
            component={Signin}
            setIsAuthenticated={setIsAuthenticated}
          />
          <PublicRoute
            path='/signup'
            isAuthenticated={isAuthenticated}
            component={Signup}
          />
          <PublicRoute
            path='/'
            isAuthenticated={isAuthenticated}
            component={Home}
            exact
          />
        </Switch>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};

export default App;
