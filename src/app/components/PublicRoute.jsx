import { Redirect, Route } from 'react-router';

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

export default PublicRoute;
