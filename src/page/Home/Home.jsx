import { Navbar } from "react-bootstrap";

import Main from "../../components/Main/Main";
import  '../Home/home.css';
//import Loyaut from "../Loyaut/Loyaut";
import Caroussel from "../../components/Caroussel/Caroussel";

const Home = () => {

  return (
  
  // <Loyaut >

    <div className="app-layout">

    <main className="container  app-main">
     
     <Main />
    
    </main>
    
    <section   className="container  app-caroussel">

    <Caroussel />
    </section>



    </div>
   
  // </Loyaut>
  )
}

export default Home
