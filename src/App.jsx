
import 'bootstrap/dist/css/bootstrap.min.css'; // si lo dejo en app esta en todo

import './App.css'
import Home from './page/Home/Home';
import Cities from './page/Cities/Cities';
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Loyaut from './page/Loyaut/Loyaut';
import Componente404 from './page/Componente404/Componente404';
import { useEffect, useState } from 'react';


const router= createBrowserRouter([
{
path: '/',
element: <Loyaut/>,
children:[

    {
      path:'/',
      element: <Home/>
    },
    {
      path:'/cities',
      element: <Cities/>


    },
    {
      path:'*',
      element: <Componente404 />


    }


]


}


]);


function App() {
  const [count, setCount]= useState(0)

  return (
 
    <RouterProvider router={router}/>
  );
}

export default App
