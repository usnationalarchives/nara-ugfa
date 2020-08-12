import React from "react";
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

// components
import Button from '../../shared/Button';
import PlusCircle from '../../shared/PlusCircle';
import CheckedCircle from "../../shared/CheckedCircle";

// styles
import { fl_static } from '#styles/frontline';
import { fl_attention } from '#styles/frontline';

export const Root = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;

  @media ${(props) => props.theme.breakpoints.medium} {
    flex-direction: row;
  }
`;

export const Image = styled.div`
  border: 1px solid ${props => props.theme.colors.mediumGrey};
  content: '';
  height: 100px;
  width: 15%;
`;

export const Text = styled.div`
  width: 60%;

  a {
    ${fl_static(css`
      color: ${props => props.theme.colors.blue};
      text-decoration: none;
  `)}
    ${fl_attention(css`
      text-decoration: underline;
  `)}
  }
`;

const SearchResultListing = ({ title, hierarchy, identifier, image, added }) => {
  return (
    <Root>
      <Image/>
      <Text>
        <Link to="/">{title}</Link>
        <p>{hierarchy}</p>
        <p>{identifier}</p>
      </Text>
      <Button scheme={added ? 'blue-check' : 'green-plus'}>
        {added ? 'Added' : 'Add to Guide'}
        {added ? (<CheckedCircle/>) : (<PlusCircle/>)}
      </Button>
    </Root>
  );
};

export default SearchResultListing;
