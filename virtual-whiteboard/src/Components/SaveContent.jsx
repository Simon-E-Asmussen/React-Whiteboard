import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests

const UpdateDocumentComponent = () => {
  const [value, setValue] = useState('');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleClick = async () => {
    try {
      // Send value to backend server to update MongoDB document
      await axios.put('http://localhost:3000/updateDocument', {
        title: 'Notes 1',
        content: value
      });
      console.log('Document updated successfully.');
    } catch (error) {
      console.error('Error updating document:', error);
    }
  };

  return (
    <div>
      <input type="text" value={value} onChange={handleChange} />
      <button onClick={handleClick}>Save Document</button>
    </div>
  );
};

export default UpdateDocumentComponent;