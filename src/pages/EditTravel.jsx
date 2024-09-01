import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CardForm from '../components/CardForm';
import Footer from '../components/Footer';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectCityById } from '../redux/selectors';
import { useNavigate } from 'react-router-dom';

function EditTravel() {
  const { cardID } = useParams();
  // const city = useSelector((state) => selectCityById(state, cardID))[0] || null;

  const location = useLocation();
  const { city } = location.state || {};

  const navigate = useNavigate();
  const handleGoBack = () => {
    navigate(-1);
  };
  
  console.log(city);
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <div className="flex-grow px-5">
        <h1 className="text-center text-2xl font-bold my-4 text-white">Modifica il viaggio a {city.title}</h1>
        <button 
          onClick={handleGoBack}
          className="mb-5 inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <i className="fa-solid fa-arrow-left me-1"></i> indietro
        </button>
        <div className="flex justify-center items-center h-full">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <CardForm 
                editId={city.id} 
                initialData={city} 
              />
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default EditTravel;
