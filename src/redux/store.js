import { configureStore } from "@reduxjs/toolkit";
import { counterReducer} from './counterSlice';
import { citiesReducer } from './citiesSlice';
import { filterReducer } from "./filterSlice";
import { navigationReducer } from "./navigationSlice";

export default configureStore({
  reducer: {
    counter: counterReducer,
    cities: citiesReducer,
    filter: filterReducer,
    navigation: navigationReducer,
  },
});