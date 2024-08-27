import { createSlice } from '@reduxjs/toolkit';

// Funzione per caricare lo stato salvato nel localStorage
const loadState = () => {
  try {
    // Ottieni il valore salvato da 'localStorage' usando la chiave 'navigationState'
    const serializedState = localStorage.getItem('navigationState');
    // Se esiste uno stato salvato, deserializzalo e restituiscilo, altrimenti restituisci 'undefined'
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    // In caso di errore durante il parsing, restituisci 'undefined'
    return undefined;
  }
};

// Funzione per salvare lo stato nel localStorage
const saveState = (state) => {
  try {
    // Serializza lo stato in una stringa JSON
    const serializedState = JSON.stringify(state);
    // Salva la stringa JSON nel 'localStorage' con la chiave 'navigationState'
    localStorage.setItem('navigationState', serializedState);
  } catch (err) {
    // Ignora eventuali errori durante il salvataggio
  }
};

// Stato iniziale se non esiste uno stato salvato nel localStorage
const initialState = loadState() || [
  { name: 'Home', to: '/', current: true },
  { name: 'Lista Viaggi', to: '/lista-viaggi', current: false },
  { name: 'Nuovo Viaggio', to: '/nuovo-viaggio', current: false },
  { name: 'Mappa', to: '/mappa', current: false },
  { name: 'Calendario', to: '/calendario', current: false },
];

// Creazione dello slice 'navigation' con Redux Toolkit
const navigationSlice = createSlice({
  name: 'navigation', // Nome dello slice
  initialState, // Stato iniziale
  reducers: {
    // Azione per aggiornare l'intero stato di navigazione
    setNavigation: (state, action) => {
      saveState(action.payload); // Salva il nuovo stato
      return action.payload; // Restituisce il nuovo stato
    },
    // Azione per impostare l'elemento corrente nella navigazione
    setCurrent: (state, action) => {
      const newState = state.map(item =>
        item.name === action.payload
          ? { ...item, current: true } // Imposta 'current' a true per l'elemento selezionato
          : { ...item, current: false } // Imposta 'current' a false per gli altri elementi
      );
      saveState(newState); // Salva il nuovo stato
      return newState; // Restituisce il nuovo stato
    },
  },
});

// Esporta le azioni create dallo slice
export const { setNavigation, setCurrent } = navigationSlice.actions;

// Esporta il reducer generato dallo slice
export const navigationReducer = navigationSlice.reducer;
