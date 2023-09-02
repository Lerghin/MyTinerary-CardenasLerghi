
import React from 'react';
import './App.css';
import Home from './page/Home/Home';
import Cities from './page/Cities/Cities';
import "bootstrap/dist/css/bootstrap.min.css";
import { createBrowserRouter, RouterProvider, useNavigate } from 'react-router-dom';
import Loyaut from './page/Loyaut/Loyaut';
import Componente404 from './page/Componente404/Componente404';
import { useEffect, useState } from 'react';
import Details from './page/Cities/Details';
import { Provider } from 'react-redux';
import store from './store/store';



const router = createBrowserRouter([
  {
    path: '/',
    element: <Loyaut />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/cities',
        element: <Cities />
      },
      {
        path: '/cities/:id',
        element: <Details />
      },
      {
        path: '*',
        element: <Componente404 />
      }
    ]
  }
]);

function App() {
  const [count, setCount] = useState(0);

  return (
    <Provider store={store}>
      <RouterProvider router={router} />
      </Provider>
  );
}

export default App;