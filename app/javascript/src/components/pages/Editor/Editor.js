import React, { Fragment, useContext } from "react";
import styled from "styled-components";
import { Get } from "react-axios";
import Modal from "react-modal";

// context
import { EditorContext } from "#contexts/Editor";

// components
import * as Layout from "#components/shared/Layout";
import PageLoader from "#components/shared/PageLoader";
import NavBar from "#components/shared/NavBar";
import Search from "./Search";
import ContentRecommendations from "../../shared/ContentRecommendations";
import UtilityBar from "./UtilityBar";
import GuideFields from "./GuideFields";
import Sections from "./Sections";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
`;

const Inner = styled.div`
  margin: 8px 0;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    margin: 40px 0;
  }
`;

Modal.defaultStyles.overlay.backgroundColor = "transparent";

const Editor = ({ ...props }) => {
  const id = props.match.params.id;
  const editorContext = useContext(EditorContext);
  const { addingRecords } = editorContext.state;

  // Check if any records have been added in order to conditionally render content recommendations
  for (var i = 0; i < editorContext.state.sections.length; i++) {
    if (
      editorContext.state.sections[i].relationships &&
      editorContext.state.sections[i].relationships.descriptions.data.length
    ) {
      props.anyDescriptions = true;
      break;
    }
  }

  return (
    <Fragment>
      <NavBar title="Guides to Records Editor" />
      <Get
        url={`/guides/${id}/edit`}
        onSuccess={(response) => {
          editorContext.actions.init({ data: response.data });
        }}
      >
        {(error, response, isLoading) => {
          if (error) {
            return <div>Error</div>;
          } else if (isLoading) {
            return <PageLoader />;
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

                {!addingRecords && editorContext.state.guide && (
                  <Root>
                    <Layout.Padding>
                      <Layout.Wrapper medium>
                        <Inner>
                          <GuideFields />
                          <Sections />
                        </Inner>
                      </Layout.Wrapper>
                    </Layout.Padding>

                    {props.anyDescriptions && (
                      <ContentRecommendations guideId={id} />
                    )}

                    <UtilityBar guide={response.data} />
                  </Root>
                )}
              </Fragment>
            );
          }

          return <PageLoader />;
        }}
      </Get>
    </Fragment>
  );
};

export default Editor;
