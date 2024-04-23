import React from 'react';
import ReadOnlyTextField from './ReadOnly';
import WriteableTextField from './Writeable';

const Whiteboard = () => {
  return (
    <div>
      <ReadOnlyTextField value="Read-only text" />
      <WriteableTextField initialValue="Writeable text" />
    </div>
  );
};

export default Whiteboard;
