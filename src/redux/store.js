import { configureStore } from "@reduxjs/toolkit";
import { counterReducer} from './counterSlice';
import { citiesReducer } from './citiesSlice';

export default configureStore({
  reducer: {
    counter: counterReducer,
    cities: citiesReducer,
  },
})