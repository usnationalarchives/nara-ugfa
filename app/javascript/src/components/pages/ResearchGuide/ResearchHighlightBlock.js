import React from "react";
import styled, { css } from "styled-components";

// modules
import backgroundColors from "#modules/backgroundColors";

// styles
import { fl_absoluteFill } from "#styles/frontline";

const Root = styled.div`
  padding: 20px 0;
`;

const DisplayRoot = styled.div`
  background-color: ${(props) => props.backgroundColor};
  padding: 60px 40px;
  position: relative;

  ${(props) =>
    props.backgroundImageUrl &&
    css`
      background-image: url(${(props) => props.backgroundImageUrl});
      background-size: cover;
    `}
`;

const Content = styled.p`
  color: ${(props) => props.textColor};
  font-size: 1.2rem;
  margin-top: 20px;
  position: relative;
  text-align: center;
  z-index: 100;
`;

const Label = styled.p`
  color: ${(props) => props.textColor};
  font-size: 0.8rem;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  z-index: 100;
`;

const Overlay = styled.div`
  ${fl_absoluteFill}

  background-color: rgba(0,0,0, 0.5);
`;

const ResearchHighlightBlock = ({ block }) => {
  const backgroundColor = block.attributes.data.background_color || "grey";
  const backgroundImageUrl = block.attributes.data.background_image_url;
  const backgroundColorCode = backgroundColors.filter(
    (c) => c.value === backgroundColor
  )[0].code;

  const textColor =
    (backgroundImageUrl && !editing ? "#ffffff" : null) ||
    (backgroundColors.filter((c) => c.value === backgroundColor)[0] || {}).text;

  return (
    <Root>
      <DisplayRoot
        backgroundColor={backgroundColorCode}
        backgroundImageUrl={backgroundImageUrl}
      >
        {backgroundImageUrl && <Overlay />}
        <Label textColor={textColor}>Research Highlight</Label>
        <Content textColor={textColor}>
          {block.attributes.data.content || "empty research highlight"}
        </Content>
      </DisplayRoot>
    </Root>
  );
};

export default ResearchHighlightBlock;
