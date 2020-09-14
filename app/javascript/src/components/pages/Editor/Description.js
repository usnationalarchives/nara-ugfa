import React from "react";
import styled from "styled-components";

// API
import { removeDescriptions } from "#api/internal/guide";

const Root = styled.div``;

const Remove = styled.button``;

const Description = ({ guide, section, description, dispatchDescriptions }) => {
  const handleRemove = () => {
    removeDescriptions(guide.data.id, section.id, [description.id])
      .then(() => {
        dispatchDescriptions({ type: "remove", value: description });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Root>
      <p>{description.attributes.title}</p>
      <Remove onClick={handleRemove}>remove</Remove>
    </Root>
  );
};

export default Description;
