import React from 'react';
import ReactDOM from 'react-dom';

import Whiteboard from './Whiteboard';

function RootRenderer() {
  // Use ReactDOM.createRoot to render your app
  const root = ReactDOM.createRoot(document.getElementById('root'));
  
  // Render your app inside React.StrictMode
  root.render(
    <React.StrictMode>
      <Whiteboard />
    </React.StrictMode>
  );

  // Return null since this component doesn't render any visible UI
  return null;
}

export default RootRenderer;
