import React from 'react';
import ReadOnlyTextField from './ReadOnly';
import WriteableTextField from './Writeable';
import UpdateDocumentComponent from './SaveContent';

const Whiteboard = () => {
  return (
    <div>
      <UpdateDocumentComponent/>
    </div>
  );
};

export default Whiteboard;

// Hold this part 2: <WriteableTextField initialValue="Writeable text" />
// Hold this: <ReadOnlyTextField value="Read-only text" />