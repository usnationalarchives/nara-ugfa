import React from "react";
import styled, { css } from "styled-components";

// styles
import { fl_static, fl_attention } from "#styles/frontline";

const List = styled.ol``;

const ListItem = styled.li`
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }

  a {
    ${fl_static(css`
      color: ${(props) => props.theme.colors.blue};
      text-decoration: none;
    `)}

    ${fl_attention(css`
      text-decoration: underline;
    `)}
  }
`;

const Creators = ({ creators }) => {
  const Creator = ({ creator }) => {
    return (
      <a href={`https://catalog.archives.gov/id/${creator.naId}`}>
        {creator.name}
      </a>
    );
  };

  return (
    <List>
      {creators.map((creator, i) => (
        <ListItem key={creator.naId}>
          <Creator creator={creator} />
          {i === 0 && " (Most Recent)"}
          {i !== 0 && " (Predecessor)"}
        </ListItem>
      ))}
    </List>
  );
};

export default Creators;
