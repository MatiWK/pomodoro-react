import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { TimerProvider } from "./contexts/TimerContext";
import { TaskProvider } from "./contexts/TaskContext";
const root = document.getElementById("root");
if(root === null) {
  throw new Error(`root element missing`);
}
ReactDOM.createRoot(root).render(
  <React.StrictMode>
                  <TimerProvider>
                    <TaskProvider>
                      <App />
                    </TaskProvider>
                  </TimerProvider>
  </React.StrictMode>
);
