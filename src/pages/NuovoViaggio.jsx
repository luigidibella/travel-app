import Navbar from '../components/Navbar';
import CardForm from '../components/CardForm';

function NuovoViaggio() {
  return (
    <div className="flex flex-col min-h-screen"> {/* Flex container che occupa tutta la schermata */}
      <Navbar />
      <div className="flex-grow px-5"> {/* Div che cresce per riempire lo spazio restante */}
        <h1 className="text-center text-2xl font-bold my-4 text-white">Aggiungi un nuovo viaggio</h1>
        <div className="flex justify-center items-center h-full">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <CardForm></CardForm>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NuovoViaggio;
