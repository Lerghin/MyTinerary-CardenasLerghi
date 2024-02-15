import { useEffect, useState } from "react";
import "../Navbar/navbarmain.css";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../../store/actions/authActions";
import { LS } from "../../utils/LS";
import { CiUser } from "react-icons/ci";

const Navbar = () => {
  const { user } = useSelector((store) => store.authReducer);
  const dispatch = useDispatch();
  const [logged, setLogged] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    const token = LS.getText("token");

    if (token) {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [user]);

  return (
    <header>
      <div className="head">
        <nav className="navbar navbar-expand-sm ">
          <div className=" container-fluid">
            <Link id="main" className="mytinery" to="/home">
              <img
                src="/imagenes/ebenezer.jpg"
                alt="Logo"
                id="logo"
                className="img-fluid"
              />
              Repuestos Ebenezer C.A.
            </Link>
          </div>
          <div className="navbar-nav">
            <ul className="navbar-nav">
              <li className="nav-item active">
                <Link id="main" className="nav-link" to="/home">
                  Inicio
                </Link>
              </li>
              {user?.photo && (
                <li className="navbar-item">
                  <img src={user.photo} alt="User" className="w-50 h-50" />
                </li>
              )}
              {logged ? (
              <>
            
               <li className="nav-item active">
                  <Link to="/comprar" className="nav-link" >
                   Comprar
                  </Link>
                </li>
             
                <li className="navbar-item">
                  <button onClick={handleLogout} className="navbar-button">
                    Logout
                  </button>
                </li>
               
              </>
              ) : (
              <li className="navbar-item">
                <Link to="/signin" className="navbar-link">
                  <CiUser /> Login
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
