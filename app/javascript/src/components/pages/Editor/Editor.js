import React, { Fragment } from "react";
import styled from "styled-components";
import { Get } from "react-axios";
import { Link } from "react-router-dom";

// components
import NavBar from "#components/shared/NavBar";
import EditorForm from "./EditorForm";

const Editor = ({ ...props }) => {
  const id = props.match.params.id;

  return (
    <Fragment>
      <NavBar title="Guides to Records Editor" />
      <Get url={`/guides/${id}/edit`}>
        {(error, response, isLoading) => {
          if (error) {
            return <div>Error</div>;
          } else if (isLoading) {
            return <div>Loading...</div>;
          } else if (response !== null) {
            return (
              <Fragment>
                <EditorForm guide={response.data} />
                <Link to={`/guides/${response.data.data.id}`}>Preview</Link>
              </Fragment>
            );
          }

          return <div>Loading...</div>;
        }}
      </Get>
    </Fragment>
  );
};

export default Editor;
