import React, { Fragment, useContext } from "react";

// contexts
import { EditorContext } from "#contexts/Editor";

const BulkActions = () => {
  const editorContext = useContext(EditorContext);

  const handleRemove = () => {};

  return (
    <Fragment>
      {editorContext.state.bulkItems.length > 0 && (
        <div>
          <button onClick={handleRemove}>Delete</button>
        </div>
      )}
    </Fragment>
  );
};

export default BulkActions;
