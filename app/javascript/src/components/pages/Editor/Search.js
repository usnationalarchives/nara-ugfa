import React, { useContext } from "react";

// context
import { EditorContext } from "#contexts/Editor";

const Search = () => {
  const editorContext = useContext(EditorContext);

  const handleClose = () => {
    editorContext.actions.setAddingRecords(false);
    editorContext.actions.setActiveSection(null);
  };

  return <button onClick={handleClose}>Close</button>;
};

export default Search;
