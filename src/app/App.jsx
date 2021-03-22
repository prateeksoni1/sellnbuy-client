import axios from 'axios';
import { useEffect, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { BrowserRouter, Switch } from 'react-router-dom';
import Cart from '../pages/Cart';
import Dashboard from '../pages/dashboard/Dashboard';
import Home from '../pages/Home';
import Signin from '../pages/Signin';
import Signup from '../pages/Signup';
import AddProduct from '../pages/AddProduct';
import OrderHistory from '../pages/OrderHistory';
import AdminPage from '../pages/admin/Admin';
import AdminRoute from './components/AdminRoute';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [isSuperAdmin, setIsSuperAdmin] = useState();
  const [role, setRole] = useState();
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

            setRole(response.data.role);
          } else {
            setIsAuthenticated(false);
            setIsSuperAdmin(false);
            setRole(null);
          }
        } catch (err) {
          setIsAuthenticated(false);
          setIsSuperAdmin(false);
          setRole(null);
        }
      })();
    }
  }, [loading]);

  useEffect(() => {
    if (loading) {
      if (isAuthenticated !== undefined && isAuthenticated !== null) {
        setLoading(false);
      }
    }
  }, [loading, isAuthenticated]);

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
            role={role}
            allowedRole={['superAdmin']}
          />
          <PrivateRoute
            path='/dashboard'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            role={role}
            component={Dashboard}
            allowedRole={['admin', 'user', 'superAdmin']}
          />
          <PrivateRoute
            path='/cart'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            role={role}
            component={Cart}
            allowedRole={['user']}
          />
          <PrivateRoute
            path='/orderHistory'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            role={role}
            component={OrderHistory}
            allowedRole={['user']}
          />
          <PrivateRoute
            path='/addProduct'
            isAuthenticated={isAuthenticated}
            setIsAuthenticated={setIsAuthenticated}
            role={role}
            component={AddProduct}
            allowedRole={['admin', 'user']}
          />

          <PublicRoute
            path='/signin'
            isAuthenticated={isAuthenticated}
            component={Signin}
            setIsAuthenticated={setIsAuthenticated}
            setRole={setRole}
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
