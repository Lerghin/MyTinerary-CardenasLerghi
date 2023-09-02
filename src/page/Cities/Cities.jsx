import React, { useEffect, useState, useRef } from 'react';
import '../Cities/cities.css';
import HeroCities from '../../components/HeroCities/HeroCities';

import axios from 'axios';
import LowCities from '../../components/LowCities/LowCities';
import { FcSearch } from 'react-icons/fc';
import { useSelector, useDispatch } from 'react-redux';
import { filter, getCitiesAsync, lastCityview} from '../../store/actions/citiesActions';



const Cities = () => {
 const inputRef = useRef();
  //const [cities, setCities] = useState([]);
  //const [citiesAux, setCitiesAux] = useState([]);
  const dispatch = useDispatch();
  const { loading, cities,  filtered } = useSelector((store) => store.cities);
  

  useEffect(() => {
    if ( cities && cities.length === 0) {
      dispatch(getCitiesAsync());
     
    }
  }, []);

  if (loading) {
    return <h1 className='text-6xl text-white'> Loading ...</h1>;
  }
  /*
  useEffect(() => {
    axios.get('http://localhost:4000/api/cities')
      .then(res => {
        setCities(res.data.response);
        setCitiesAux(res.data.response);
    
      })
      .catch(error => console.log(error));
  }, []);
*/




 /*function HandlerSearch(event) {
    const valor = inputRef.current.value.toLowerCase().trim();
    if (event?.key === "Enter" || event.type === "click") {
      const filtro = city => city.name.toLowerCase().trim().startsWith(valor);
      const citiesFiltered = citiesAux.filter(filtro);
      setCities(citiesFiltered);
     
     
    } else if (valor === "") {
      setCities(citiesAux);
    } if (event?.key === "Escape") {
      inputRef.current.value = ''
      setCities(citiesAux);
    }

 }*/
function HandlerSearch(event) {

  if (event?.key === "Enter" || event.type === "click") {
 dispatch(filter( inputRef.current.value, cities))
   
  }else if (inputRef.current.value === "") {
    dispatch(getCitiesAsync());
  }if (event?.key === "Escape") {
    inputRef.current.value = ''
    dispatch(getCitiesAsync());
  }
}

  return (
    <div>
      <HeroCities />
      <div id="finder" className='flex flex-col gap-x-4 items-center'>
        <label className=' items-center'>
        <input onKeyUp={HandlerSearch} ref={inputRef} type="text" className='flex-1 outline-one p-2 border-b my-4' placeholder='Search City' />
          <FcSearch onClick={HandlerSearch} className='w-20px' />
        </label>
      </div>

      <div className="container">
        <div className="row">
          {Array.isArray(cities) && cities.map(city => (
            <LowCities data={city} key={city._id} />
          ))}
        </div>
      </div>
   
    </div>
  );
};

export default Cities;