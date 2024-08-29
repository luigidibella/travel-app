import { useState } from 'react';
import { Link } from 'react-router-dom';
import Loader from './Loader';
import './CardItem.css';

function CardItem({ cardID, imgURL, title, children, isVisited, description, link }) {
  
  const [loading, setLoading] = useState(true);
  const [imageLoaded, setImageLoaded] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
    setTimeout(() => {
      setLoading(false);
      console.log(cardID);
       // Nasconde il loader solo quando l'immagine è caricata
    }, 3000);
  };

  return (
    <div className={`max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`} style={{ transitionDelay: `${cardID * 300}ms` }}>
      <div className="square rounded-t-lg relative">
        {loading && (
          <div className="absolute inset-0 flex justify-center items-center">
            <Loader /> {/* Mostra il loader se in fase di caricamento */}
          </div>
        )}
        <img
          className={`rounded-t-lg transition-opacity duration-1000 ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
          src={imgURL}
          alt={title}
          onLoad={handleImageLoad} // Imposta imageLoaded su true una volta che l'immagine è caricata
        />
      </div>
      <div className="p-5">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
        <span
          className={`inline-block mb-2 ${isVisited ? 'text-green-500 border-t border-b border-green-500 w-full' : 'text-red-500 border-t border-b border-red-500 w-full'}`}
        >
          {isVisited ? '✔️ visitata' : '❌ non visitata'}
        </span>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        <Link
          to={link}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Dettagli
          <svg
            className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>
      </div>
    </div>
  );
}

export default CardItem;
