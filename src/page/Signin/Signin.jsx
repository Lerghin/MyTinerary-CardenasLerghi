import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import GoogleButtonLogin from '../../components/GoogleButtonLogin/GoogleButtonLogin';
import { server } from '../../utils/axios';
import '../Signin/signin.css';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router'
import { useDispatch } from 'react-redux';
import { signup, login} from '../../store/actions/authActions';
import { GoogleLogin } from '@react-oauth/google';
import { useGoogleLogin } from '@react-oauth/google';

const Signin = () => {


  const navigate = useNavigate()
  const inputEmail = useRef();
  const inputPass = useRef();
  const dispatch = useDispatch()


  const handleSubmit = async () => {
  
      const userData = {
        email: inputEmail.current.value,
        password: inputPass.current.value,
      };

      const res = await server.post('/auth/in', userData);
      console.log(res)
       dispatch(login(res.data))
      if (res.status === 200) {
        alert("You are logged  successfully");
        navigate('/cities')
      }
       
    
  
     
  }




  const handleSubmitGoogle = async (data) => {
    const userData = { ...data };
    if (userData.terms) {
      delete userData.terms;
      const res = await server.post('/auth/in', userData);
      console.log(res)
      dispatch(login(res.data))
      if (res.status === 200) {
        alert("You are logged  successfully");
        navigate('/cities')
      }
       
    
    }
  };

  return (
    <div className="signin-container">
      <h2>Login with</h2>
      <div className="signin-form">
        <input
          className="signin-button"
          type="email"
          name="email"
          placeholder="Email"
          ref={inputEmail}
        />
        <input
          className="signin-button"
          type="password"
          name="password"
          placeholder="Password"
          ref={inputPass}
        />
        <button className="signin-button" onClick={handleSubmit} onSubmit={(e) => e.preventDefault()}>
          Sign in
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>

      <GoogleButtonLogin fn={handleSubmitGoogle} />

    </div>
  );
};

export default Signin;

