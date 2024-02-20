
import '../Footer/footer.css'

import { FaInstagram } from "react-icons/fa6";
import { FaMobileAlt } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GiPirateFlag } from "react-icons/gi";

//import { useFilters } from "../hooks/useFilters.js";
//import { useCart } from "../hooks/useCart.js";

const Footer = () => {
 /// const { filters } = useFilters();
 // const { cart } = useCart();
  return (
  
    <footer className="footer">
    {/*
 {
  JSON.stringify(filters, null, 2)
 }
 */}
    {/*

{
JSON.stringify(cart, null, 2)
}
*/}
  <h2 > <GiPirateFlag /></h2> 
    <h4>
      Barba Negra Restaurant´s 
    </h4>
   
    <span><FaMobileAlt /> <Link to="https://api.whatsapp.com/send?phone=584243523922&text=Hola%20Lerghin%20%F0%9F%98%98"> 04243523922</Link></span>
    <br />
    <span><FaInstagram /><Link to="https://www.instagram.com/lerghin1/"> BarbaNegraIG
    </Link> </span>
    
  </footer>
  )
}

export default Footer
