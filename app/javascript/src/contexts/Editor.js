import React, { useState, useReducer } from "react";

const EditorContext = React.createContext();

const EditorProvider = ({ children }) => {
  const [activeDescription, setActiveDescription] = useState();
  const [activeSection, setActiveSection] = useState();
  const [activeGuide, setActiveGuide] = useState();
  const [addingRecords, setAddingRecords] = useState(false);
  const [saving, setSaving] = useState(false);
  const [lastSaved, setLastSaved] = useState();
  const [initialBlocks, setInitialBlocks] = useState([]);
  const [guide, setGuide] = useState();

  const [comments, dispatchComments] = useReducer(
    (comments, { type, value, commentIds = [] }) => {
      switch (type) {
        case "set":
          return value;
        case "add":
          return [...comments, value];
        case "clear":
          return [];
        case "clearCommentable":
          return comments.filter((c) => !commentIds.includes(parseInt(c.id)));
        // case "remove":
        //   return comments.filter((c) => c.id !== value);
        // case "update":
        //   return comments.map((comment) => (comment.id === value.id ? value : comment));
        default:
          return blocks;
      }
    },
    []
  );

  const [blocks, dispatchBlocks] = useReducer((blocks, { type, value }) => {
    switch (type) {
      case "set":
        return value;
      case "add":
        return [...blocks, value];
      case "remove":
        return blocks.filter((b) => b.id !== value);
      case "update":
        return blocks.map((block) => (block.id === value.id ? value : block));
      default:
        return blocks;
    }
  }, []);

  const [bulkItems, dispatchBulkItems] = useReducer(
    (bulkItems, { type, value }) => {
      switch (type) {
        case "add":
          return [...bulkItems, value];
        case "remove":
          return bulkItems.filter((b) => b !== value);
        case "clear":
          return [];
        default:
          return bulkItems;
      }
    },
    []
  );

  const init = ({ data }) => {
    setGuide(data);

    setInitialBlocks(data.included.filter((i) => i.type === "blocks"));
    dispatchBlocks({
      type: "set",
      value: data.included.filter((i) => i.type === "blocks"),
    });

    dispatchComments({
      type: "set",
      value: data.included.filter((i) => i.type === "comments"),
    });
  };

  const state = {
    guide,
    activeGuide,
    activeSection,
    activeDescription,
    addingRecords,
    saving,
    lastSaved,
    blocks,
    comments,
    initialBlocks,
    bulkItems,
  };

  const actions = {
    setActiveGuide,
    setActiveSection,
    setActiveDescription,
    setAddingRecords,
    setSaving,
    setLastSaved,
    init,
    dispatchBlocks,
    dispatchComments,
    setInitialBlocks,
    dispatchBulkItems,
  };

  return (
    <EditorContext.Provider value={{ state, actions }}>
      {children}
    </EditorContext.Provider>
  );
};

export { EditorContext, EditorProvider };
