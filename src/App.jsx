// src/App.js

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCitiesFromFirestore } from './redux/citiesSlice';
import { Link, Outlet } from 'react-router-dom';
import 'flowbite';
import './App.css';
import Navbar from './components/Navbar';
import CardItem from './components/CardItem';
import Footer from './components/Footer';

function App() {
  // Inizializza il dispatcher di Redux
  const dispatch = useDispatch();
  
  // Definisci lo stato locale 'filter' con valore iniziale 'all'
  const [filter, setFilter] = useState('all');
  
  // Recupera la lista delle città dallo stato Redux
  const cities = useSelector((state) => state.cities.value);

  // Effettua il fetch delle città da Firestore quando il componente viene montato
  useEffect(() => {
    dispatch(fetchCitiesFromFirestore());
  }, [dispatch]);

  // Filtra le città in base allo stato del filtro
  const filteredCities = cities.filter((city) => {
    if (filter === 'visited') {
      // Mostra solo le città visitate
      return city.isVisited;
    } else if (filter === 'notVisited') {
      // Mostra solo le città non visitate
      return !city.isVisited;
    }
    // Mostra tutte le città
    return true;
  });

  // Cambia lo stato del filtro ciclicamente tra 'all', 'visited' e 'notVisited'
  const toggleFilter = () => {
    if (filter === 'all') {
      setFilter('visited');
    } else if (filter === 'visited') {
      setFilter('notVisited');
    } else {
      setFilter('all');
    }
  };

  // Testo del pulsante di filtro in base allo stato attuale del filtro
  const filterText = {
    'all': 'Mostra solo città visitate',
    'visited': 'Mostra solo città non visitate',
    'notVisited': 'Mostra tutte le città'
  }[filter];

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
            onClick={toggleFilter}
            className="inline-flex items-center mt-5 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {filterText}
          </button>

          {/* Griglia di card che mostrano le città filtrate */}
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 mt-5'>
            {filteredCities.map((city) => (
              // Link alla pagina dei dettagli della città specifica
              <Link to={`/${city.id}`} key={city.id}>
                <CardItem 
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
