import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import Navbar from './components/Navbar';
import CardItem from './components/CardItem';
import CardForm from './components/CardForm';
import { useSelector } from 'react-redux';

function App() {
  const [count, setCount] = useState(0);

  const [showVisited, setShowVisited] = useState(false);

  /* const [cities, setCities] = useState([
    {
      id: 0,
      title: "Tokyo",
      isVisited: true,
      description: "Tokio è la capitale del Giappone, una metropoli vibrante e moderna che mescola grattacieli futuristici con templi storici. È un importante centro economico, culturale e tecnologico.",
      imgURL: "https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 1,
      title: "Parigi",
      isVisited: false,
      description: "Parigi, la capitale della Francia, è famosa per la sua architettura iconica, come la Torre Eiffel e il Louvre. La città è un centro di arte, moda e cultura con una vibrante vita notturna e cucina raffinata.",
      imgURL: "https://images.unsplash.com/photo-1522582324369-2dfc36bd9275?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 2,
      title: "New York",
      isVisited: true,
      description: "New York City, conosciuta come la Grande Mela, è un vibrante melting pot di culture. Con i suoi iconici grattacieli, Times Square e Central Park, è un centro globale di finanza, arte e intrattenimento.",
      imgURL: "https://images.unsplash.com/photo-1516893842880-5d8aada7ac05?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 3,
      title: "Roma",
      isVisited: true,
      description: "Roma, la capitale d'Italia, è un vero museo a cielo aperto con antiche rovine, come il Colosseo e il Foro Romano. La città è un crogiolo di storia, arte e cultura, con una cucina eccezionale e vivace vita cittadina.",
      imgURL: "https://images.unsplash.com/photo-1645649644176-275e96b2af7f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 4,
      title: "Sydney",
      isVisited: false,
      description: "Sydney, una delle città più iconiche dell'Australia, è nota per la sua iconica Opera House e il Harbour Bridge. Con le sue splendide spiagge e un clima mite, è un centro vivace di cultura, gastronomia e attività all'aperto.",
      imgURL: "https://images.unsplash.com/photo-1585719475530-a3c546426d9a?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NDZ8MTE1MjExOTN8fGVufDB8fHx8fA%3D%3D"
    },
    {
      id: 5,
      title: "Città del Capo",
      isVisited: false,
      description: "Città del Capo, situata in Sudafrica, è celebre per la sua bellezza naturale, con il maestoso Table Mountain e splendide spiagge. La città è anche un vivace centro culturale con una ricca storia e una cucina variegata.",
      imgURL: "https://images.unsplash.com/photo-1529528070131-eda9f3e90919?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ]); */

  const cities = useSelector((state) => state.cities.value);

  /* const addCity = (city) => {
    setCities([...cities, city])
  }; */

  const filteredCities = showVisited ? cities.filter(city => city.isVisited) : cities;

  return (
    <>
      {/* <h1 className="text-3xl font-bold underline">
        Hello world!
      </h1> */}

      <Navbar></Navbar>
      
      {/* Metodo statico */}
      {/* <div className='flex flex-row gap-5 flex-wrap mt-10'> */}
      {/* <div className='grid grid-cols-3 gap-5 mt-10'>
        <CardItem 
          title="Tokyo"
          isVisited={true}
          description="Tokio è la capitale del Giappone, una metropoli vibrante e moderna che mescola grattacieli futuristici con templi storici. È un importante centro economico, culturale e tecnologico."
          imgURL="https://images.unsplash.com/photo-1554797589-7241bb691973?q=80&w=1936&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ><hr /></CardItem>
        
        <CardItem 
          title="Parigi"
          isVisited={true}
          description="Parigi, la capitale della Francia, è famosa per la sua architettura iconica, come la Torre Eiffel e il Louvre. La città è un centro di arte, moda e cultura con una vibrante vita notturna e cucina raffinata."
          imgURL="https://images.unsplash.com/photo-1522582324369-2dfc36bd9275?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ><hr /></CardItem>

        <CardItem 
          title="New York"
          isVisited={true}
          description="New York City, conosciuta come la Grande Mela, è un vibrante melting pot di culture. Con i suoi iconici grattacieli, Times Square e Central Park, è un centro globale di finanza, arte e intrattenimento."
          imgURL="https://images.unsplash.com/photo-1516893842880-5d8aada7ac05?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ><hr /></CardItem>

        <CardItem 
          title="Roma"
          isVisited={false}
          description="Roma, la capitale d'Italia, è un vero museo a cielo aperto con antiche rovine, come il Colosseo e il Foro Romano. La città è un crogiolo di storia, arte e cultura, con una cucina eccezionale e vivace vita cittadina."
          imgURL="https://images.unsplash.com/photo-1603199766980-fdd4ac568a11?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ><hr /></CardItem>

        <CardItem 
          title="Sydney"
          isVisited={false}
          description="Sydney, una delle città più iconiche dell'Australia, è nota per la sua iconica Opera House e il Harbour Bridge. Con le sue splendide spiagge e un clima mite, è un centro vivace di cultura, gastronomia e attività all'aperto."
          imgURL="https://images.unsplash.com/photo-1619458845477-d3c58085beea?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8c2lkbmV5fGVufDB8fDB8fHww"
        ><hr /></CardItem>

        <CardItem 
          title="Città del Capo"
          isVisited={false}
          description="Città del Capo, situata in Sudafrica, è celebre per la sua bellezza naturale, con il maestoso Table Mountain e splendide spiagge. La città è anche un vivace centro culturale con una ricca storia e una cucina variegata."
          imgURL="https://images.unsplash.com/photo-1529528070131-eda9f3e90919?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        ><hr /></CardItem>
      </div> */}

      {/* Metodo map */}
      {/* <div className='grid grid-cols-3 gap-5 mt-10'>
        {cities.map((city) => (
          <CardItem 
            key={city.id}
            imgURL={city.imgURL}
            title={city.title}
            isVisited={city.isVisited}
            description={city.description}
          ><hr /></CardItem>
        ))}
      </div> */}

      {/* Metodo filter */}
      {/* <div className='grid grid-cols-3 gap-5 mt-10'>
        {cities
          .filter((city) => city.isVisited)
          .map((city) => (
            <CardItem 
              key={city.id}
              imgURL={city.imgURL}
              title={city.title}
              isVisited={city.isVisited}
              description={city.description}
            ><hr /></CardItem>
          ))}
      </div> */}

      {/* Metodo Show */}
      <div>
        {/* <button
          onClick={() => setShowVisited(!showVisited)}
          className="bg-blue-800 text-white py-2 px-4 rounded mt-10"
        >
          {showVisited ? 'Mostra tutte le città' : 'Mostra solo città visitate'}
        </button> */}
       
        <a 
          onClick={() => setShowVisited(!showVisited)}
          href="#" 
          className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 mt-5"
        >
            {showVisited ? 'Mostra tutte le città' : 'Mostra solo città visitate'}
        </a>

        <div className='grid grid-cols-3 gap-5 mt-5'>
          {filteredCities.map((city) => (
            <CardItem 
              key={city.id}
              imgURL={city.imgURL}
              title={city.title}
              isVisited={city.isVisited}
              description={city.description}
            >
              <hr />
            </CardItem>
          ))}
        </div>
      </div>

      <CardForm
        // addCity={addCity}
      ></CardForm>
      
      {/* Placeholder */}
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </>
  );
}

export default App;
