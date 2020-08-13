import React from "react";
import styled from 'styled-components';

// components
import SearchResultListing from './SearchResultListing';
import Button from '../../shared/Button';
import PlusCircle from '../../shared/PlusCircle';

export const Root = styled.div`
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding: 20px;

  @media all and ${(props) => props.theme.breakpoints.extraLarge} {
    padding: 50px;
  }
`;

const SearchResults = () => {
  return (
    <Root>
      <Button scheme="green-plus">
        Add all to Guide
        <PlusCircle/>
      </Button>
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
