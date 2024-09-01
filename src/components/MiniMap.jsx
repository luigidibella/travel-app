import React, { useEffect, useRef } from 'react';
import '@tomtom-international/web-sdk-maps/dist/maps.css'; // Importa il CSS per TomTom Maps
import './MiniMap.css'; // Assicurati di avere questo file per eventuali stili personalizzati

const TOMTOM_API_KEY = import.meta.env.VITE_TOMTOM_API_KEY; // Sostituisci con la tua chiave API TomTom

function MiniMap({ coordinates, title, stages }) {
  const mapContainerRef = useRef(null);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  };

  useEffect(() => {
    const loadTomTomSDK = () => {
      const script = document.createElement('script');
      script.src = 'https://api.tomtom.com/maps-sdk-for-web/cdn/6.x/6.25.0/maps/maps-web.min.js';
      script.onload = () => {
        if (window.tt) {
          const map = tt.map({
            key: TOMTOM_API_KEY,
            container: mapContainerRef.current,
            center: coordinates, // Coordinate passate direttamente
            zoom: 10,
            language: 'it',
          });

          // Aggiungi un marker per ogni stage
          stages.forEach(stage => {
            new tt.Marker()
              .setLngLat(stage.coordinates) // Coordinate passate direttamente
              .setPopup(new tt.Popup().setHTML(`<strong>${stage.name}</strong><br>${formatDate(stage.date)}`))
              .addTo(map);
          });
        } else {
          console.error('TomTom SDK non caricato correttamente');
        }
      };
      script.onerror = () => console.error('Errore nel caricamento dello script TomTom SDK');
      document.head.appendChild(script);

      return () => {
        document.head.removeChild(script); // Pulisce lo script al momento dello smontaggio del componente
      };
    };

    if (mapContainerRef.current && TOMTOM_API_KEY && coordinates) {
      loadTomTomSDK();
    }
  }, [coordinates, stages]); // Aggiungi stages come dipendenza

  return (
    <div className="map-container" ref={mapContainerRef} style={{ height: '100%', width: '100%' }}>
      {/* Mappa verrà inizializzata qui */}
    </div>
  );
}

export default MiniMap;
