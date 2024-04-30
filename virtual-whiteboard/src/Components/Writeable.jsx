import React, { useState } from 'react';

//Function container for Writeable Text Field to be used in React calls.

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
