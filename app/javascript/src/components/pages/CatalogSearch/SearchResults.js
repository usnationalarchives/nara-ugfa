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
      hierarchy="Lorem Ipsum"
      identifier="Lorem Ipsum"
      added={false}/>
      <SearchResultListing 
      title="Night Scene on the Avenue" 
      hierarchy="Lorem Ipsum"
      identifier="Lorem Ipsum"
      added={true}/>
      <SearchResultListing 
      title="White House Subject Files on Human Rights" 
      hierarchy="Lorem Ipsum"
      identifier="Lorem Ipsum"
      added={true}/>
      <SearchResultListing 
      title="March on Washignton for Jobs and Freedom" 
      hierarchy="Lorem Ipsum"
      identifier="Lorem Ipsum"
      added={false}/>
      <SearchResultListing 
      title="March on Washignton Program" 
      hierarchy="Lorem Ipsum"
      identifier="Lorem Ipsum"
      added={true}/>
      <SearchResultListing 
      title="Night Scene on the Avenue" 
      hierarchy="Lorem Ipsum"
      identifier="Lorem Ipsum"
      added={false}/>
      <SearchResultListing 
      title="White House Subject Files on Human Rights" 
      hierarchy="Lorem Ipsum"
      identifier="Lorem Ipsum"
      added={false}/>
      <SearchResultListing 
      title="March on Washignton for Jobs and Freedom" 
      hierarchy="Lorem Ipsum"
      identifier="Lorem Ipsum"
      added={false}/>
    </Root>
  );
};

export default SearchResults;
