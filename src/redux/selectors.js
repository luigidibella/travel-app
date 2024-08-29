import { createSelector } from 'reselect';

// Assume that the state shape is { cities: { value: [] } }
const selectCities = (state) => state.cities.value;

export const selectCityById = createSelector(
  [selectCities, (state, cardID) => cardID],
  (cities, cardID) => cities.filter((city) => city.id == cardID?.toString())
);
