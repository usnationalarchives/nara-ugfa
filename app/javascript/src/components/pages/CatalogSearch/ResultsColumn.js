import React, { useContext } from "react";
import styled from "styled-components";
import { Get } from "react-axios";

// contexts
import { SearchContext } from "#contexts/Search";

// components
import ResultsNavigation from "./ResultsNavigation";
import ResearchGuideResults from "./ResearchGuideResults";
import SearchResults from "./SearchResults";

export const Root = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.mediumGrey};
  overflow: hidden;

  @media all and (min-width: ${(props) =>
      props.theme.layout.catalogColumnMin}) {
    width: 90%;
  }
`;

const ResultsColumn = () => {
  const searchContext = useContext(SearchContext);
  return (
    <Root>
      <Get
        url="/descriptions"
        params={{
          q: searchContext.state.query,
          rows: searchContext.state.rows,
          page: searchContext.state.page,
        }}
      >
        {(error, response, isLoading) => {
          if (error) {
            return <div>Error</div>;
          } else if (isLoading) {
            return <div>Loading...</div>;
          } else if (response !== null) {
            return (
              <>
                <ResultsNavigation
                  data={{
                    pages: response.headers["X-Pages"],
                    page: response.headers["X-Page"],
                    rows: response.headers["X-Rows"],
                    total: response.headers["X-Total"],
                  }}
                />
                <ResearchGuideResults />
                <SearchResults results={response.data.data} />
              </>
            );
          }

          return <div>Loading...</div>;
        }}
      </Get>
    </Root>
  );
};

export default ResultsColumn;
