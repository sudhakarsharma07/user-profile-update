// client/src/App.js
import React from 'react';
import MultiStepForm from './components/MultiStepForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>User Profile Update</h1>
      </header>
      <main className="main-content">
        <MultiStepForm />
      </main>
      
    </div>
  );
}

export default App;