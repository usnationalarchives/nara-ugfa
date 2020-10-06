import React, { useRef, useReducer } from "react";
import Popover, { ArrowContainer } from "react-tiny-popover";
import styled, { css } from "styled-components";

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
  top: 30px;
  right: -80px;

  ${(props) =>
    props.context === "section" &&
    css`
      top: 50px;
      right: -30px;
    `}
`;

const StyledButton = styled.button`
  ${buttonReset}

  background-color: ${(props) => props.theme.colors.red};
  border-radius: 100%;
  padding: 15px;

  svg {
    width: 25px;
    height: 25px;
    fill: ${(props) => props.theme.colors.white};
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
  color: ${(props) => props.theme.colors.textLightGrey};
  font-size: 0.8rem;
  margin-bottom: 20px;
  display: flex;
  align-items: center;

  input {
    margin-right: 6px;
  }
`;

const Comments = ({
  context,
  guide,
  commentableType,
  commentableId,
  commenting,
  setCommenting,
}) => {
  const popoverEl = useRef();

  const initialComments = guide.included.filter(
    (i) =>
      i.type === "comments" &&
      i.attributes.commentable_type === commentableType &&
      parseInt(i.attributes.commentable_id) === parseInt(commentableId)
  );

  const [comments, dispatchComments] = useReducer(
    (comments, { type, value }) => {
      switch (type) {
        case "add":
          return [...comments, value];
        case "clear":
          return [];
        // case "remove":
        //   return comments.filter((c) => c.id !== value);
        // case "update":
        //   return comments.map((comment) => (comment.id === value.id ? value : comment));
        default:
          return blocks;
      }
    },
    initialComments || []
  );

  const Resolver = () => {
    const handleResolver = (event) => {
      if (event.target.checked) {
        const commentIds = comments.map((c) => c.id);
        resolveComments(commentIds, commentableId, commentableType).then(() => {
          setCommenting(false);
          dispatchComments({ type: "clear" });
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
          dispatchComments={dispatchComments}
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
