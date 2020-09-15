import React from "react";
import styled from "styled-components";

// components
import MoveTo from "./MoveTo";

// API
import { removeDescriptions } from "#api/internal/guideSection";

const Root = styled.div``;

const Remove = styled.button``;

const Description = ({
  guide,
  section,
  sections,
  description,
  dispatchDescriptions,
}) => {
  const handleRemove = () => {
    removeDescriptions(guide.data.id, section.id, [description.id])
      .then(() => {
        dispatchDescriptions({
          type: "remove",
          sectionId: section.id,
          value: description,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Root>
      <p>{description.attributes.title}</p>
      <Remove onClick={handleRemove}>Remove</Remove>

      <MoveTo
        guide={guide}
        section={section}
        sections={sections}
        description={description}
        dispatchDescriptions={dispatchDescriptions}
      />
    </Root>
  );
};

export default Description;
