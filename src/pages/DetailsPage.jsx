import { useParams, useLoaderData, useNavigate, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCityById } from '../redux/selectors';
import { db } from "../firebaseConfig";
import { doc, deleteDoc } from "firebase/firestore";
import Navbar from '../components/Navbar';
import MiniMap from '../components/MiniMap';
import Footer from '../components/Footer';

function DetailsPage({ isPreview = false }) {
  const { cardID } = useParams();
  const defaultCity = useLoaderData();
  const navigate = useNavigate();
  const cities = useSelector((state) => selectCityById(state, cardID));
  
  const city = cities.length > 0 ? cities[0] : defaultCity;

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm("Sei sicuro di voler eliminare questo viaggio?");
    if (!isConfirmed) return;
  
    const cityRef = doc(db, "cities", city.id);
    try {
      await deleteDoc(cityRef);
      // Reindirizza alla pagina principale e fornisci una segnalazione della modifica
      navigate('/lista-viaggi?deleted=true');
      window.location.reload();
    } catch (error) {
      console.error("Errore nell'eliminazione della città:", error);
    }
  };
  
  console.log(city);

  const content = (
    city && (
      <div className="my-5 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
        <a href="#">
          <div className="square rounded-tl-lg md:rounded-bl-lg flex flex-col items-start">
            <img  
              src={city?.imgURL} 
              alt={city?.title}
            />

            <div className='mt-1 flex items-start'>
              <Link 
                to={`/modifica-viaggio/${city.id}`}
                state={{ city }}
                className='me-1'
              >
                  <button 
                    className="md:hidden inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
              </Link>

              <button 
                onClick={handleDelete}
                className="md:hidden inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-600"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </div>

          </div>
        </a>
        <div className="p-5 relative">
          <a href="#">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {city?.title}
              <Link 
                to={`/modifica-viaggio/${city.id}`}
                state={{ city }}
                className='hidden md:inline-flex absolute top-4 end-[55px]'
              >
                  <button 
                    className="hidden md:inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-yellow-500 rounded-lg hover:bg-yellow-600 focus:ring-4 focus:outline-none focus:ring-yellow-300 dark:bg-yellow-400 dark:hover:bg-yellow-500 dark:focus:ring-yellow-600"
                  >
                    <i className="fa-solid fa-pen-to-square"></i>
                  </button>
              </Link>
              
              <button 
                onClick={handleDelete}
                className="hidden absolute top-[16px] end-4 md:inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-500 rounded-lg hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 dark:bg-red-400 dark:hover:bg-red-500 dark:focus:ring-red-600"
              >
                <i className="fa-solid fa-trash"></i>
              </button>
            </h5>
          </a>
          <span
            className={`inline-block mb-2 ${city?.isVisited ? 'text-green-500 border-t border-b border-[#e5e7eb] w-full' : 'text-red-500 border-t border-b border-[#e5e7eb] w-full'}`}
          >
            {city?.isVisited ? '✔️ visitata' : '❌ non visitata'}
          </span>
          <p className="mb-3 text-start font-normal text-gray-700 dark:text-gray-400">
            {city?.description}
          </p>
        </div>
      </div>
    )
  );

  if (isPreview) {
    return content;
  }

  return (
    <div className="flex flex-col min-h-screen"> 
      <Navbar />
      <div className="flex-grow px-5"> 
        <h1 className="text-center text-2xl font-bold my-4 text-white">Dettaglio Viaggio</h1>
        <button 
          onClick={handleGoBack}
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <i className="fa-solid fa-arrow-left me-1"></i> indietro
        </button>
        {content}

        {city.stages?.length > 0 && (
          <div className="my-5 flex flex-col sm:flex-row justify-between bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 text-start">
            <div className="p-5 flex justify-center flex-grow">
              <ol className="relative border-s border-gray-200 dark:border-gray-700">
                {city.stages.map((stage, index) => (
                  <li key={index} className="ms-4">
                    <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
                    <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{formatDate(stage.date)}</time>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{stage.name}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 min-h-16">{stage.notes}</p>
                  </li>
                ))}
              </ol>
            </div>
            <div className="square m-2 rounded-b-lg md:rounded-none md:rounded-e-lg">
              <MiniMap
                coordinates={city?.coordinates}
                title={city?.title}
                stages={city?.stages}
              />
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

export default DetailsPage;
