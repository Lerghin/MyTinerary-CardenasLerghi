import { configureStore } from '@reduxjs/toolkit';
import reducerCities from './reducers/reducersCities';


export const store = configureStore({
  reducer: {
    cities: reducerCities,

  },
});

export default store;