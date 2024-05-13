import React from 'react';
import ReactDOM from 'react-dom';
import Whiteboard from './Whiteboard';

function RootRenderer() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  root.render(
    <React.StrictMode>
      <Whiteboard />
    </React.StrictMode>
  );

  return null;
}

export default RootRenderer;
