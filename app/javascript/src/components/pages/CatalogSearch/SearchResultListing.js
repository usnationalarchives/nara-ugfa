import React, { useState, useEffect, useRef } from "react";
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
  position: relative;

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

export const AddOptions = styled.div`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.mediumGrey};
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 17px 2px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 0px 17px 2px rgba(0,0,0,0.2);
  box-shadow: 0px 0px 17px 2px rgba(0,0,0,0.2);
  display: none;
  font-size: 0.8em;
  right: 0;
  padding: 20px;
  position: absolute;
  width: 250px;
  z-index: 10;

  ${props =>
  props.addOptionsVisible &&
  css`
    display: block;
  `}

  li {
    padding-bottom: 20px;
  }

  a {
    display: block;
    padding-bottom: 20px;
  }
`;

const SearchResultListing = ({ title, hierarchy, identifier, image, added, recordType }) => {
  const [addOptionsVisible, setAddOptionsVisible] = useState();

  const toggleAddOptions = () => {
    setAddOptionsVisible(!addOptionsVisible);
  }

  const clickedOut = () => {
    setAddOptionsVisible(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", clickedOut);
    return () => {
      document.removeEventListener("mousedown", clickedOut);
    };
  }, []);

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
        <Button scheme={added ? 'blue-check' : 'green-plus'} onClick={toggleAddOptions}>
          {added ? 'Added' : 'Add to Guide'}
          {added ? (<CheckedCircle/>) : (<PlusCircle/>)}
        </Button>
        <AddOptions addOptionsVisible={addOptionsVisible}>
          <ul>
            <li>
              <p>Women's Voting Rights in the 1920s</p>
              <p>Draft | Last Edited on July 16, 2020</p>
            </li>
            <li>
              <p>The JFK Presidency</p>
              <p>Published on Aug 10, 2020 | Public</p>
            </li>
          </ul>
          <Link>My List</Link>
          <Link>Create a Guide</Link>
        </AddOptions>
        {added && <Link to="/">View Guide</Link>}
      </ActionWrap>
    </Root>
  );
};

export default SearchResultListing;
