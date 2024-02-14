

import Main from "../../components/Main/Main";
import  '../Home/home.css';

import { CartProvider } from "../../components/context/cart";
import { useState } from "react";
import {products as initialProducts} from '../../mocks/products.json';
import {useFilters}from './../../hooks/useFilters'
import { Products } from './../../components/Products/Products';
import { Cart } from "./../../components/Cart/Cart";

const Home = () => {

  const [products]= useState(initialProducts)
  const {  filterProducts}=useFilters()
const filteredProducts=filterProducts(products)
  return (

  // <Loyaut >

    <div className="app-layout">

   
     
    <CartProvider>
      <div className="container  app-main" >   
      <Main/>
      </div>

 <Products products={filteredProducts}/>
 <Cart/>
 </CartProvider>
    
    
  
    </div>
 
  //</Loyaut>
  )
}

export default Home
