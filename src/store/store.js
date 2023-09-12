import { configureStore } from '@reduxjs/toolkit';
import reducerCities from './reducers/reducersCities';
import authReducer from './reducers/authReducer';


export const store = configureStore({
  reducer: {
    cities: reducerCities,
    authReducer

  },
});

export default store;