import { useCities } from './redux/hooks/useCities';
import { Outlet } from 'react-router-dom';
import { toggleFilter } from './redux/filterSlice';

import Navbar from './components/Navbar';
import CardDetails from './components/CardDetails';
import CardItem from './components/CardItem';
"use client";
import { Carousel } from "flowbite-react";
import Footer from './components/Footer';

import 'flowbite';
import './App.css';

function App() {
  const { filteredCities, filterText, dispatch } = useCities();

  return (
    <>
      <div className="flex flex-col min-h-screen">
        {/* Navbar del sito */}
        <Navbar />

        <div className="flex-grow px-5">
          <h1 className="text-center text-2xl font-bold my-4 text-white">Benvenuto</h1>
          
          {/* Carousel */}
          <div className="h-56 sm:h-64 xl:h-80 2xl:h-96 my-5 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <Carousel 
              slideInterval={3000}
              leftControl={true} 
              rightControl={true}
              indicators={false}
            >
              {filteredCities.map((city) => (
                <CardDetails 
                  key={city.id}
                  cardID={city.id}
                  imgURL={city.imgURL}
                  title={city.title}
                  isVisited={city.isVisited}
                  description={city.description}
                  link={`/lista-viaggi/${city.id}`}
                />
              ))}
            </Carousel>
          </div>

          {/* Outlet per il rendering delle rotte figlie */}
          {/* <Outlet /> */}

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
              <CardItem 
                key={city.id}
                cardID={city.id}
                imgURL={city.imgURL}
                title={city.title}
                isVisited={city.isVisited}
                description={city.description}
                link={`/lista-viaggi/${city.id}`}
              />
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
