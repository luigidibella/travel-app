import Navbar from '../components/Navbar';
import { Link, useParams, useLoaderData } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Card({ isPreview = false }) {
  const { cardID } = useParams();
  const defaultCity = useLoaderData();  // Dati di default dalla rotta

  const cities = useSelector((state) => 
    state.cities.value.filter((city) => city.id == cardID?.toString())
  );

  const city = cities.length > 0 ? cities[0] : defaultCity;

  const content = (
    <div className="mt-5 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <div className="square">
          <img  
            src={city?.imgURL} 
            alt=""
          />
        </div>
      </a>
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            {city?.title}
          </h5>
        </a>
        <div><hr /></div>
        {city?.isVisited ? <span>✔️ visitata</span> : <span>❌ non visitata</span>}
        <div><hr /></div>
        <p className="mb-3 text-start font-normal text-gray-700 dark:text-gray-400">
          {city?.description}
        </p>
      </div>
    </div>
  );

  if (isPreview) {
    return content;
  }

  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar />
      <div className="flex-grow"> 
        <h1 className="text-center text-2xl font-bold my-4">Dettaglio Viaggio</h1>
        <Link 
          to={'/lista-viaggi'} 
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          indietro
        </Link>
        {content}
      </div>
    </div>
  );
}

export default Card;
