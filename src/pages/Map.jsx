import React, { useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import '@tomtom-international/web-sdk-maps/dist/maps.css'; // Importa il CSS per TomTom Maps
import './Map.css';
import Footer from '../components/Footer';

const TOMTOM_API_KEY = '87rH6u74NltAZ17hW8xpBmVJIpQsaK45'; // Sostituisci con la tua chiave API TomTom

function Map() {
  const mapContainerRef = useRef(null);

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
            center: [139.6917, 35.6895], // Coordinate di Tokyo
            zoom: 12, // Livello di zoom iniziale
            language: 'it', // Imposta la lingua della mappa in italiano
          });

          console.log('Mappa inizializzata');
          
          // Aggiungi un marker per Tokyo
          new tt.Marker()
            .setLngLat([139.6917, 35.6895])
            .setPopup(new tt.Popup().setText('Tokyo'))
            .addTo(map);

          console.log('Marker aggiunto alla mappa');
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
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow px-5">
        <h1 className="text-center text-2xl font-bold my-4 text-white">Mappa</h1>
        <div className="flex justify-center items-center h-full">
          <div
            ref={mapContainerRef}
            style={{ height: '100%', width: '100%' }}
            className="tomtom-map-container"
          ></div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Map;
