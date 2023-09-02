import { createReducer } from "@reduxjs/toolkit";
import {  filter, getCitiesAsync, getCityAsync, lastCityview ,  lastFilteredCities } from "../actions/citiesActions.js";


const initialState = {
 
  lastCities: [],
  cities: [],
  loading: false,
  city: {},
 
 
};

const reducerCities = createReducer(initialState, (builder) =>
  builder.addCase(lastCityview, (state, action) => {
    console.log(action);
    const last = [...state.lastCities].filter(city => city.name !== action.payload.name);
    last.unshift(action.payload);
    return {
      lastCities: last }
    
    
  })

.addCase(filter,(state, action )=>{
 return {
  ...state, cities: action.payload
 }

})






  .addCase(lastFilteredCities, (state, action) => {
    console.log(action);
    const lastFiltered = [...state.lastFilteredCities].filter(city => city.name !== action.payload.name);
    lastFiltered.unshift(action.payload);
    
    return {
      lastFilteredCities: lastFiltered
    };
  })

    .addCase(getCitiesAsync.fulfilled, (state, action) => {
      console.log('fulfilled')
      console.log(action)
      const newState = { ...state, cities: action.payload, loading: false, filtered:action.payload }
      return newState
  })
  .addCase(getCitiesAsync.pending, (state, action) => {
      console.log('pending')
      const newState = { ...state, loading: true }
      return newState
  })
  .addCase(getCitiesAsync.rejected, (state, action) => {
      console.log('rejected')
      const newState = { ...state, loading: false }
      return newState
  })

  .addCase(getCityAsync.fulfilled, (state, action) => {
      const newState = { ...state, city: action.payload, loading: false }
      return newState
  })
  .addCase(getCityAsync.pending, (state, action) => {
      console.log('pending')
      const newState = { ...state, loading: true }
      return newState
  })
  .addCase(getCityAsync.rejected, (state, action) => {
      console.log('rejected')
      const newState = { ...state, loading: false }
      return newState
  })



  .addDefaultCase(() => {
    return initialState
})
    

);
export default reducerCities
