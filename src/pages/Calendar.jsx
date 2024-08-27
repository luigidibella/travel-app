import Navbar from '../components/Navbar';
import ReactCalendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

function Calendar () {
  return (
    <div className="flex flex-col min-h-screen"> {/* Flex container che occupa tutta la schermata */}
      <Navbar />
      <div className="flex-grow"> {/* Div che cresce per riempire lo spazio restante */}
        <h1 className="text-center text-2xl font-bold my-4 text-white">Calendario</h1>
        <div className="flex flex-col justify-center items-center h-full">
          <ReactCalendar></ReactCalendar>
          {/* <img src="/assets/img/calendario-placeholder.png" alt="Calendario placeholder" className="max-w-full max-h-full object-contain" /> */}
        </div>
      </div>
    </div>
  );
}

export default Calendar;