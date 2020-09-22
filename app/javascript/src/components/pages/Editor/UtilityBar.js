import React, { useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";

// styles
import { fl_allStates } from "#styles/frontline";

const Root = styled.div`
  align-items: center;
  background-color: ${(props) => props.theme.colors.darkGrey};
  bottom: 0;
  display: flex;
  height: 60px;
  left: 0;
  position: fixed;
  right: 0;
  width: 100%;
  z-index: 100;
`;

const Inner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Status = styled.p`
  color: ${(props) => props.theme.colors.white};
  font-size: 0.8rem;
  text-transform: uppercase;
`;

const StyledLink = styled(Link)`
  font-size: 0.8rem;
  text-transform: uppercase;

  ${fl_allStates(css`
    color: ${(props) => props.theme.colors.white};
    text-decoration: none;
  `)}
`;

// contexts
import { EditorContext } from "#contexts/Editor";

const UtilityBar = ({ guide }) => {
  const editorContext = useContext(EditorContext);

  useEffect(() => {
    editorContext.actions.setLastSaved(guide.data.attributes.updatedAgo);
  }, []);

  return (
    <Root>
      <Layout.Padding>
        <Inner>
          {editorContext.state.saving && <Status>Saving...</Status>}
          {!editorContext.state.saving && (
            <Status>Last saved {editorContext.state.lastSaved} ago</Status>
          )}
          <div>
            <StyledLink to={`/guides/${guide.data.id}`}>Preview</StyledLink>
          </div>
        </Inner>
      </Layout.Padding>
    </Root>
  );
};

export default UtilityBar;
