import Navbar from '../components/Navbar';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Card () {
  const { cardID } = useParams();
  console.log(cardID);

  const cities = useSelector((state) => 
  state.cities.value.filter((city) => city.id == cardID.toString())
  );

  console.log(cities);
  
  return (
    <div className="flex flex-col min-h-screen"> {/* Flex container che occupa tutta la schermata */}
      <Navbar />
      <div className="flex-grow"> {/* Div che cresce per riempire lo spazio restante */}
        <h1 className="text-center text-2xl font-bold my-4">Dettaglio Viaggio</h1>
        <div className="mt-5 flex bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
          <a href="#">
            <div className="square">
              <img  
                src={cities[0].imgURL} 
                alt=""
              ></img>
            </div>
          </a>
          <div className="p-5">
              <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{cities[0].title}</h5>
              </a>
              <div><hr /></div>
              {cities[0].isVisited ? <span>✔️ visitata</span> : <span>❌ non visitata</span>}
              <div><hr /></div>
              <p className="mb-3 text-start font-normal text-gray-700 dark:text-gray-400">{cities[0].description}</p>
              {/* <a href="#" className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Dettagli
                  <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                      <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                  </svg>
              </a> */}
          </div>
      </div>
      </div>
    </div>
  );
}

export default Card;