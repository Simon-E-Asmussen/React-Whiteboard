import React from 'react';

const ReadOnlyTextField = ({ value }) => {
  return (
    <input type="text" readOnly value={value} />
  );
};

export default ReadOnlyTextField;
