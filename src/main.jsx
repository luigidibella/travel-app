import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js';

import './index.css';

import App from './App.jsx';
import TravelList from './pages/TravelList.jsx';
import CardDetails from './pages/CardDetails.jsx';
import NewTravel from './pages/NewTravel.jsx';
import Map from './pages/Map.jsx';
import Calendar from './pages/Calendar.jsx';
import AuthPage from './pages/AuthPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,  // Questo definisce l'elemento di default per la rotta principale
        element: <CardDetails isPreview={true}></CardDetails>,
        loader: ({ params }) => {
          // Puoi passare dati di default alla CardDetails, come la prima città
          const cities = store.getState().cities.value;
          return cities.length > 0 ? cities[0] : null;
        },
      },
      {
        path: ":cardID",
        element: <CardDetails isPreview={true}></CardDetails>,
      },
    ],
  },
  {
    path: "/lista-viaggi",
    element: <TravelList></TravelList>
  },
  {
    path: "/lista-viaggi/:cardID",
    element: <CardDetails></CardDetails>
  },
  {
    path: "/nuovo-viaggio",
    element: <NewTravel></NewTravel>
  },
  {
    path: "/mappa",
    element: <Map></Map>
  },
  {
    path: "/calendario",
    element: <Calendar></Calendar>
  },
  {
    path: "/auth",
    element: <AuthPage></AuthPage>
  },
  {
    path: "*",
    element: <NotFoundPage />
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
