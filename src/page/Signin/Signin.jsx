import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { server } from '../../utils/axios';
import '../Signin/signin.css';
import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { login } from '../../store/actions/authActions';
import { GoogleLogin } from '@react-oauth/google';
import jwtDecode from 'jwt-decode';
import { LS } from '../../utils/LS';

const Signin = () => {
  const navigate = useNavigate();
  const inputEmail = useRef();
  const inputPass = useRef();
  const dispatch = useDispatch();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  useEffect(() => {
    const token = LS.getText('token');
 

    if (token) {
      dispatch(login({ token }));
      navigate('/comprar');
    }
  }, [])

  const handleSubmit = async () => {
    
    const userData = {
      email: inputEmail.current.value,
      password: inputPass.current.value,
    };

    const res = await server.post('/auth/in', userData);
    console.log(res);
    dispatch(login(res.data));
     
    if (res.status === 200) {
      alert('You are logged in successfully');
     
      const { token } = res.data;
      LS.set('token', token);
     
      navigate('/comprar');
    
    }
  };
 

  const handleGoogleLogin = async (response) => {
    console.log(response);
    const infoUser = jwtDecode(response.credential);
    console.log(infoUser);

    console.log(infoUser.email);
    setData({
      email: infoUser.email,
      password: 'Alicia.0609',
    });

    const userData = {
      email: infoUser.email,
      password: 'Alicia.0609',
    };

    const res = await server.post('/auth/in', userData);
    console.log(res);
    dispatch(login(res.data));
 
    if (res.status === 200) {
      alert('You are logged in successfully');
      navigate('/comprar');
      const { token } = res.data;
      LS.set('token', token);

      navigate('/comprar');

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
        <button className="signin-button" onClick={handleSubmit}>
          Sign in
        </button>
        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </div>

      <div className="google">
        <GoogleLogin
          clientId="302009379903-lvfvam4poqchau007anb4eqh2oshuoig.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={handleGoogleLogin}
          onFailure={(error) => {
            console.log('Login Failed:', error);
          }}
          useOneTap
        />
      </div>
    </div>
  );
};


export default Signin;