// src/citiesSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { db, collection, getDocs } from '../firebaseConfig';
import cities from '../data/cities.json';

export const citiesSlice = createSlice({
  name: 'cities',
  initialState: {
    value: cities, // Imposta i dati iniziali dal JSON
  },
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload);
    },
    setCities: (state, action) => {
      state.value = action.payload;
    },
    updateCity: (state, action) => {
      const updatedCity = action.payload;
      const index = state.value.findIndex(city => city.id === updatedCity.id);
      if (index !== -1) {
        state.value[index] = updatedCity;
      } else {
        state.value.push(updatedCity);
      }
    },
    mergeCities: (state, action) => {
      const firebaseCities = action.payload;
      const mergedCities = [...state.value];
      firebaseCities.forEach(firebaseCity => {
        const index = mergedCities.findIndex(city => city.id === firebaseCity.id);
        if (index !== -1) {
          mergedCities[index] = firebaseCity; // Aggiorna se esiste
        } else {
          mergedCities.push(firebaseCity); // Aggiungi se non esiste
        }
      });
      state.value = mergedCities;
    },
  },
});

export const { add, setCities, updateCity, mergeCities } = citiesSlice.actions;

export const fetchCitiesFromFirestore = () => async (dispatch) => {
  try {
    const citiesCollection = collection(db, 'cities');
    const citySnapshot = await getDocs(citiesCollection);
    const citiesList = citySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    
    // Merge cities from Firestore with existing cities
    dispatch(mergeCities(citiesList));
  } catch (error) {
    console.error('Failed to fetch cities from Firestore:', error);
  }
};

export const citiesReducer = citiesSlice.reducer;
