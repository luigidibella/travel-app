import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { add } from '../redux/citiesSlice';
import './CardForm.css';
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from '../firebaseConfig'; // Import the Firestore database

function CardForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    isVisited: false,
    description: "",
    imgURL: "",
    stages: [] // New state for stages
  });
  const [stage, setStage] = useState({ name: "", date: "" }); // State for individual stage input

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleStageChange = (e) => {
    const { name, value } = e.target;
    setStage({ ...stage, [name]: value });
  };

  const addStage = () => {
    if (stage.name && stage.date) {
      setFormData({
        ...formData,
        stages: [...formData.stages, stage]
      });
      setStage({ name: "", date: "" }); // Reset stage input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const city = {
      id: Math.random(),
      title: formData.title,
      isVisited: formData.isVisited,
      description: formData.description,
      imgURL: formData.imgURL,
      stages: formData.stages // Include stages in the city object
    };

    try {
      // Add a new document with the form data to Firestore
      await addDoc(collection(db, "cities"), city);

      // Reset the form data after successful submission
      setFormData({
        title: "",
        isVisited: false,
        description: "",
        imgURL: "",
        stages: [] // Reset stages
      });

      // Optionally, dispatch to Redux store if needed
      dispatch(add(city));

      // Redirect to another page after submission
      navigate('/lista-viaggi');
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="max-w-sm mx-auto"
    >
      {/* Existing Form Fields */}
      <div className="mb-5">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome Città</label>
        <input type="text" name="title" value={formData.title} onChange={handleInputChange} id="title" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nome Città" required />
      </div>
      <div className="mb-5">
        <div className="flex justify-center items-center h-5">
          <input id="isVisited" type="checkbox" name="isVisited" checked={formData.isVisited} onChange={handleInputChange} className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" />
          <label htmlFor="isVisited" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Visitata</label>
        </div>
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrizione</label>
        <textarea id="description"  name="description" value={formData.description} onChange={handleInputChange} rows="4" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Descrizione..."></textarea>
      </div>
      <div className="mb-5">
        <label htmlFor="imgURL" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL Immagine</label>
        <input type="text" name="imgURL" value={formData.imgURL} onChange={handleInputChange} id="imgURL" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="URL Immagine" required />
      </div>

      {/* New Input Fields for Stages */}
      {/* <div className='flex justify-between'>
        <div className="mb-5 me-1">
          <label htmlFor="stageName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome Tappa</label>
          <input type="text" name="name" value={stage.name} onChange={handleStageChange} id="stageName" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nome Tappa" />
        </div>
        <div className="mb-5 me-1">
          <label htmlFor="stageDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Data</label>
          <input type="date" name="date" value={stage.date} onChange={handleStageChange} id="stageDate" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" />
        </div>
        <div className="mb-5">
          <label htmlFor="stageDate" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">+</label>
          <button type="button" onClick={addStage} className="text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center h-10 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">+</button>
        </div>
      </div> */}

      {/* Aggiungi Tappa Finale */}
      <label htmlFor="stageName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Aggiungi Tappa</label>
      <div class="flex">
          {/* <label for="search-dropdown" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Your Email</label> */}
          {/* <button id="dropdown-button" data-dropdown-toggle="dropdown" class="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-gray-100 border border-e-0 border-gray-300 dark:border-gray-700 dark:text-white rounded-s-lg hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 dark:bg-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-800" type="button">All categories</button> */}
          <input type="text" name="name" value={stage.name} onChange={handleStageChange} id="stageName" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg rounded-s-gray-100 rounded-s-2 border border-e-0 border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Nome Tappa" />
          
          <div class="relative w-full">
              {/* <input type="search" id="search-dropdown" class="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" placeholder="Search" required /> */}
              <input type="date" name="date" value={stage.date} onChange={handleStageChange} id="stageDate" className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg rounded-s-gray-100 rounded-s-2 border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 pe-10" />
              
              <button type="button" onClick={addStage} class="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                {/* <svg class="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                </svg> */}
                +
              </button>
          </div>
      </div>

      {/* Timeline Display */}
      {formData.stages.length > 0 && (
        <ol className="relative border-s border-gray-200 dark:border-gray-700 mt-5">
          {formData.stages.map((stage, index) => (
            <li key={index} className="mb-10 ms-4">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{stage.date}</time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{stage.name}</h3>
            </li>
          ))}
        </ol>
      )}

      <button type="submit" className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Aggiungi Viaggio</button>
    </form>
  );
}

export default CardForm;
