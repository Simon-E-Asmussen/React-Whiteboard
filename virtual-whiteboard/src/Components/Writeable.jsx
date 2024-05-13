import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000'); // Replace with your server URL

const WriteableTextField = ({ initialValue, onTextChange }) => {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    // Fetch initial value from the server
    fetch('/getDocument')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch initial value');
        }
        return response.text(); // Assuming the response is a plain text
      })
      .then(initialValue => {
        setValue(initialValue);
        // Emit the initial value to the server
        socket.emit('textChange', initialValue);
        // Pass the initial value to the parent component
        onTextChange(initialValue);
      })
      .catch(error => console.error(error));

    // Listener for changes from other users
    socket.on('textChange', (newValue) => {
      setValue(newValue);
    });

    return () => {
      socket.off('textChange');
    };
  }, []);

  const handleChange = (e) => {
    const newValue = e.target.value;
    setValue(newValue);
    // Emit the new value to the server
    socket.emit('textChange', newValue);
    // Pass the new value to the parent component
    onTextChange(newValue);
  };

  return (
    <textarea value={value} onChange={handleChange} />
  );
};

export default WriteableTextField;