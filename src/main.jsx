import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js';

import './index.css';

import App from './App.jsx';
import TravelList from './pages/TravelList.jsx';
import DetailsPage from './pages/DetailsPage.jsx';
import NewTravel from './pages/NewTravel.jsx';
import EditTravel from './pages/EditTravel.jsx';
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
        element: <DetailsPage isPreview={true}></DetailsPage>,
        loader: ({ params }) => {
          // Puoi passare dati di default alla DetailsPage, come la prima città
          const cities = store.getState().cities.value;
          return cities.length > 0 ? cities[0] : null;
        },
      },
      {
        path: ":cardID",
        element: <DetailsPage isPreview={true}></DetailsPage>,
      },
    ],
  },
  {
    path: "/lista-viaggi",
    element: <TravelList></TravelList>
  },
  {
    path: "/lista-viaggi/:cardID",
    element: <DetailsPage></DetailsPage>
  },
  {
    path: "/nuovo-viaggio",
    element: <NewTravel></NewTravel>
  },
  {
    path: "/modifica-viaggio/:cardID",
    element: <EditTravel></EditTravel>
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
