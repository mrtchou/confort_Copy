import React, { createContext } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import UserStore from './store/UserStore';
import ProductStore from './store/ProductStore';
import TypeStore from './store/TypeStore';

export const Context = createContext(null);

ReactDOM.render(
  <Context.Provider value={{
    user: new UserStore(),
    products: new ProductStore(),
    types: new TypeStore()
  }}>
    <App />
  </Context.Provider>,
  document.getElementById('root')
);

