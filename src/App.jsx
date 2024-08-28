// src/App.js

import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCitiesFromFirestore } from './redux/citiesSlice';
import { toggleFilter, filterCities } from './redux/filterSlice';
import { Link, Outlet } from 'react-router-dom';
import 'flowbite';
import './App.css';
import Navbar from './components/Navbar';
import CardItem from './components/CardItem';
import Footer from './components/Footer';

function App() {
  const dispatch = useDispatch();

  // Recupera la lista delle città e lo stato del filtro dal Redux store
  const cities = useSelector((state) => state.cities.value);
  const { filterText, filteredCities } = useSelector((state) => state.filter);

  // Effettua il fetch delle città da Firestore quando il componente viene montato
  useEffect(() => {
    dispatch(fetchCitiesFromFirestore());
  }, [dispatch]);

  // Aggiorna la lista delle città filtrate ogni volta che 'cities' o 'filterText' cambiano
  useEffect(() => {
    dispatch(filterCities(cities));
  }, [dispatch, cities, filterText]); // Aggiungi filterText qui

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Navbar del sito */}
        <Navbar />

        <div className="flex-grow px-5">
          <h1 className="text-center text-2xl font-bold my-4 text-white">Benvenuto</h1>
          
          {/* Outlet per il rendering delle rotte figlie */}
          <Outlet />

          {/* Pulsante per cambiare il filtro */}
          <button 
            onClick={() => dispatch(toggleFilter())}
            className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {filterText}
          </button>

          {/* Griglia di card che mostrano le città filtrate */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 mt-5'>
            {filteredCities.map((city) => (
              // Link alla pagina dei dettagli della città specifica
              <Link to={`/${city.id}`} key={city.id}>
                <CardItem 
                  cityID={city.id}
                  imgURL={city.imgURL}
                  title={city.title}
                  isVisited={city.isVisited}
                  description={city.description}
                />
              </Link>
            ))}
          </div>
        </div>

        {/* Footer del sito */}
        <Footer />
      </div>
    </>
  );
}

export default App;
