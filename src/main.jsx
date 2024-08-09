import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ListaViaggi from "./pages/ListaViaggi.jsx";
import Mappa from "./pages/Mappa.jsx";
import Calendario from "./pages/Calendario.jsx";

import store from './redux/store.js';
import { Provider } from 'react-redux';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App></App>
  },
  {
    path: "/lista-viaggi",
    element: <ListaViaggi></ListaViaggi>
  },
  {
    path: "/mappa",
    element: <Mappa></Mappa>
  },
  {
    path: "/calendario",
    element: <Calendario></Calendario>
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
