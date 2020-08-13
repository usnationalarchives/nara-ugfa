import React from "react";
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

// components
import Button from '../../shared/Button';
import PlusCircle from '../../shared/PlusCircle';
import CheckedCircle from "../../shared/CheckedCircle";

// assets
import SeriesPlaceholder from '#assets/images/series-placeholder.svg';
import FileUnitPlaceholder from '#assets/images/fileunit-placeholder.svg';

// styles
import { fl_static } from '#styles/frontline';
import { fl_attention } from '#styles/frontline';

export const Root = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;

  &:first-of-type {
    margin-top: 20px;
  }

  @media ${(props) => props.theme.breakpoints.medium} {
    flex-direction: row;
  }
`;

export const Image = styled.div`
  border: 1px solid ${props => props.theme.colors.mediumGrey};
  content: '';
  height: 100px;
  width: 10%;
`;

export const Text = styled.div`
  margin-bottom: 20px;

  @media ${(props) => props.theme.breakpoints.medium} {
    margin-bottom: 0;
    padding: 0 20px;
    width: 70%;
  }

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

export const ActionWrap = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;

  a {
    ${fl_static(css`
      color: ${props => props.theme.colors.blue};
      font-size: 0.8em;
      text-decoration: none;
      text-transform: uppercase;
      margin-top: 5px;
  `)}
    ${fl_attention(css`
      text-decoration: underline;
  `)}
  }
`;

export const ImageWrap = styled.div`
  svg {
    width: 80px;
  }
`;

export const Hierarchy = styled.div`
  color: ${props => props.theme.colors.green};
  font-style: italic;
`;

const SearchResultListing = ({ title, hierarchy, identifier, image, added, recordType }) => {
  return (
    <Root>
      <ImageWrap>
        {recordType == "series" ? <SeriesPlaceholder/> : ''}
        {recordType == "file-unit" ? <FileUnitPlaceholder/> : ''}
      </ImageWrap>
      <Text>
        <Link to="/">{title}</Link>
        <Hierarchy>{hierarchy}</Hierarchy>
        <p>{identifier}</p>
      </Text>
      <ActionWrap>
        <Button scheme={added ? 'blue-check' : 'green-plus'}>
          {added ? 'Added' : 'Add to Guide'}
          {added ? (<CheckedCircle/>) : (<PlusCircle/>)}
        </Button>
        {added && <Link to="/">View Guide</Link>}
      </ActionWrap>
    </Root>
  );
};

export default SearchResultListing;
