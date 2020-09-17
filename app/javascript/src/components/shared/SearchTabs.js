import React from "react";
import styled from "styled-components";

const Root = styled.ul`
  display: flex;

  li {
    opacity: 0.3;
    padding: 20px 10px;

    @media all and (min-width: 800px) {
      padding: 20px;
    }

    @media all and (min-width: 900px) {
      padding: 20px 10px;
    }

    @media all and (min-width: 1400px) {
      padding: 20px;
    }

    &.--active {
      border-bottom: 4px solid ${(props) => props.theme.colors.red};
      color: ${(props) => props.theme.colors.red};
      opacity: 1;
    }
  }
`;

const SearchTabs = () => {
  return (
    <Root>
      <li className="--active">All</li>
      <li>Available Online</li>
      <li>Web Pages</li>
      <li>Documents</li>
      <li>Images</li>
      <li>Videos</li>
    </Root>
  );
};

export default SearchTabs;
