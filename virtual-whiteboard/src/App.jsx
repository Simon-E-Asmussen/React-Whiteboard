import React, { useState } from 'react';
import RootRenderer from './Components/RootRenderer.jsx';

function App() {
  const [isWhiteboardOpen, setIsWhiteboardOpen] = useState(false);

  const openWhiteboard = () => {
    setIsWhiteboardOpen(true);
  };

  return (
    <div id="root">
      <h1 id="headerone">Welcome to the Home Page</h1>
      {!isWhiteboardOpen && (
        <button onClick={openWhiteboard}>Open Whiteboard</button>
      )}
      {isWhiteboardOpen && <RootRenderer />}
    </div>
  );
}

export default App;
