import React from "react";
import styled from 'styled-components';

// components
import Pagination from './Pagination';

export const Root = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.mediumGrey};
  max-width: ${(props) => props.theme.layout.maxWidth};
`;

export const NavList = styled.ul`
  display: flex;

  li  {
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
      border-bottom: 4px solid ${props => props.theme.colors.red};
      color: ${props => props.theme.colors.red};
      opacity: 1;
    }
  }
`;

export const Wrap = styled.ul`
  display: flex;
  flex-direction: column-reverse;
  max-width:${(props) => props.theme.layout.maxWidth};
  padding-top: 20px;

  @media all and ${(props) => props.theme.breakpoints.extraLarge} {
    flex-direction: row;
    justify-content: space-between;
    padding-top: 0;
  }
`;

const ResultsNavigation = () => {
  return (
    <Root>
      <Wrap>
        <NavList>
          <li className="--active">All</li>
          <li>Available Online</li>
          <li>Web Pages</li>
          <li>Documents</li>
          <li>Images</li>
          <li>Videos</li>
        </NavList>
        <Pagination/>
      </Wrap>
    </Root>
  );
};

export default ResultsNavigation;
