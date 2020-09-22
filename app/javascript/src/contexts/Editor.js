import React, { useState } from "react";

const EditorContext = React.createContext();

const EditorProvider = ({ children }) => {
  const [activeSection, setActiveSection] = useState();
  const [addingRecords, setAddingRecords] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState();

  const state = {
    activeSection,
    addingRecords,
    saving,
    lastSaved,
  };

  const actions = {
    setActiveSection,
    setAddingRecords,
    setSaving,
    setLastSaved,
  };

  return (
    <EditorContext.Provider value={{ state, actions }}>
      {children}
    </EditorContext.Provider>
  );
};

export { EditorContext, EditorProvider };
