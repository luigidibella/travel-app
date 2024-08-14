import { configureStore } from "@reduxjs/toolkit";
import { counterReducer} from './counterSlice';
import { citiesReducer } from './citiesSlice';
import { navigationReducer } from "./navigationSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    cities: citiesReducer,
    navigation: navigationReducer,
  },
});