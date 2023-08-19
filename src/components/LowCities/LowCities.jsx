import React from 'react';
import { Link, useParams } from 'react-router-dom';
import '../LowCities/lowcities.css';

const LowCities = ({ data }) => {
  const { _id, name, image, population, currency, slogan, touristSites, socialStruggles } = data;

  return (
    <div key={data.id} className="card border-secondary pt-3 col-10 col-md-5 col-xl-3  grow-on-hover">
      <img className="card-img-top w-70 h-50 same-height-img" src={image} alt={name} />
      <div className="card-body d-flex flex-column">
        <h4 className="card-title">{name}</h4>
        <p className="card-text">Population: {population}</p>
        <p className="card-text">Slogan: {slogan}</p>
        <Link to={`/cities/${_id}`} className="btn btn-secondary col-4 align-self-center">Details</Link>
      </div>
    </div>
  );
};

export default LowCities;