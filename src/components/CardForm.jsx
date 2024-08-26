import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { add } from '../redux/citiesSlice';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { db } from '../firebaseConfig'; // Import the Firestore database
import './CardForm.css';

function CardForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    isVisited: false,
    description: "",
    imgURL: ""
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    const inputValue = type === "checkbox" ? checked : value;
    setFormData({
      ...formData,
      [name]: inputValue,
    });
  };

  const handleSubmit = async (e) => { // Make handleSubmit asynchronous
    e.preventDefault();

    const city = {
      id: Math.random(),
      title: formData.title,
      isVisited: formData.isVisited,
      description: formData.description,
      imgURL: formData.imgURL
    };

    try {
      // Add a new document with the form data to Firestore
      await addDoc(collection(db, "cities"), city);

      // Reset the form data after successful submission
      setFormData({
        title: "",
        isVisited: false,
        description: "",
        imgURL: ""
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
      <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Aggiungi Viaggio</button>
    </form>
  );
}

export default CardForm;
