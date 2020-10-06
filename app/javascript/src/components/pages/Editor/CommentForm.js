import React, { useState } from "react";
import styled, { css } from "styled-components";

// api
import { createComment } from "#api/internal/comment";

// components
import * as Text from "#components/shared/Text";
import Button from "#components/shared/Button";

// styles
import { buttonReset } from "#styles/mixins";
import { fl_static, fl_attention } from "#styles/frontline";

const Root = styled.div`
  margin-top: 10px;
`;

const Textarea = styled.textarea`
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  padding: 8px 10px;
  font-size: 0.9rem;
`;

export const Actions = styled.div`
  align-items: center;
  display: flex;
  margin-top: 10px;
  justify-content: flex-end;
`;

export const Cancel = styled.button`
  ${buttonReset}
  font-size: 0.8em;
  margin-right: 20px;
  text-transform: uppercase;

  ${fl_static(css`
    color: ${(props) => props.theme.colors.darkrGrey};
  `)}

  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

const CommentForm = ({ dispatchComments, commentableType, commentableId }) => {
  const [content, setContent] = useState();
  const handleSubmit = (event) => {
    event.preventDefault();

    createComment({
      commentable_type: commentableType,
      commentable_id: commentableId,
      content: content,
    }).then((response) => {
      setContent();
      dispatchComments({
        type: "add",
        value: response.data.data,
      });
    });
  };

  return (
    <Root>
      <form onSubmit={handleSubmit}>
        <label htmlFor="commentContent">
          <Text.Screenreader>Content</Text.Screenreader>
        </label>
        <Textarea
          id="commentContent"
          defaultValue={content}
          onChange={(event) => setContent(event.target.value)}
          placeholder="Add a new comment"
          rows="3"
        />

        {content && (
          <Actions>
            <Cancel onClick={() => setContent()}>Cancel</Cancel>
            <Button type="submit" scheme="green">
              Comment
            </Button>
          </Actions>
        )}
      </form>
    </Root>
  );
};

export default CommentForm;
