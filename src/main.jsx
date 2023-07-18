import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CounterProvider, BackgroundProvider, TaskColorProvider, RunningProvider, ClickedProvider, TasksProvider, ValueProvider, ClickedAddNoteProvider,
  CountProvider, IsRunningProvider, TimerProvider } from './contexts/CounterContext'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CounterProvider>
    <BackgroundProvider>
    <TaskColorProvider>
    <RunningProvider>
    <ClickedProvider>
    <TasksProvider>
    <ValueProvider>
    <ClickedAddNoteProvider>
    <CountProvider>
    <IsRunningProvider>
    <TimerProvider>
      <App />
      </TimerProvider>
    </IsRunningProvider>
    </CountProvider>
    </ClickedAddNoteProvider>
    </ValueProvider>
    </TasksProvider>
    </ClickedProvider>
    </RunningProvider>
    </TaskColorProvider>
    </BackgroundProvider>
    </CounterProvider>
  </React.StrictMode>,
)
