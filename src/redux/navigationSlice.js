import { createSlice } from '@reduxjs/toolkit';

const loadState = () => {
  try {
    const serializedState = localStorage.getItem('navigationState');
    return serializedState ? JSON.parse(serializedState) : undefined;
  } catch (err) {
    return undefined;
  }
};

const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('navigationState', serializedState);
  } catch (err) {
    // Ignora errori
  }
};

const initialState = loadState() || [
  { name: 'Home', to: '/', current: true },
  { name: 'Lista Viaggi', to: '/lista-viaggi', current: false },
  { name: 'Nuovo Viaggio', to: '/nuovo-viaggio', current: false },
  { name: 'Mappa', to: '/mappa', current: false },
  { name: 'Calendario', to: '/calendario', current: false },
];

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigation: (state, action) => {
      saveState(action.payload); // Salva il nuovo stato
      return action.payload;
    },
    setCurrent: (state, action) => {
      const newState = state.map(item =>
        item.name === action.payload
          ? { ...item, current: true }
          : { ...item, current: false }
      );
      saveState(newState); // Salva il nuovo stato
      return newState;
    },
  },
});

export const { setNavigation, setCurrent } = navigationSlice.actions;

export const navigationReducer = navigationSlice.reducer;
