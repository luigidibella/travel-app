// src/App.js
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCitiesFromFirestore } from './redux/citiesSlice';
import { Link, Outlet } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import CardItem from './components/CardItem';

function App() {
  const dispatch = useDispatch();
  const [filter, setFilter] = useState('all');
  const cities = useSelector((state) => state.cities.value);

  useEffect(() => {
    dispatch(fetchCitiesFromFirestore());
  }, [dispatch]);

  const filteredCities = cities.filter((city) => {
    if (filter === 'visited') {
      return city.isVisited;
    } else if (filter === 'notVisited') {
      return !city.isVisited;
    }
    return true;
  });

  const toggleFilter = () => {
    if (filter === 'all') {
      setFilter('visited');
    } else if (filter === 'visited') {
      setFilter('notVisited');
    } else {
      setFilter('all');
    }
  };

  const filterText = filter === 'all' 
    ? 'Mostra solo città visitate' 
    : filter === 'visited' 
    ? 'Mostra solo città non visitate' 
    : 'Mostra tutte le città';

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div className="flex-grow px-5">
          <h1 className="text-center text-2xl font-bold my-4 text-white">Benvenuto</h1>
          
          <Outlet></Outlet>
            
          <a 
            onClick={toggleFilter}
            href="#" 
            className="inline-flex items-center mt-5 px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {filterText}
          </a>

          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-10 mt-5'>
            {filteredCities.map((city) => (
              <Link to={`/${city.id}`} key={city.id}>
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

          <div className="flex flex-col justify-center items-center h-full mt-5">
            <img src="/assets/img/cover.jpg" alt="Lista viaggi cover" className="max-w-full max-h-full object-contain" />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
