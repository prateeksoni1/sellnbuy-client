import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, setIsAuthenticated, isSuperAdmin }) => {
  const handleLogout = () => {
    localStorage.setItem('authToken', null);
    setIsAuthenticated(false);
  };

  return (
    <nav
      style={{ height: '5vh' }}
      className='navbar navbar-expand-lg navbar-dark bg-primary'
    >
      <div className='container-fluid'>
        <Link to='/' className='navbar-brand'>
          OSBD
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarText'
          aria-controls='navbarText'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarText'>
          <ul className='ms-auto navbar-nav mb-2 mb-lg-0'>
            {isAuthenticated && !isSuperAdmin ? (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/addProduct'>
                    Add Product
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/orderhistory'>
                    Order History
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/cart'>
                    Cart
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className='nav-item'>
                  <Link className='nav-link' to='/signin'>
                    Sign in
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link className='nav-link' to='/signup'>
                    Sign Up
                  </Link>
                </li>
              </>
            )}
            {isAuthenticated && (
              <li className='nav-item'>
                <button className='btn text-white' onClick={handleLogout}>
                  Log out
                </button>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
