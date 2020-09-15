import React, { useState } from "react";

const EditorContext = React.createContext();

const EditorProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState();
  const [addingRecords, setAddingRecords] = useState(false);
  const [saving, setSaving] = useState(false);

  const state = {
    activeSection,
    addingRecords,
    saving,
  };

  const actions = {
    setActiveSection,
    setAddingRecords,
    setSaving,
  };

  return (
    <EditorContext.Provider value={{ state, actions }}>
      {children}
    </EditorContext.Provider>
  );
};

export { EditorContext, EditorProvider };
