import { createSlice } from "@reduxjs/toolkit";
import { db, collection, getDocs } from '../firebaseConfig'; // Importa il database e le funzioni per ottenere i documenti
import cities from '../data/cities.json'; // Importa i dati delle città da un file JSON

export const citiesSlice = createSlice({
  name: 'cities', // Nome dello slice
  initialState: {
    value: cities, // Imposta i dati iniziali delle città dal file JSON
  },
  reducers: {
    add: (state, action) => {
      state.value.push(action.payload); // Aggiungi una nuova città alla lista
    },
    setCities: (state, action) => {
      state.value = action.payload; // Sostituisci tutte le città con una nuova lista di città
    },
    updateCity: (state, action) => {
      const updatedCity = action.payload;
      const index = state.value.findIndex(city => city.id === updatedCity.id);
      if (index !== -1) {
        state.value[index] = updatedCity; // Aggiorna la città esistente
      } else {
        state.value.push(updatedCity); // Aggiungi la città se non esiste già
      }
    },
    mergeCities: (state, action) => {
      const firebaseCities = action.payload;
      const mergedCities = [...state.value]; // Crea una copia della lista di città esistente
      firebaseCities.forEach(firebaseCity => {
        const index = mergedCities.findIndex(city => city.id === firebaseCity.id);
        if (index !== -1) {
          mergedCities[index] = firebaseCity; // Aggiorna la città se esiste già
        } else {
          mergedCities.push(firebaseCity); // Aggiungi la città se non esiste già
        }
      });
      state.value = mergedCities; // Imposta la lista di città aggiornata
    },
  },
});

export const { add, setCities, updateCity, mergeCities } = citiesSlice.actions;

export const fetchCitiesFromFirestore = () => async (dispatch) => {
  try {
    const citiesCollection = collection(db, 'cities'); // Ottieni la collezione di città dal Firestore
    const citySnapshot = await getDocs(citiesCollection); // Ottieni i documenti della collezione
    const citiesList = citySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Mappa i documenti in un array di città
    
    // Unisci le città ottenute da Firestore con quelle esistenti
    dispatch(mergeCities(citiesList));
  } catch (error) {
    console.error('Failed to fetch cities from Firestore:', error); // Gestisci gli errori di fetch
  }
};

export const citiesReducer = citiesSlice.reducer;
