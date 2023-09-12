
import React, { useState } from 'react';
import './App.css';
import Home from './page/Home/Home';
import Cities from './page/Cities/Cities';
import "bootstrap/dist/css/bootstrap.min.css";
import {  Navigate, Outlet, RouterProvider, createBrowserRouter } from 'react-router-dom';
import Loyaut from './page/Loyaut/Loyaut';
import Componente404 from './page/Componente404/Componente404';
import { Provider, useDispatch, useSelector } from 'react-redux';
import store from './store/store';
import SignUp from './page/Signup/SignUp';
import Signin from './page/Signin/Signin';
import { GoogleOAuthProvider, useGoogleOneTapLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { server } from './utils/axios';
import { login } from './store/actions/authActions.js';
import Details from './page/Cities/Details'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import GoogleButtonLogin from './components/GoogleButtonLogin/GoogleButtonLogin';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

const ProtectedRoute = ()=>{
  const {status}= useSelector(store=>store.authReducer)
  if(status==="online"){
    return<Outlet/>
  }
  return <Navigate to='/signin'/>
    
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Loyaut />,
    children: [
     
      {
        path: '/',
        element: <ProtectedRoute/>,
        children:[
          {
            path: '/',
            element: <Home />
          },
          {
            path: 'cities',
            element: <Cities/>,
          },
          {
            path: '/cities/:id',
            element:<Details />
            
            }

        ]
      },
      
      {
        path: '/signin',
        element: <Signin />
      },
      {
        path: '/signUp',
        element: <SignUp />
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


 /* const dispatch= useDispatch();
useEffect(()=>{
dispatch(authenticate())
},[])

*/
/*
 useGoogleOneTapLogin({
onSuccess: async credentialResponse => {
console.log(credentialResponse);
const infoUser= jwtDecode(credentialResponse.credential)
const userData= {
email: infoUser.email,
password: "Alicia.0609"
}
const res= await server.post('/auth/in', userData)
console.log(res)
dispatch(login(res.data))
},
onError: ()=>{
  console.log('login failed')
}

 })

*/







  return (

   <Provider store={store}>

<RouterProvider router={router} />
 <ToastContainer/>

      </Provider>
  );
}

export default App;