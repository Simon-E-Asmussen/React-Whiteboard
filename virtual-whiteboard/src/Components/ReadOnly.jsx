import React from 'react';

//Function container for Readonly Text Field to be used in React calls.

const ReadOnlyTextField = ({ value }) => {
  return (
    <input type="text" readOnly value={value} />
  );
};

export default ReadOnlyTextField;
