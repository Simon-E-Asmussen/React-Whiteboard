import React, { useState } from 'react';
import axios from 'axios';
import WriteableTextField from './Writeable';

const UpdateDocumentComponent = () => {
  const [value, setValue] = useState('');

  const handleTextChange = (newValue) => {
    setValue(newValue);
  };

  // Send value from WriteableTextField to backend server to update MongoDB document
  const handleClick = async () => {
    try {
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
      <WriteableTextField initialValue={value} onTextChange={handleTextChange} />
      <button onClick={handleClick}>Update Document</button>
    </div>
  );
};

export default UpdateDocumentComponent;