import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ListaViaggi from "./pages/ListaViaggi.jsx";
import Card from './pages/Card.jsx';
import NuovoViaggio from "./pages/NuovoViaggio.jsx";
import Mappa from "./pages/Mappa.jsx";
import Calendario from "./pages/Calendario.jsx";
import AuthPage from './pages/AuthPage.jsx';

import store from './redux/store.js';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>,
    children: [
      {
        index: true,  // Questo definisce l'elemento di default per la rotta principale
        element: <Card isPreview={true}></Card>,
        loader: ({ params }) => {
          // Puoi passare dati di default alla Card, come la prima città
          const cities = store.getState().cities.value;
          return cities.length > 0 ? cities[cities.length - 1] : null;
        },
      },
      {
        path: ":cardID",
        element: <Card isPreview={true}></Card>,
      },
    ],
  },
  {
    path: "/lista-viaggi",
    element: <ListaViaggi></ListaViaggi>
  },
  {
    path: "/lista-viaggi/:cardID",
    element: <Card></Card>
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
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      {/* <App></App> */}
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
);
