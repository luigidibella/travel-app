import React, { useEffect, useRef } from 'react';
import { useCities } from '../redux/hooks/useCities';
import { toggleFilter } from '../redux/filterSlice';
import Navbar from '../components/Navbar';
import '@tomtom-international/web-sdk-maps/dist/maps.css'; // Importa il CSS per TomTom Maps
import './Map.css';
import Footer from '../components/Footer';

const TOMTOM_API_KEY = import.meta.env.VITE_TOMTOM_API_KEY; // Sostituisci con la tua chiave API TomTom

function Map() {
  const mapContainerRef = useRef(null);
  const { filteredCities, filterText, dispatch } = useCities();
  
  useEffect(() => {
    console.log('Componente Mappa montato'); // Verifica che il componente sia montato

    if (mapContainerRef.current && TOMTOM_API_KEY) {
      console.log('Chiave API e riferimento al container della mappa disponibili');

      // Carica lo script TomTom Maps SDK
      const script = document.createElement('script');
      script.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.25.0/maps/maps-web.min.js';
      script.onload = () => {
        console.log('TomTom SDK script caricato');

        // Verifica se TomTom SDK è disponibile
        if (window.tt) {
          console.log('TomTom SDK disponibile');

          // Inizializza la mappa con un livello di zoom iniziale
          const map = tt.map({
            key: TOMTOM_API_KEY,
            container: mapContainerRef.current,
            center: [15, 25], // Centra la mappa sul punto medio delle coordinate
            zoom: 1, // Livello di zoom iniziale
            language: 'it', // Imposta la lingua della mappa in italiano
          });

          console.log('Mappa inizializzata');

          // Itera attraverso tutte le città e aggiungi i marker
          filteredCities.forEach(city => {
            const { coordinates, title, isVisited } = city;

            // Crea un elemento HTML per il marker
            const markerElement = document.createElement('div');
            markerElement.innerHTML = isVisited
              ? `<i class="fa-solid fa-circle-check" style="color: #0e9f6e; font-size: 24px; background-color: white; border-radius: 50%; border: 1px solid black;"></i>`
              : `<i class="fa-solid fa-circle-xmark" style="color: #f05252; font-size: 24px; background-color: white; border-radius: 50%; border: 1px solid black;"></i>`; // Aumenta la dimensione dell'icona a 24px

            // Crea il marker con l'elemento HTML
            new tt.Marker({ element: markerElement })
              .setLngLat(coordinates)
              .setPopup(new tt.Popup().setText(title))
              .addTo(map);

            console.log(`Marker aggiunto per ${title}`);
          });
        } else {
          console.error('TomTom SDK non caricato');
        }
      };
      script.onerror = () => {
        console.error('Errore durante il caricamento dello script TomTom SDK');
      };
      document.head.appendChild(script);

      return () => {
        console.log('Pulizia dello script TomTom SDK');
        document.head.removeChild(script);
      };
    } else {
      console.warn('Map container o chiave API mancanti');
    }
  }, [filteredCities]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow px-5">
        <h1 className="text-center text-2xl font-bold my-4 text-white">Mappa globale</h1>
        <div className="flex justify-center items-center h-full">
          <div
            ref={mapContainerRef}
            style={{ height: '100%', width: '100%' }}
            className="tomtom-map-container"
          ></div>
        </div>
          <button 
            onClick={() => dispatch(toggleFilter())}
            className="mt-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {filterText}
          </button>
      </div>
      <Footer />
    </div>
  );
}

export default Map;
