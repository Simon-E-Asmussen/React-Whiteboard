import React, { useState } from 'react';

function DocumentCreator() {
  const [title, setTitle] = useState('');

  const handleCreateDocument = async () => {
    try {
      const response = await fetch('/createDocument', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, content: '' }) // Use the title state variable
      });
      const data = await response.json();
      console.log(data);
      // You can handle the response here, e.g., show a success message or update state
    } catch (error) {
      console.error('Error creating document:', error);
      // Handle error
    }
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter title"
        value={title}
        onChange={handleTitleChange}
      />
      <button onClick={handleCreateDocument}>Create Document</button>
    </div>
  );
}

export default DocumentCreator;