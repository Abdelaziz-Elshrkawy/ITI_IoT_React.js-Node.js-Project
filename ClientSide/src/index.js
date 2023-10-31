import React, { createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
const context = createContext()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <context.Provider>
        <App />
    </context.Provider>
);
