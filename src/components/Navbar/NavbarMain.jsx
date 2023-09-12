import React from 'react';
import '../Navbar/navbarmain.css';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../store/actions/authActions';

const Navbar = () => {
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header>
      <div className="head">
        <nav className="navbar navbar-expand-sm ">
          <div className=" container-fluid">
            <Link id="main" className="mytinery" href="/">
              <img src="/imagenes/logo.jpg" alt="Logo" id="logo" className="img-fluid" />
              My Tinerary
            </Link>
          </div>
          <div className="navbar-nav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link id="main" className="nav-link" to="/">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link id="main" className="nav-link" to="/cities">
                  Cities
                </Link>
              </li>
              {user?.photo &&  (
                <li className="nav-item">
                  <img src={user.photo} alt="profile photo" className="w-50 h-50 roundede-full" />
                </li>
              )}
              {user?.photo ? (
                <li className="nav-item">
                  <button onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              ) : (
                <li className="nav-item">
                  <Link type="button" className="btn btn-dark" to="/signin">
                    &#128100; Login
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;