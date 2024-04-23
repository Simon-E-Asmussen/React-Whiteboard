import React, { useState } from 'react';

const WriteableTextField = ({ initialValue }) => {
  const [value, setValue] = useState(initialValue || '');

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  return (
    <textarea value={value} onChange={handleChange} />
  );
};

export default WriteableTextField;
