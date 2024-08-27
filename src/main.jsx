import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import store from './redux/store.js';

import './index.css';

import App from './App.jsx';
import ListaViaggi from './pages/ListaViaggi.jsx';
import CardDetails from './pages/CardDetails.jsx';
import NuovoViaggio from './pages/NuovoViaggio.jsx';
import Mappa from './pages/Mappa.jsx';
import Calendario from './pages/Calendario.jsx';
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
          return cities.length > 0 ? cities[cities.length - 1] : null;
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
    element: <ListaViaggi></ListaViaggi>
  },
  {
    path: "/lista-viaggi/:cardID",
    element: <CardDetails></CardDetails>
  },
  {
    path: "/nuovo-viaggio",
    element: <NuovoViaggio></NuovoViaggio>
  },
  {
    path: "/mappa",
    element: <Mappa></Mappa>
  },
  {
    path: "/calendario",
    element: <Calendario></Calendario>
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
