import React, { Fragment, useState, useEffect } from "react";
import styled from "styled-components";

// components
import BackgroundColor from "#components/pages/Editor/BackgroundColor";
import Button from "#components/shared/Button";
import { Controls, Actions, Cancel, Counter, Textarea } from "./Block";

// modules
import backgroundColors from "#modules/backgroundColors";

const Root = styled.div`
  padding: 20px 0;
`;

const DisplayRoot = styled.div`
  background-color: ${(props) => props.backgroundColor};
  padding: 60px 40px;
`;

const Content = styled.p`
  color: ${(props) => props.textColor};
  font-size: 1.2rem;
  margin-top: 20px;
  text-align: center;
`;

const Label = styled.p`
  color: ${(props) => props.textColor};
  font-size: 0.8rem;
  text-align: center;
  text-transform: uppercase;
`;

const Form = styled.form`
  background-color: ${(props) => props.theme.colors.grey};
`;

const ResearchHighlightBlock = ({
  block,
  editing,
  setEditing,
  handleUpdate,
}) => {
  const [content, setContent] = useState(block.attributes.data.content || "");
  const [backgroundColor, setBackgroundColor] = useState(
    block.attributes.data.background_color || "grey"
  );

  useEffect(() => {
    setContent(block.attributes.data.content);
  }, [editing]);

  const handleSubmit = (event) => {
    event.preventDefault();

    handleUpdate({
      content: content,
      background_color: backgroundColor,
    });
  };

  const backgroundColorCode = backgroundColors.filter(
    (c) => c.value === backgroundColor
  )[0].code;

  const textColor = (
    backgroundColors.filter((c) => c.value === backgroundColor)[0] || {}
  ).text;

  const Display = () => {
    return (
      <DisplayRoot backgroundColor={backgroundColorCode}>
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
        <Form onSubmit={handleSubmit}>
          <DisplayRoot backgroundColor={backgroundColorCode}>
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

            <BackgroundColor
              backgroundColorValue={backgroundColor}
              buttonColor="#000000"
              textColor={textColor}
              handleChange={(event) => setBackgroundColor(event.target.value)}
            />
          </div>
        </Form>
      )}

      {!editing && <Display />}
    </Root>
  );
};

export default ResearchHighlightBlock;
