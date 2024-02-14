
import { Link, useNavigate } from 'react-router-dom';
import { server } from '../../utils/axios';
import '../Signup/signup.css';

import { countries } from '../../data/countries';
import { GoogleLogin } from '@react-oauth/google';

import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import {signup} from '../../store/actions/authActions'
import { toast } from 'react-toastify';
import { LS } from '../../utils/LS';
import { useState } from 'react';




const SignUp = () => {
const dispatch= useDispatch()

 // const [isRegistered, setIsRegistered] = useState(false);

  const [data, setData] = useState({
    name: '',
    lastName: '',
    email: '',
    password: '',
    country: '',
    photo: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fe7.pngegg.com%2Fpngimages%2F96%2F344%2Fpng-clipart-user-profile-instagram-computer-icons-insta-head-silhouette.png&tbnid=_SwuLlc6rEQpfM&vet=12ahUKEwjt1MSYoJSBAxUvYzABHZIfCXEQMygAegQIARBS..i&imgrefurl=https%3A%2F%2Fwww.pngegg.com%2Fes%2Fpng-nsizj&docid=GfUmvCB48JnuqM&w=900&h=900&q=usuario%20blanco&hl=es-419&ved=2ahUKEwjt1MSYoJSBAxUvYzABHZIfCXEQMygAegQIARBS',
    birth_date: '',
    age: '',
    phone: '',
    terms: false
  });

  const navigate= useNavigate()
  const handleChangeData = (e) => {
    setData((prevState) => {
      return e.target.name === 'terms'
        ? { ...prevState, [e.target.name]: e.target.checked }
        : { ...prevState, [e.target.name]: e.target.value };
    });
  };

  const handleSubmitData = async (e) => {
    e.preventDefault();
    try {
      const userData = { ...data };
      if (userData.terms) {
        delete userData.terms;
        const res = await server.post('/auth/up', userData);
        console.log(res);
       dispatch(signup(res.data))

        if (res && res.data && res.status === 201) {
          navigate('/cities')
       
     
          alert(" You have been registered succesfully :D")
          const { token } = res.data;
          LS.set('token', token);
        }
       
       
        }
    } catch (error) {
      const{message}= error.response.data
      toast.error(message)
     console.log(error)
    }
   
    
  };



  const handlePhotoChange = (e) => {
    const selectedPhoto = e.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const previewImage = document.getElementById('preview-image');
      previewImage.src = reader.result;
    };
    reader.readAsDataURL(selectedPhoto);
  };

/*

  const handleSubmitGoogle = async (data) => {

    const userData = { ...data };
    if (userData.terms) {
      delete userData.terms;
      const res = await server.post('/auth/up', userData);
      console.log(res);
      dispatch(signup(res.data))
      if (res.status === 201) {
        setIsRegistered(true);
        alert("Registre succesfully :D")
      }
    }


  }
*/
  return (


    <div className="signup-container">
      <h2>Register:</h2>
      <form className="signup-form" onSubmit={handleSubmitData}>
        <div className="form-group">
          <label htmlFor="firstName">First Name:</label>
          <input
           className='container-fluid'
            type="text"
            id="firstName"
            name="name"
            value={data.name}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name:</label>
          <input
           className='container-fluid'
            type="text"
            id="lastName"
            name="lastName"
            value={data.lastName}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
           className='container-fluid'
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            className='container-fluid'
            id="password"
            name="password"
            value={data.password}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">Country:</label>
          <select className='container-fluid'
            id="country"
            name="country"
            value={data.country}
            onChange={handleChangeData}
            required
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo:</label>
          <input
            type="file"
            id="photo"
            className='container-fluid'
            accept="image/*"
            onChange={handlePhotoChange}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="preview-image">Preview Image:</label>
          <img id="preview-image" src={data.photo} alt="Preview"  className='img-s'/>
        </div>
        <div className="form-group">
          <label htmlFor="birthDate">Birth Date:</label>
          <input
           className='container-fluid'
            type="date"
            id="birthDate"
            name="birth_date"
            value={data.birth_date}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="age">Age:</label>
          <input
            type="number"
            id="age"
            name="age"
           className='container-fluid'
            value={data.age}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone:</label>
          <input
           className='container-fluid'

            type="tel"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="terms">I agree to the Terms and Conditions</label>
          <input
            type="checkbox"
            id="terms"
            name="terms"
            checked={data.terms}
            onChange={handleChangeData}
            required
          />
        </div>
        <div   className="google  ">
         
          <GoogleLogin    className='google'
            clientId='302009379903-lvfvam4poqchau007anb4eqh2oshuoig.apps.googleusercontent.com'
            onSuccess={(credentialResponse) => {
              console.log(credentialResponse);
              const infoUser = jwtDecode(credentialResponse.credential);
              console.log(infoUser);
            
              setData({
                name: infoUser.given_name,
                lastName: infoUser.family_name,
                email: infoUser.email,
                password: 'Alicia.0609',
                country: infoUser.locale,
                photo: infoUser.picture,
                birth_date: '1999-09-09',
                age: '30',
                phone: '000000000',
                terms: true
              });
          
     
            }}
            onError={() => {
              console.log('Login Failed');
            }}
            useOneTap />

        </div>
        <button type="submit" className="signup-button">
          Sign up
        </button>
      </form>
      <p>
        Already have an account? <Link to="/signin">Sign in</Link>
      </p>
    </div>
  );
};

export default SignUp;