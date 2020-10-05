import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";

// components
import BackgroundColor from "#components/pages/Editor/BackgroundColor";
import BackgroundImage from "./BackgroundImage";
import Button from "#components/shared/Button";
import { Controls, Actions, Cancel, Counter, Textarea } from "./Block";
import Form from "#components/shared/Form";

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

const StyledForm = styled(Form)`
  background-color: ${(props) => props.theme.colors.grey};
`;

const ExtraControls = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.mediumGrey};
  padding-top: 20px;
  margin-top: 20px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    align-items: center;
    justify-content: space-between;
    display: flex;
  }
`;

const Separator = styled.div`
  display: none;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    background-color: ${(props) => props.theme.colors.mediumGrey};
    display: block;
    height: 30px;
    margin-left: 20px;
    margin-right: 20px;
    width: 1px;
  }
`;

const Overlay = styled.div`
  ${fl_absoluteFill}

  background-color: rgba(0,0,0, 0.5);
`;

const ResearchHighlightBlock = ({
  block,
  editing,
  setEditing,
  handleUpdate,
}) => {
  const [content, setContent] = useState(block.attributes.data.content || "");
  const [backgroundImage, setBackgroundImage] = useState(
    block.attributes.data.background_image || ""
  );
  const [backgroundColor, setBackgroundColor] = useState(
    block.attributes.data.background_color || "grey"
  );

  const backgroundImageUrl = block.attributes.data.background_image_url;

  useEffect(() => {
    setContent(block.attributes.data.content);
  }, [editing]);

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdate({
      content: content,
      background_color: backgroundColor,
      background_image: backgroundImage,
    });
  };

  const backgroundColorCode = backgroundColors.filter(
    (c) => c.value === backgroundColor
  )[0].code;

  const textColor =
    (backgroundImageUrl && !editing ? "#ffffff" : null) ||
    (backgroundColors.filter((c) => c.value === backgroundColor)[0] || {}).text;

  const Display = () => {
    return (
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
    );
  };

  return (
    <Root>
      {editing && (
        <StyledForm onSubmit={handleSubmit}>
          <DisplayRoot
            backgroundImage={backgroundImage}
            backgroundColor={backgroundColorCode}
          >
            <Label textColor={textColor}>Research Highlight</Label>
            <Textarea
              center
              name="content"
              defaultValue={block.attributes.data.content}
              rows="6"
              maxLength="280"
              onChange={(event) => setContent(event.target.value)}
              textColor={textColor}
              style={{ marginTop: "20px" }}
            />
          </DisplayRoot>

          <div style={{ padding: "20px 40px" }}>
            <Controls>
              <Counter>{(content || "").length} / 280</Counter>

              <Actions>
                <Cancel type="button" onClick={() => setEditing(false)}>
                  cancel
                </Cancel>
                <Button type="submit" scheme="green">
                  {" "}
                  save research highlight
                </Button>
              </Actions>
            </Controls>

            <ExtraControls>
              <BackgroundColor
                backgroundImage={backgroundImage}
                backgroundColorValue={backgroundColor}
                buttonColor="#000000"
                textColor={textColor}
                handleChange={(event) => setBackgroundColor(event.target.value)}
              />
              <Separator />

              <BackgroundImage
                block={block}
                backgroundImage={backgroundImage}
                setBackgroundImage={setBackgroundImage}
              />
            </ExtraControls>
          </div>
        </StyledForm>
      )}

      {!editing && <Display />}
    </Root>
  );
};

export default ResearchHighlightBlock;
