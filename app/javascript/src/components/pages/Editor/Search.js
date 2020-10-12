import React, { Fragment, useContext, useState } from "react";
import styled from "styled-components";
import { Get } from "react-axios";
import { useHistory } from "react-router-dom";

// context
import { EditorContext } from "#contexts/Editor";

// components
import * as Text from "#components/shared/Text";
import SearchResults from "#components/pages/CatalogSearch/SearchResults";
import SearchPagination from "./SearchPagination";
import FilterColumn from "#components/shared/FilterColumn";

// styles
import { buttonReset } from "#styles/mixins";
import { fl_visuallyHidden } from "#styles/frontline";

// assets
import CloseIcon from "#assets/icons/close.svg";
import SearchIcon from "#assets/icons/search.svg";

const Top = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
`;

const Close = styled.button`
  ${buttonReset}
`;

const StyledCloseIcon = styled(CloseIcon)`
  fill: ${(props) => props.theme.colors.blue};
  height: 20px;
  width: 20px;
`;

const StyledSearchIcon = styled(SearchIcon)`
  fill: ${(props) => props.theme.colors.blue};
  height: 20px;
  width: 20px;
`;

const SearchForm = styled.form`
  align-items: center;
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
`;

const QueryLabel = styled.label`
  ${fl_visuallyHidden}
`;

const Query = styled.input`
  border: 1px solid ${(props) => props.theme.colors.blue};
  font-size: 0.8rem;
  padding: 8px 12px;
  width: 50%;
`;

const Submit = styled.button`
  ${buttonReset}
  border: 1px solid ${(props) => props.theme.colors.blue};
  margin-left: 3px;
  padding: 6px;
`;

export const ColumnWrap = styled.div`
  border-top: 1px solid ${(props) => props.theme.colors.mediumGrey};
  display: flex;
`;

const ResultsColumn = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.mediumGrey};
  overflow: hidden;

  @media all and (min-width: ${(props) =>
      props.theme.layout.catalogColumnMin}) {
    width: 90%;
  }
`;

const Search = () => {
  const [query, setQuery] = useState();
  const [page, setPage] = useState(1);
  const [submitted, setSubmitted] = useState(false);
  const editorContext = useContext(EditorContext);
  const history = useHistory();

  const handleClose = () => {
    editorContext.actions.setActiveSection(null);
    editorContext.actions.setActiveGuide(null);
    editorContext.actions.setAddingRecords(false);

    // force a page reload to bring in any new descriptions added
    // window.location = `/guides/${editorContext.state.activeGuide}/edit`;
  };

  const handleChange = (event) => {
    setSubmitted(false);
    setQuery(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <Fragment>
      <Top>
        <Text.H2>Search the Catalog</Text.H2>
        <Close onClick={handleClose}>
          <StyledCloseIcon />
          <Text.Screenreader>Close</Text.Screenreader>
        </Close>
      </Top>

      <SearchForm onSubmit={handleSubmit}>
        <QueryLabel htmlFor="query">Search</QueryLabel>
        <Query type="text" id="query" name="query" onChange={handleChange} />
        <Submit type="submit">
          <Text.Screenreader>Search</Text.Screenreader>
          <StyledSearchIcon />
        </Submit>
      </SearchForm>
      {query && submitted && (
        <ColumnWrap>
          <FilterColumn />
          <ResultsColumn>
            <Get url="/descriptions" params={{ q: query, page: page }}>
              {(error, response, isLoading) => {
                if (error) {
                  return <div>Error</div>;
                } else if (isLoading) {
                  return <div>Loading...</div>;
                } else if (response !== null) {
                  return (
                    <>
                      <SearchPagination
                        page={page}
                        setPage={setPage}
                        pages={response.data.meta.pages}
                        rows={response.data.meta.rows}
                        total={response.data.meta.total}
                      />
                      <SearchResults
                        response={response}
                        results={response.data.data}
                      />
                    </>
                  );
                }

                return <div>Loading...</div>;
              }}
            </Get>
          </ResultsColumn>
        </ColumnWrap>
      )}
    </Fragment>
  );
};

export default Search;
