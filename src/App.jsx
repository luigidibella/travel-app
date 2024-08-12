import { useState } from 'react';
import { useSelector } from 'react-redux';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar';
import CardItem from './components/CardItem';
import CardForm from './components/CardForm';
import { Link } from 'react-router-dom';

function App() {
  // Stato locale che controlla il filtro attuale.
  // Inizialmente impostato su 'all', quindi tutte le città sono visibili.
  const [filter, setFilter] = useState('all');

  // Recupera l'elenco delle città dallo store Redux.
  const cities = useSelector((state) => state.cities.value);

  // Filtra le città in base allo stato 'filter'.
  const filteredCities = cities.filter((city) => {
    if (filter === 'visited') {
      return city.isVisited;
    } else if (filter === 'notVisited') {
      return !city.isVisited;
    }
    return true; // 'all' mostra tutte le città
  });

  // Funzione per cambiare il filtro in modo ciclico.
  const toggleFilter = () => {
    if (filter === 'all') {
      setFilter('visited');
    } else if (filter === 'visited') {
      setFilter('notVisited');
    } else {
      setFilter('all');
    }
  };

  // Determina il testo del bottone in base allo stato 'filter'.
  const filterText = filter === 'all' 
    ? 'Mostra solo città visitate' 
    : filter === 'visited' 
    ? 'Mostra solo città non visitate' 
    : 'Mostra tutte le città';

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow">
          <h1 className="text-center text-2xl font-bold my-4">Homepage</h1>
            <a 
              onClick={toggleFilter}
              href="#" 
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              {filterText}
            </a>

            <div className='grid grid-cols-3 gap-5 mt-5'>
              {filteredCities.map((city) => (
                <Link to={`/lista-viaggi/${city.id}`} key={city.id}>
                  <CardItem 
                  key={city.id}
                  imgURL={city.imgURL}
                  title={city.title}
                  isVisited={city.isVisited}
                  description={city.description}
                  >
                    <hr />
                  </CardItem>
                </Link>
              ))}
            </div>

            <CardForm />
            
          <div className="flex flex-col justify-center items-center h-full mt-5">
            <img src="src/assets/img/lista-viaggi-cover.jpg" alt="Lista viaggi cover" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
