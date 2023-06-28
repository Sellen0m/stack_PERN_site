import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserStore from './store/UserStore';
import GroupsStore from './store/GroupsStore';
import SortStore from './store/SortStore';

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Context.Provider value={{
      user: new UserStore(),
      groups: new GroupsStore(),
      sort: new SortStore()
    }}>
        <App/>
    </Context.Provider>
  </React.StrictMode>
);

reportWebVitals();
