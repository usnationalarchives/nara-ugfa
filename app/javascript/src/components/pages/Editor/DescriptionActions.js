import React, { Fragment } from "react";
import styled from "styled-components";

// components
import * as Text from "#components/shared/Text";
import MoveTo from "./MoveTo";

// API
import { removeDescriptions } from "#api/internal/guideSection";

// styles
import { buttonReset } from "#styles/mixins";

// assets
import Trash from "#assets/icons/trash.svg";

const Root = styled.div`
  position: absolute;
  right: 10px;
  top: 10px;

  > button {
    margin-left: 10px;
  }
`;

const Remove = styled.button`
  ${buttonReset}

  svg {
    fill: ${(props) => props.theme.colors.blue};
    height: 17px;
    width: 17px;
  }
`;

const DescriptionActions = ({
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
      <MoveTo
        guide={guide}
        section={section}
        sections={sections}
        description={description}
        dispatchDescriptions={dispatchDescriptions}
      />

      <Remove onClick={handleRemove}>
        <Trash />
        <Text.Screenreader>Remove</Text.Screenreader>
      </Remove>
    </Root>
  );
};

export default DescriptionActions;
