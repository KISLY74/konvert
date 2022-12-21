import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import AppRouter from './components/AppRouter';
import PDFDataStore from './store/PDFDataStore';

export const Context = React.createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Context.Provider value={{
      pdfDataStore: new PDFDataStore()
    }}>
      <AppRouter />
    </Context.Provider>
  </BrowserRouter>
);
