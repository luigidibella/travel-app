import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { fetchCitiesFromFirestore } from '../citiesSlice';
import { filterCities } from '../filterSlice';

export function useCities() {
  const dispatch = useDispatch();

  // Recupera la lista delle città e lo stato del filtro dal Redux store
  const cities = useSelector(state => state.cities.value);
  const { filterText, filteredCities } = useSelector(state => state.filter);

  // Effettua il fetch delle città da Firestore quando il componente viene montato
  useEffect(() => {
    dispatch(fetchCitiesFromFirestore());
  }, [dispatch]);

  // Aggiorna la lista delle città filtrate ogni volta che 'cities' o 'filterText' cambiano
  useEffect(() => {
    dispatch(filterCities(cities));
  }, [dispatch, cities, filterText]);

  return { filteredCities, filterText, dispatch };
}
