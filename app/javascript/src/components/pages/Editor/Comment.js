import React from "react";
import styled, { css } from "styled-components";
import Autolinker from "autolinker";

// styles
import { fl_allStates } from "#styles/frontline";

const Root = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.mediumGrey};
  margin-bottom: 20px;
  padding-bottom: 20px;

  &:last-child {
    border: 0;
    padding-bottom: 0;
  }
`;

const MetaRoot = styled.div`
  align-items: center;
  display: flex;
`;

const Content = styled.p`
  font-size: 0.9rem;
  margin-top: 20px;

  a {
    ${fl_allStates(css`
      color: ${(props) => props.theme.colors.blue};
    `)}
  }
`;

const MetaAvatar = styled.img`
  border-radius: 100%;
  height: 40px;
  margin-right: 10px;
  width: 40px;
`;

const MetaInner = styled.div``;

const Name = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
`;

const Created = styled.p`
  font-size: 0.75rem;
  opacity: 0.5;
`;

const Comment = ({ comment }) => {
  const Meta = () => {
    return (
      <MetaRoot>
        <MetaAvatar
          src={comment.attributes.gravatar}
          aria-hidden="true"
          role="presentation"
        />
        <MetaInner>
          <Name>{comment.attributes.user_name}</Name>
          <Created>{comment.attributes.created}</Created>
        </MetaInner>
      </MetaRoot>
    );
  };

  return (
    <Root>
      <Meta />
      <Content
        dangerouslySetInnerHTML={{
          __html: Autolinker.link(comment.attributes.content),
        }}
      />
    </Root>
  );
};

export default Comment;
