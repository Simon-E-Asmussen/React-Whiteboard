import React from 'react';
import ReadOnlyTextField from './ReadOnly';
import WriteableTextField from './Writeable';
import DocumentCreator from './CreateDocument';

//Function container for using both ReadOnly and Writeable functions in single react call.

const Whiteboard = () => {
  return (
    <div>
      
      <WriteableTextField initialValue="Writeable text" />
      <DocumentCreator/>
    </div>
  );
};

export default Whiteboard;


// Hold this: <ReadOnlyTextField value="Read-only text" />