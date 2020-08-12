import React, { useState } from "react";
import styled from 'styled-components';
import SearchIcon from '#assets/icons/search.svg';

// components
import * as Text from "#components/shared/Text";

export const Root = styled.form`
  align-items: center;
  display: flex;
  width: 60%
`;

export const Form = styled.form`
  display: flex;
  max-width: 500px;
  width: 90%;
`;

export const Label = styled.label`
  width: 100%;
`;

export const Input = styled.input`
  background-color: ${(props) => props.theme.colors.white};
  border: none;
  height: 35px;
  padding: 0 10px;
  width: 100%;
`;

export const SubmitButton = styled.button`
  background-color: ${(props) => props.theme.colors.white};
  border: none;
  color: ${(props) => props.theme.colors.darkGrey};
  height: 35px;
  margin-left: 2px;
  padding-top: 3px;
  width: 40px;
`;

export const AdvancedSearch = styled.p`
  font-size: 0.9em;
  opacity: 0.3;
  padding-left: 10px;
`;

const SearchBox = () => {
  const [query, setQuery] = useState('');

  const updateQuery = (evt) => {
    setQuery(evt.target.value);
  }

  const performSearch = (evt) => {
    evt.preventDefault();
    console.log(query);
  }

  return (
    <Root>
      <Label htmlFor="query">
        <Text.Screenreader>Search the Catalog</Text.Screenreader>
        <Input type="text" value={query} id="query" onChange={updateQuery}/>
      </Label>
      <SubmitButton type="submit" value="Submit" onClick={performSearch}>
        <SearchIcon height="20" fill="currentColor"/>
      </SubmitButton>
      <AdvancedSearch>Advanced Search</AdvancedSearch>
    </Root>
  );
};

export default SearchBox;
