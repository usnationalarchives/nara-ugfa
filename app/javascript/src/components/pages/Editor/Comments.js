import React, { useRef, useContext } from "react";
import Popover, { ArrowContainer } from "react-tiny-popover";
import styled, { css } from "styled-components";

// contexts

import { EditorContext } from "#contexts/Editor";

// components
import * as Text from "#components/shared/Text";
import Comment from "./Comment";
import CommentForm from "./CommentForm";

// styles
import { buttonReset } from "#styles/mixins";

// assets
import CommentIcon from "#assets/icons/comment.svg";

// api
import { resolveComments } from "#api/internal/comment";

const Root = styled.div`
  position: absolute;
  top: 80px;
  right: -40px;

  ${(props) =>
    props.context === "section" &&
    css`
      top: 50px;
      right: -25px;
    `}

  @media all and ${(props) => props.theme.breakpoints.medium} {
    top: 30px;
    right: -80px;

    ${(props) =>
      props.context === "section" &&
      css`
        top: 50px;
        right: -30px;
      `}
  }
`;

const StyledButton = styled.button`
  ${buttonReset}

  background-color: ${(props) => props.theme.colors.orange};
  border-radius: 20px 0 0 20px;
  padding: 10px 30px 10px 15px;

  svg {
    width: 18px;
    height: 18px;
    fill: ${(props) => props.theme.colors.white};
  }

  @media all and ${(props) => props.theme.breakpoints.medium} {
    border-radius: 100%;
    padding: 15px;

    svg {
      width: 25px;
      height: 25px;
    }
  }
`;

const StyledPopover = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 5px;
  box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  padding: 20px;
  text-align: left;
  width: 300px;
`;

const ResolverRoot = styled.div`
  align-items: center;
  color: ${(props) => props.theme.colors.textLightGrey};
  display: flex;
  font-size: 0.8rem;
  margin-bottom: 20px;

  input {
    margin-right: 6px;
  }
`;

const Comments = ({
  context,
  commentableType,
  commentableId,
  commenting,
  setCommenting,
}) => {
  const popoverEl = useRef();
  const editorContext = useContext(EditorContext);
  const comments = editorContext.state.comments.filter(
    (c) =>
      c.attributes.commentable_type === commentableType &&
      parseInt(c.attributes.commentable_id) === parseInt(commentableId)
  );

  const Resolver = () => {
    const handleResolver = (event) => {
      if (event.target.checked) {
        const commentIds = comments.map((c) => parseInt(c.id));
        resolveComments(commentIds, commentableId, commentableType).then(() => {
          setCommenting(false);
          editorContext.actions.dispatchComments({
            type: "clearCommentable",
            commentIds: commentIds,
          });
        });
      }
    };

    return (
      <ResolverRoot>
        <input type="checkbox" id="markResolved" onChange={handleResolver} />
        <label htmlFor="markResolved">Mark as resolved</label>
      </ResolverRoot>
    );
  };

  const PopoverContent = () => {
    return (
      <StyledPopover>
        {comments.length > 0 && <Resolver />}

        <div>
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>

        <CommentForm
          dispatchComments={editorContext.actions.dispatchComments}
          commentableType={commentableType}
          commentableId={commentableId}
        />
      </StyledPopover>
    );
  };

  return (
    <Root context={context}>
      {(comments.length > 0 || commenting) && (
        <Popover
          isOpen={commenting}
          position="bottom"
          onClickOutside={() => setCommenting(false)}
          containerStyle={{ overflow: "visible", zIndex: "500" }}
          content={({ position, targetRect, popoverRect }) => (
            <ArrowContainer
              position={position}
              targetRect={targetRect}
              popoverRect={popoverRect}
              arrowColor={"white"}
              arrowSize={8}
            >
              <PopoverContent />
            </ArrowContainer>
          )}
        >
          <div style={{ position: "relative" }}>
            <StyledButton onClick={() => setCommenting(!commenting)}>
              <Text.Screenreader>Comments</Text.Screenreader>
              <CommentIcon />
            </StyledButton>
            <div ref={popoverEl}></div>
          </div>
        </Popover>
      )}
    </Root>
  );
};

export default Comments;
