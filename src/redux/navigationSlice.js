import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  { name: 'Home', to: '/', current: true },
  { name: 'Lista Viaggi', to: '/lista-viaggi', current: false },
  { name: 'Mappa', to: '/mappa', current: false },
  { name: 'Calendario', to: '/calendario', current: false },
];

const navigationSlice = createSlice({
  name: 'navigation',
  initialState,
  reducers: {
    setNavigation: (state, action) => {
      return action.payload;
    },
    setCurrent: (state, action) => {
      return state.map(item =>
        item.name === action.payload
          ? { ...item, current: true }
          : { ...item, current: false }
      );
    },
  },
});

export const { setNavigation, setCurrent } = navigationSlice.actions;

export const navigationReducer = navigationSlice.reducer;
