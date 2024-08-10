import Navbar from '../components/Navbar';

function Mappa() {
  return (
    <div className="flex flex-col min-h-screen"> {/* Flex container che occupa tutta la schermata */}
      <Navbar />
      <div className="flex-grow"> {/* Div che cresce per riempire lo spazio restante */}
        <h1 className="text-center text-2xl font-bold my-4">Mappa</h1>
        <div className="flex justify-center items-center h-full">
          <img src="src/assets/img/mappa-placeholder.jpg" alt="Mappa placeholder" className="max-w-full max-h-full object-contain" />
        </div>
      </div>
    </div>
  );
}

export default Mappa;
