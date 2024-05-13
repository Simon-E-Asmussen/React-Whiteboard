import React, { useState } from 'react';
import axios from 'axios'; // Assuming you're using axios for HTTP requests
import WriteableTextField from './Writeable'; // Import the WriteableTextField component

const UpdateDocumentComponent = () => {
  const [value, setValue] = useState('');

  const handleTextChange = (newValue) => {
    setValue(newValue);
  };

  const handleClick = async () => {
    try {
      // Send value from WriteableTextField to backend server to update MongoDB document
      await axios.put('/updateDocument', {
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
      {/* Pass handleTextChange function as a prop to WriteableTextField */}
      <WriteableTextField initialValue={value} onTextChange={handleTextChange} />
      <button onClick={handleClick}>Update Document</button>
    </div>
  );
};

export default UpdateDocumentComponent;