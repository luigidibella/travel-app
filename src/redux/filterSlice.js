import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: 'all', // Stato iniziale del filtro
  filterText: 'Mostra solo città visitate',
  filteredCities: [],
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    toggleFilter: (state) => {
      if (state.value === 'all') {
        state.value = 'visited';
        state.filterText = 'Mostra solo città non visitate';
      } else if (state.value === 'visited') {
        state.value = 'notVisited';
        state.filterText = 'Mostra tutte le città';
      } else {
        state.value = 'all';
        state.filterText = 'Mostra solo città visitate';
      }
    },
    filterCities: (state, action) => {
      const cities = action.payload;
      if (state.value === 'visited') {
        state.filteredCities = cities.filter(city => city.isVisited);
      } else if (state.value === 'notVisited') {
        state.filteredCities = cities.filter(city => !city.isVisited);
      } else {
        state.filteredCities = cities;
      }
    }
  },
});

export const { toggleFilter, filterCities } = filterSlice.actions;

export const filterReducer = filterSlice.reducer;
