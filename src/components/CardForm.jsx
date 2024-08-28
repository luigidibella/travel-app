import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { add } from '../redux/citiesSlice';
import { collection, addDoc } from "firebase/firestore"; // Importa le funzioni di Firestore
import { db } from '../firebaseConfig'; // Importa il database Firestore

function CardForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  // Funzione per ottenere la data corrente nel formato YYYY-MM-DD
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0'); // Assicura che il mese sia a 2 cifre
    const day = today.getDate().toString().padStart(2, '0'); // Assicura che il giorno sia a 2 cifre
    return `${year}-${month}-${day}`;
  };

  const [formData, setFormData] = useState({
    title: "",
    isVisited: false,
    description: "",
    imgURL: "",
    stages: [] // Nuovo stato per le tappe
  });

  const [stage, setStage] = useState({ name: "", date: getCurrentDate() }); // Imposta la data predefinita su oggi

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
      setStage({ name: "", date: getCurrentDate() }); // Reimposta l'input della tappa con la data di oggi
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
      stages: formData.stages // Includi le tappe nell'oggetto city
    };

    try {
      // Aggiungi un nuovo documento con i dati del modulo a Firestore
      await addDoc(collection(db, "cities"), city);

      // Reimposta i dati del modulo dopo l'invio riuscito
      setFormData({
        title: "",
        isVisited: false,
        description: "",
        imgURL: "",
        stages: [] // Reimposta le tappe
      });

      // Opzionalmente, esegui il dispatch nello store Redux se necessario
      dispatch(add(city));

      // Reindirizza a un'altra pagina dopo l'invio
      navigate('/lista-viaggi');
    } catch (error) {
      console.error("Errore nell'aggiungere il documento: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
      {/* Campi del modulo esistenti */}
      <div className="mb-5">
        <label htmlFor="title" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Nome Città</label>
        <input 
          type="text" 
          name="title" 
          value={formData.title} 
          onChange={handleInputChange} 
          id="title" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Nome Città" 
          required 
        />
      </div>
      <div className="mb-5">
        <div className="flex justify-center items-center h-5">
          <input 
            id="isVisited" 
            type="checkbox" 
            name="isVisited" 
            checked={formData.isVisited} 
            onChange={handleInputChange} 
            className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800" 
          />
          <label htmlFor="isVisited" className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Visitata</label>
        </div>
      </div>
      <div className="mb-5">
        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Descrizione</label>
        <textarea 
          id="description"  
          name="description" 
          value={formData.description} 
          onChange={handleInputChange} 
          rows="4" 
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Descrizione..."
        ></textarea>
      </div>
      <div className="mb-5">
        <label htmlFor="imgURL" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">URL Immagine</label>
        <input 
          type="text" 
          name="imgURL" 
          value={formData.imgURL} 
          onChange={handleInputChange} 
          id="imgURL" 
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="URL Immagine" 
          required 
        />
      </div>

      {/* Nuovi campi di input per le tappe */}
      <label htmlFor="stageName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Aggiungi Tappa</label>
      <div className="flex">
        <input 
          type="text" 
          name="name" 
          value={stage.name} 
          onChange={handleStageChange} 
          id="stageName" 
          className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-s-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500" 
          placeholder="Nome Tappa" 
        />
        <div className="relative w-full">
          <input 
            type="date" 
            name="date" 
            value={stage.date} 
            onChange={handleStageChange} 
            id="stageDate" 
            className="block p-2.5 w-full z-20 text-sm text-gray-900 bg-gray-50 rounded-e-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 pe-10" 
          />
          <button 
            type="button" 
            onClick={addStage} 
            className="absolute top-0 end-0 p-2.5 h-full text-sm font-medium text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            +
          </button>
        </div>
      </div>

      {/* Visualizzazione della Timeline */}
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

      <button 
        type="submit" 
        className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Aggiungi Viaggio
      </button>
    </form>
  );
}

export default CardForm;
