import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:3000');

const WriteableTextField = ({ initialValue, onTextChange }) => {
  const [value, setValue] = useState(initialValue || '');

  useEffect(() => {
    fetch('/getDocument')
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch initial value');
        }
        return response.text();
      })
      .then(initialValue => {
        setValue(initialValue);
        socket.emit('textChange', initialValue);
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
    socket.emit('textChange', newValue);
    onTextChange(newValue);
  };

  return (
    <textarea value={value} onChange={handleChange} />
  );
};

export default WriteableTextField;