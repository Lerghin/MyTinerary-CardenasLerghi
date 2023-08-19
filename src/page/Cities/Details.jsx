import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import '../Cities/details.css';


const Details = () => {
  const params = useParams();
  const [city, setCity] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:4000/api/cities/${params.id}`)
      .then(res => {
        setCity(res.data.response);
      })
      .catch(error => console.log(error));
  }, [params.id]);

  if (!city) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="banner">
    <p className="card-text">{city.name}</p>
      <img src={city.image} alt={city.name} className="banner-image  center" />
      <div className="banner-content">
    
        <p className="card-text">Population: {city.population}</p>
        <p className="card-text">Slogan: {city.slogan}</p>
        <p className="card-text">Currency: {city.currency}</p>
        <p className="card-text">Tourist Sites: {city.touristSites}</p>
        <p className="card-text">Social Struggles: {city.socialStruggles}</p>
        <p className="card-text">Spoverty Level: {city.povertyLevel}</p>
       
      </div>
      <Link  className="btn btn-secondary col-4 align-self-center" to="/cities">Go Back</Link>
      <img src="../../../public/imagenes/under.jpeg" alt="underConstruction" className="construction center" />
    </div>
  );
};

export default Details;