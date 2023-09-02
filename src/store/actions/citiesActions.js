import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { server } from "../../utils/axios";






const lastCityview = createAction('lastCityview', (data) => {
  console.log(data);
  return {
    payload: data
  };
});

 const lastFilteredCities = createAsyncThunk ('lastFilteredCities', async(data) => {
  console.log(data);
  return {
    payload: data
  };
})



const getCitiesAsync = createAsyncThunk('getCitiesAsync', async () => {
  try {
      const res = await server.get('/cities')
      return res.data.response
  } catch (error) {
      console.log(error);
      return []
  }
})

const getCityAsync = createAsyncThunk('getCityAsync', async ({ id }) => {
  try {
      const res = await server.get('/cities/' + id)
      return res.data.response
  } catch (error) {
      console.log(error);
      return []
  }
})

const filter = createAction('filter', (search, cities) => {
  let result=[]

   result  = cities.filter( city=>city.name.toLowerCase().trim().startsWith(search.toLowerCase().trim())) ;

 
  return {
    
    payload: result
  };
});




export {lastCityview, lastFilteredCities,getCityAsync, getCitiesAsync, filter}