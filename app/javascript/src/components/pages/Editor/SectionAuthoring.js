import React, { useContext } from "react";
import styled from "styled-components";

// context
import { EditorContext } from "#contexts/Editor";

// components
import Button from "#components/shared/Button";
import PlusCircle from "#components/shared/PlusCircle";

const Root = styled.div`
  margin: 20px 0;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    align-items: center;
    display: flex;
    justify-content: space-between;
    margin: 30px 0;
    padding: 0 50px;

    &:before,
    &:after {
      background-color: ${(props) => props.theme.colors.mediumGrey};
      content: "";
      display: inline-block;
      height: 1px;
      width: calc(50% - 200px);
    }
  }
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    width: auto;
    flex-direction: row;
  }
`;

const StyledButton = styled(Button)`
  align-items: center;
  border-color: ${(props) => props.theme.colors.mediumGrey};
  color: ${(props) => props.theme.colors.textLightGrey};
  display: flex;
  padding: 4px 4px 4px 20px;
  width: 100%;
  justify-content: space-between;
  margin: 0 0 10px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    margin: 0 10px;
    width: auto;
  }
`;

const SectionAuthoring = ({ section }) => {
  const editorContext = useContext(EditorContext);

  const handleAddRecords = (activeSectionId) => {
    editorContext.actions.setAddingRecords(true);
    editorContext.actions.setActiveSection(activeSectionId);
  };
  return (
    <Root>
      <Inner>
        <StyledButton scheme="outline">
          Add Context
          <PlusCircle grey />
        </StyledButton>
        <StyledButton
          scheme="outline"
          onClick={(event) => handleAddRecords(section.id)}
        >
          Add Records
          <PlusCircle grey />
        </StyledButton>
      </Inner>
    </Root>
  );
};

export default SectionAuthoring;
