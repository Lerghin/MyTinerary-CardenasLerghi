import React, { useEffect, useState } from 'react';
import '../Cities/cities.css';
import HeroCities from '../../components/HeroCities/HeroCities';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import LowCities from '../../components/LowCities/LowCities';

const Cities = () => {
  const params = useParams();
  console.log(params);
  const [cities, setCities] = useState([]);
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:4000/api/cities')
      .then(res => {
        setCities(res.data.response);
        setResults(res.data.response);
      })
      .catch(error => console.log(error));
  }, []);

  const searcher = (e) => {
    setSearch(e.target.value);
    console.log(e.target.value);

    const filteredCities = cities.filter(dato =>
      dato.name.toLowerCase().startsWith(search.toLowerCase())
    );
    setResults(search.trim() === "" ? cities : filteredCities);
  };

  return (
    <div>
      <HeroCities />
      <div>
        <input value={search} onChange={searcher} type="text" placeholder='search' className='form-control' />
      </div>
      <div className="container">
        <div className="row">
          {results.map(city => (
            <LowCities data={city} key={city.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Cities;