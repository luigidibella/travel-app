import Navbar from '../components/Navbar';
import CardForm from '../components/CardForm';

function NuovoViaggio() {
  return (
    <div className="flex flex-col min-h-screen"> {/* Flex container che occupa tutta la schermata */}
      <Navbar />
      <div className="flex-grow"> {/* Div che cresce per riempire lo spazio restante */}
        <h1 className="text-center text-2xl font-bold my-4 text-white">Nuovo Viaggio</h1>
        <div className="flex justify-center items-center h-full">
          <CardForm></CardForm>
        </div>
      </div>
    </div>
  );
}

export default NuovoViaggio;
