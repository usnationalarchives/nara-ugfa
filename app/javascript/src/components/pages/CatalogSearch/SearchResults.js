import React, { useState, useEffect } from "react";
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

// components
import SearchResultListing from './SearchResultListing';
import Button from '../../shared/Button';
import PlusCircle from '../../shared/PlusCircle';

export const Root = styled.div`
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding: 20px;
  position: relative;

  @media all and ${(props) => props.theme.breakpoints.extraLarge} {
    padding: 50px;
  }
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
  left: 0;
  padding: 20px;
  position: absolute;
  top: 0;
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


const SearchResults = () => {

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
      <Button scheme="green-plus" onClick={toggleAddOptions}>
        Add all to Guide
        <PlusCircle/>
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
        <Link to="/my-list">My List</Link>
        <Link to="research-guide-editor">Create a Guide</Link>
      </AddOptions>
      <SearchResultListing 
      title="March on Washignton Program" 
      hierarchy="Ut enim ad minim veniam."
      identifier="Lorem Ipsum Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      added={false}
      recordType="series"/>
      <SearchResultListing 
      title="Night Scene on the Avenue" 
      hierarchy="Ut enim ad minim veniam."
      identifier="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Lorem Ipsum"
      added={true}
      recordType="series"/>
      <SearchResultListing 
      title="White House Subject Files on Human Rights" 
      hierarchy="Ut enim ad minim veniam."
      identifier="Lorem Ipsum Ut enim ad minim veniam."
      added={true}
      recordType="file-unit"/>
      <SearchResultListing 
      title="March on Washignton for Jobs and Freedom" 
      hierarchy="Ut enim ad minim veniam."
      identifier="Lorem, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      added={false}
      recordType="series"/>
      <SearchResultListing 
      title="March on Washignton Program" 
      hierarchy="Ut enim ad minim veniam."
      identifier="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      added={true}
      recordType="file-unit"/>
      <SearchResultListing 
      title="Night Scene on the Avenue" 
      hierarchy="Ut enim ad minim veniam."
      identifier="Sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      added={false}
      recordType="file-unit"/>
      <SearchResultListing 
      title="White House Subject Files on Human Rights" 
      hierarchy="Ut enim ad minim veniam."
      identifier="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      added={false}
      recordType="file-unit"/>
      <SearchResultListing 
      title="March on Washignton for Jobs and Freedom" 
      hierarchy="Ut enim ad minim veniam."
      identifier="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua"
      added={false}
      recordType="file-unit"/>
    </Root>
  );
};

export default SearchResults;
