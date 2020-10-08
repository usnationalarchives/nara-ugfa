import React, { useState } from "react";

const EditorContext = React.createContext();

const EditorProvider = ({ children }) => {
  const [activeDescription, setActiveDescription] = useState();
  const [activeSection, setActiveSection] = useState();
  const [activeGuide, setActiveGuide] = useState();
  const [addingRecords, setAddingRecords] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState();

  const state = {
    activeGuide,
    activeSection,
    activeDescription,
    addingRecords,
    saving,
    lastSaved,
  };

  const actions = {
    setActiveGuide,
    setActiveSection,
    setActiveDescription,
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
