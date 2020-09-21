import React, { Fragment } from "react";

// components
import GuideFields from "./GuideFields";
import Sections from "./Sections";

const EditorForm = ({ guide }) => {
  return (
    <Fragment>
      <GuideFields guide={guide} />
      <Sections guide={guide} />
    </Fragment>
  );
};

export default EditorForm;
