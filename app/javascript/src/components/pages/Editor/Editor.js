import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import { Get } from "react-axios";
import { Link } from "react-router-dom";

// context
import { EditorContext } from "#contexts/Editor";

// components
import * as Layout from "#components/shared/Layout";
import NavBar from "#components/shared/NavBar";
import EditorForm from "./EditorForm";
import Search from "./Search";
import UtilityBar from "./UtilityBar";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
`;

const Editor = ({ ...props }) => {
  const id = props.match.params.id;
  const editorContext = useContext(EditorContext);
  const { addingRecords } = editorContext.state;

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
                {addingRecords && (
                  <Layout.Padding>
                    <Layout.Wrapper
                      style={{ marginTop: "40px", marginBottom: "40px" }}
                    >
                      <Search />
                    </Layout.Wrapper>
                  </Layout.Padding>
                )}

                {!addingRecords && (
                  <Root>
                    <Layout.Padding>
                      <Layout.Wrapper
                        medium
                        style={{ paddingTop: "40px", paddingBottom: "40px" }}
                      >
                        <EditorForm guide={response.data} />
                      </Layout.Wrapper>
                    </Layout.Padding>
                    <UtilityBar guide={response.data} />
                  </Root>
                )}
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
