import React from 'react';
import { useImageZoom } from 'react-medium-image-zoom'
import logo from './logo.svg';
import './App.css';

function App() {
  const { ref } = useImageZoom()

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" ref={ref} />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
