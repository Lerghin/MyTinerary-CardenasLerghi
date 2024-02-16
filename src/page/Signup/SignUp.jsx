
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
    dni: '',
    password: '',
    country: '',
    photo: 'https://i.postimg.cc/G2Jy4YNm/smile.png',
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
        const { userData: { _id } } = res.data;
        console.log(res);
       dispatch(signup(res.data))

        if (res && res.data && res.status === 201) {
          navigate('/comprar',  { state: { userId: _id } })
       
     
          alert(" Te has registrado Satisfactioriamente, Bienvenido")
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
      <h2>Registro:</h2>
      <form className="signup-form" onSubmit={handleSubmitData}>
        <div className="form-group">
          <label htmlFor="firstName">Nombre:</label>
          <input
           className='container-fluid input-sign'
            type="text"
            id="firstName"
            name="name"
            value={data.name}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Apellido:</label>
          <input
           className='container-fluid input-sign'
            type="text"
            id="lastName"
            name="lastName"
            value={data.lastName}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dni">Cedula:</label>
          <input
            type="number"
            id="dni"
            name="dni"
           className='container-fluid input-sign'
            value={data.dni}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
           className='container-fluid input-sign'
            type="email"
            id="email"
            name="email"
            value={data.email}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña:</label>
          <input
            type="password"
            className='container-fluid input-sign'
            id="password"
            name="password"
            value={data.password}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="country">País de Residencia:</label>
          <select className='container-fluid input-sign'
            id="country"
            name="country"
            value={data.country}
            onChange={handleChangeData}
            required
          >
            <option value="">Selecione País</option>
            {countries.map((country) => (
              <option key={country.name} value={country.name}>
                {country.name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="photo">Foto:</label>
          <input
            type="file"
            id="photo"
            className='container-fluid input-sign'
            accept="image/*"
            onChange={handlePhotoChange}
            
          />
        </div>
        <div className="form-group">
          <label htmlFor="preview-image">Preview Foto:</label>
          <img id="preview-image" src={data.photo} alt="Preview"  className='img-s'/>
        </div>
       
       
        <div className="form-group">
          <label htmlFor="phone">Telefono:</label>
          <input
           className='container-fluid input-sign'

            type="tel"
            id="phone"
            name="phone"
            value={data.phone}
            onChange={handleChangeData}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="terms">Acepto los Terminos y Condiciones</label>
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
         Registrar
        </button>
      </form>
      <p>
        Ya tienes una Cuenta? <Link to="/signin">Ingresar</Link>
      </p>
    </div>
  );
};

export default SignUp;