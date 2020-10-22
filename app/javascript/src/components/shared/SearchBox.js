import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import SearchIcon from "#assets/icons/search.svg";

// contexts
import { SearchContext } from "#contexts/Search";

// components
import * as Text from "#components/shared/Text";

export const Root = styled.form`
  align-items: center;
  display: flex;
  width: 100%;

  @media all and ${(props) => props.theme.breakpoints.navBP} {
    width: 60%;
  }
`;

export const Label = styled.label`
  width: 70%;
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
  display: none;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    font-size: 0.9em;
    opacity: 0.3;
    padding-left: 10px;
    width: 30%;
  }
`;

const SearchBox = () => {
  const history = useHistory();
  const searchContext = useContext(SearchContext);

  const performSearch = (event) => {
    event.preventDefault();
    const query = event.target.elements["query"].value;
    searchContext.actions.setQuery(query);
    history.push(`/search?q=${query}`);
  };

  return (
    <Root onSubmit={performSearch}>
      <Label htmlFor="query">
        <Text.Screenreader>Search the Catalog</Text.Screenreader>

        <Input
          type="text"
          defaultValue={searchContext.state.query}
          name="query"
          id="query"
        />
      </Label>
      <SubmitButton type="submit" value="Submit">
        <SearchIcon height="20" fill="currentColor" />
        <Text.Screenreader>Search</Text.Screenreader>
      </SubmitButton>
      <AdvancedSearch>Advanced Search</AdvancedSearch>
    </Root>
  );
};

export default SearchBox;
