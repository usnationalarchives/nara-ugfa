import React, { useState, useReducer } from "react";
import arrayMove from "array-move";
import { uniqBy } from "lodash";

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

  const [sections, dispatchSections] = useReducer(
    (sections, { type, value }) => {
      let currentIndex;
      switch (type) {
        case "set":
          return value;
        case "add":
          return [...sections, value];
        case "remove":
          return sections.filter((s) => s.id !== value.id);
        case "update":
          const updatedIndex = sections.findIndex((s) => s.id === value.id);
          sections[updatedIndex] = value;
          return sections;
        case "moveUp":
          currentIndex = sections.findIndex((s) => s.id === value.id);
          return arrayMove(sections, currentIndex, currentIndex - 1);
        case "moveDown":
          currentIndex = sections.findIndex((s) => s.id === value.id);
          return arrayMove(sections, currentIndex, currentIndex + 1);
        default:
          return sections;
      }
    },
    []
  );

  const [descriptions, dispatchDescriptions] = useReducer(
    (descriptions, { type, sectionId, value }) => {
      let currentIndex;
      let newDescriptions = {};
      switch (type) {
        case "set":
          return value;
        case "add":
          return {
            ...descriptions,
            [sectionId]: descriptions[sectionId]
              ? uniqBy([value, ...descriptions[sectionId]], (d) => d.id)
              : [value],
          };
        case "remove":
          return {
            ...descriptions,
            [sectionId]: descriptions[sectionId].filter(
              (d) => d.id !== value.id
            ),
          };
        case "bulkRemove":
          for (const section in descriptions) {
            newDescriptions[section] = descriptions[section].filter(
              (d) => !value.includes(parseInt(d.id))
            );
          }

          return newDescriptions;
        case "bulkMove":
          let movedDescriptions = [];
          for (const section in descriptions) {
            newDescriptions[section] = descriptions[section].filter(
              (d) => !value.includes(parseInt(d.id))
            );

            const moved = descriptions[section].filter((d) =>
              value.includes(parseInt(d.id))
            );

            movedDescriptions = [...movedDescriptions, ...moved];
          }

          newDescriptions[sectionId] = [
            ...newDescriptions[sectionId],
            ...movedDescriptions,
          ];

          return newDescriptions;
        case "moveUp":
          currentIndex = descriptions[sectionId].findIndex(
            (d) => d.id === value.id
          );

          return {
            ...descriptions,
            [sectionId]: arrayMove(
              descriptions[sectionId],
              currentIndex,
              currentIndex - 1
            ),
          };
        case "moveDown":
          currentIndex = descriptions[sectionId].findIndex(
            (d) => d.id === value.id
          );

          return {
            ...descriptions,
            [sectionId]: arrayMove(
              descriptions[sectionId],
              currentIndex,
              currentIndex + 1
            ),
          };
        case "sortSectionByNaid":
          return {
            ...descriptions,
            [sectionId]: descriptions[sectionId].sort((a, b) =>
              parseInt(a.attributes.naId) > parseInt(b.attributes.naId) ? 1 : -1
            ),
          };

        default:
          return descriptions;
      }
    },
    []
  );

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

    dispatchSections({
      type: "set",
      value: data.included.filter((s) => s.type === "guide_sections"),
    });

    let initialDescriptions = {};
    for (let section of data.included.filter(
      (s) => s.type === "guide_sections"
    )) {
      let descriptionIds = [];
      if (section.relationships) {
        descriptionIds = section.relationships.descriptions.data.map(
          (r) => r.id
        );
      }
      initialDescriptions[section.id] = data.included.filter(
        (i) => i.type === "descriptions" && descriptionIds.includes(i.id)
      );
    }

    dispatchDescriptions({
      type: "set",
      value: initialDescriptions,
    });

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
    sections,
    descriptions,
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
    dispatchSections,
    dispatchDescriptions,
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
