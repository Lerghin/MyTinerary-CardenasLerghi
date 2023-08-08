import React from 'react'
import '../Navbar/navbarmain.css'
import { Link } from 'react-router-dom';



const Navbar = () => {
  return (
    <header>
    <div className="head">
    <nav className="navbar navbar-expand-sm ">
     
        <div className=" container-fluid">
       
          <Link id="main" className="mytinery" href="/">
            <img  src="/imagenes/logo.jpg" alt="Logo" id="logo" className="img-fluid" />
            My Tinerary
          </Link>

     
          </div>
          <div  className="  navbar-nav ">
          <ul className="  navbar-nav ">
      
        <li className="nav-item active">
          <Link id="main" className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li className=" nav-item ">
          <Link  id="main" className="nav-link" to="/cities">
            Cities
          </Link>
        </li>
        
        <li className=" nav-item  ">
          <a type="button" className="btn btn-dark" href="#">
          &#128100;  Login
          </a>
        </li>
   
      </ul>
      </div>
    </nav>

  </div>
  </header>
);
}



export default Navbar
