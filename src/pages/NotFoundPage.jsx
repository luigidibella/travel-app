import Navbar from '../components/Navbar';

function NotFoundPage () {
  return (
    <div className="flex flex-col min-h-screen"> {/* Flex container che occupa tutta la schermata */}
      <Navbar />
      <div className="flex-grow"> {/* Div che cresce per riempire lo spazio restante */}
        <h1 className="text-center text-2xl font-bold my-4 text-white">NotFoundPage</h1>
        <div className="flex flex-col justify-center items-center h-full">
        </div>
      </div>
    </div>
  );
}

export default NotFoundPage;