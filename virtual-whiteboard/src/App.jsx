import logo from './logo.svg';
import './App.css';
  import React from 'react';
import ReactDOM from 'react-dom';
import Whiteboard from './Components/Whiteboard.jsx';



function App() {

ReactDOM.render(
  <React.StrictMode>
    <Whiteboard />
  </React.StrictMode>,
  document.getElementById('root')
);
}

export default App;
