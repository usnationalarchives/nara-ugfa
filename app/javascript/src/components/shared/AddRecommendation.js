import React, { Fragment, useState, useContext } from "react";
import styled, { css } from "styled-components";

// contexts
import { editorContext } from "#contexts/Editor";

// API
import { addDescriptions } from "#api/internal/guide";

// styles
import { fl_static, fl_attention } from "#styles/frontline";
import { buttonReset } from "#styles/mixins";
import { EditorContext } from "../../contexts/Editor";

export const AddToGuide = styled.button`
  ${buttonReset}

  align-items: center;
  color: ${(props) => props.theme.colors.yellow};
  display: flex;
  font-size: 0.8em;
  font-weight: bold;
  text-transform: uppercase;

  ${fl_static(css`
    text-decoration: none;
  `)}

  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

export const PlusIcon = styled.div`
  display: inline-block;
  height: 24px;
  position: relative;
  vertical-align: middle;
  width: 24px;

  &:before,
  &:after {
    background: ${(props) => props.theme.colors.yellow};
    bottom: 3px;
    content: "";
    left: 3px;
    position: absolute;
    right: 3px;
    top: 3px;
  }

  &:before {
    width: 2px;
    margin: 3px auto;
  }

  &:after {
    margin: auto 3px;
    height: 2px;
    box-shadow: none;
  }
`;

const AddRecommendation = ({ guideId, description }) => {
  const editorContext = useContext(EditorContext);
  const [added, setAdded] = useState(false);

  const { id } = description;

  const handleAdd = () => {
    addDescriptions(guideId, [id]).then((response) => {
      setAdded(true);

      editorContext.actions.init({ data: response.data });
    });
  };

  return (
    <AddToGuide disabled={added} onClick={handleAdd}>
      {!added && (
        <Fragment>
          Add to Guide
          <PlusIcon />
        </Fragment>
      )}
      {added && "Added"}
    </AddToGuide>
  );
};

export default AddRecommendation;
