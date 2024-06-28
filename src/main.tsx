import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { store } from './store'
import { Provider } from 'react-redux'

import { TimerProvider } from "./contexts/TimerContext";
const root = document.getElementById("root");
if(root === null) {
  throw new Error(`root element missing`);
}
ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <Provider store={store}>
      <TimerProvider>
          <App />
      </TimerProvider>
    </Provider>
  </React.StrictMode>
);
