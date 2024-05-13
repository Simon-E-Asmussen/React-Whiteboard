import logo from './logo.svg';
import './App.css';
  import React from 'react';
import ReactDOM from 'react-dom';
import Whiteboard from './Components/Whiteboard.jsx';
import RootRenderer from './Components/RootRenderer.jsx';



function App() {
  const currentURL = window.location.pathname;


  const headerone = ReactDOM.createRoot(document.getElementById('headerone'));
  
  if (currentURL === '/editor'){
    <RootRenderer/>

  }
}

export default App;
