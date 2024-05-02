import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Admin from "./store/admin";
import Store from "./store/store";
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TourStore from "./store/tourStore";


const store = new Store();
const tourStore = new TourStore();
const admin = new Admin()


export const Context = React.createContext({
    store,
    tourStore,
    admin
});

ReactDOM.render(
    <Context.Provider value={{ store, tourStore, admin  }}>
        <App />
    </Context.Provider>,
    document.getElementById('root')
);
