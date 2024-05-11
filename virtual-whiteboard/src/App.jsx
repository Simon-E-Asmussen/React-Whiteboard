import logo from './logo.svg';
import './App.css';
  import React from 'react';
import ReactDOM from 'react-dom';
import Whiteboard from './Components/Whiteboard.jsx';

function App() {
  const handleOpenEditor = () => {
    // Open editor.html in a new tab or window
    window.open('./editor.html', '_blank');
  };

  return (
    <div>
      {/* Button to open the editor.html document */}
      <button onClick={handleOpenEditor}>Open Editor</button>
    </div>
  );
}

export default App;
