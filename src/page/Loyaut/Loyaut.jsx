import React from 'react'
import NavbarMain from '../../components/Navbar/NavbarMain';
import Footer from '../../components/Footer/Footer'
import { Outlet } from 'react-router-dom';

const links= [
{ value:'#', content:'Cities', id:'1'}



]




const Loyaut = () => {



  return (
      <div className="app-layout">
    <header className=" app-header">
      <NavbarMain />
    </header>
    <Outlet/>

  <footer className=" app-footer"> <Footer /></footer>  
  </div>
  )
}

export default Loyaut
