import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { add, updateCity } from '../redux/citiesSlice';
import { collection, addDoc, doc, updateDoc, getDoc, setDoc } from "firebase/firestore";
import { db } from '../firebaseConfig';

function CardForm({ initialData, editId }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    isVisited: false,
    description: "",
    imgURL: "",
    stages: []
  });

  const [stage, setStage] = useState({ name: "", date: getCurrentDate(), notes: "" });

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('it-IT', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(new Date(date));
  };

  function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = (today.getMonth() + 1).toString().padStart(2, '0');
    const day = today.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

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
      setStage({ name: "", date: getCurrentDate(), notes: "" });
    }
  };

  const removeStage = (index) => {
    setFormData({
      ...formData,
      stages: formData.stages.filter((_, i) => i !== index)
    });
  };

  const getNextId = async () => {
    const counterRef = doc(db, "counters", "cityId");
    const counterDoc = await getDoc(counterRef);
    let nextId = 10; // ID iniziale

    if (counterDoc.exists()) {
      const data = counterDoc.data();
      nextId = data.lastId + 1;
    }

    await setDoc(counterRef, { lastId: nextId }, { merge: true });
    return nextId.toString(); // Ritorna come stringa
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const city = {
      title: formData.title,
      isVisited: formData.isVisited,
      description: formData.description,
      imgURL: formData.imgURL,
      stages: formData.stages
    };

    try {
      const editIdStr = editId ? String(editId) : null;
  
      if (editIdStr) {
        const cityRef = doc(db, "cities", editIdStr);
        await updateDoc(cityRef, city);
        dispatch(updateCity({ id: editIdStr, ...city }));
      } else {
        const newId = await getNextId();
        const cityRef = doc(db, "cities", newId); // Usa l'ID incrementale
        await setDoc(cityRef, { ...city, id: newId }); // Usa setDoc per assegnare un ID specifico
        dispatch(add({ id: newId, ...city }));
      }
  
      setFormData({
        title: "",
        isVisited: false,
        description: "",
        imgURL: "",
        stages: []
      });
  
      navigate('/lista-viaggi');
    } catch (error) {
      console.error("Errore nell'aggiungere o aggiornare il documento: ", error.message);
      alert("Errore: " + error.message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
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
      <div className="mb-5">
        <label htmlFor="stageNotes" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Note</label>
        <textarea 
          id="stageNotes"  
          name="notes" 
          value={stage.notes} 
          onChange={handleStageChange} 
          rows="2" 
          className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" 
          placeholder="Note Tappa..."
        ></textarea>
      </div>

      {formData.stages.length > 0 && (
        <ol className="relative border-s border-gray-200 dark:border-gray-700 mt-5">
          {formData.stages.map((stage, index) => (
            <li key={index} className="mb-10 relative">
              <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
              <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">{formatDate(stage.date)}</time>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">{stage.name}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stage.notes}</p>
              <button 
                type="button" 
                onClick={() => removeStage(index)} 
                className="absolute top-0 right-0 mt-2 mr-2 text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
              >
                &times;
              </button>
            </li>
          ))}
        </ol>
      )}

      <button 
        type="submit" 
        className="mt-5 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        {editId ? "Aggiorna Viaggio" : "Aggiungi Viaggio"}
      </button>
    </form>
  );
}

export default CardForm;
