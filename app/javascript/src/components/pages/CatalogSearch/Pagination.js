import React, { useContext } from "react";
import styled from "styled-components";
import qs from "qs";
import { useLocation, useHistory } from "react-router-dom";

// contexts
import { SearchContext } from "#contexts/Search";

// assets
import Chev from "#assets/icons/chevron.svg";
import DoubleChev from "#assets/icons/double-chev.svg";

// styles
import { buttonReset } from "#styles/mixins";

export const Root = styled.div`
  display: flex;
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 0.9em;
  padding-left: 10px;
  margin-bottom: 10px;

  ul {
    align-items: center;
    display: flex;
    margin-right: 20px;

    li {
      display: flex;
      padding: 0 5px;

      svg + svg {
        fill: ${(props) => props.theme.colors.darkGrey};
        margin-left: -5px;
      }
    }
  }

  label {
    align-items: center;
    display: flex;

    input {
      border: 1px solid ${(props) => props.theme.colors.mediumGrey};
      margin: 0 10px;
      text-align: center;
      width: 30px;
    }
  }
`;

const First = styled.button`
  ${buttonReset}
`;

const Last = styled.button`
  ${buttonReset}
`;

const Prev = styled.button`
  ${buttonReset}
`;

const Next = styled.button`
  ${buttonReset}
`;

const Pagination = ({ results }) => {
  const handleChange = () => {};
  const searchContext = useContext(SearchContext);
  const location = useLocation();
  const history = useHistory();

  const params = qs.parse(location.search, { ignoreQueryPrefix: true });

  const handleFirst = () => {
    searchContext.actions.setPage(1);

    const { page, ...rest } = params;

    const newParams = new URLSearchParams({
      page: 1,
      ...rest,
    });

    history.push(`/?${newParams}`);
  };

  const handleLast = () => {
    searchContext.actions.setPage(results.pages);
    const { page, ...rest } = params;

    const newParams = new URLSearchParams({
      page: results.pages,
      ...rest,
    });

    history.push(`/?${newParams}`);
  };

  const handlePrev = () => {
    const newPage = results.page - 1;
    searchContext.actions.setPage(newPage);

    const { page, ...rest } = params;

    const newParams = new URLSearchParams({
      page: newPage,
      ...rest,
    });

    history.push(`/?${newParams}`);
  };

  const handleNext = () => {
    const newPage = results.page + 1;
    searchContext.actions.setPage(newPage);

    const { page, ...rest } = params;

    const newParams = new URLSearchParams({
      page: newPage,
      ...rest,
    });

    history.push(`/?${newParams}`);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const page = parseInt(event.target.elements["page"].value);
    searchContext.actions.setPage(page);
  };

  const handleRows = (event) => {
    event.preventDefault();
    const newRows = parseInt(event.target.elements["rows"].value);
    searchContext.actions.setRows(newRows);

    const { rows, ...rest } = params;

    const newParams = new URLSearchParams({
      rows: newRows,
      ...rest,
    });

    history.push(`/?${newParams}`);
  };

  return (
    <Root>
      <ul>
        <li>
          <First onClick={handleFirst} disabled={results.page === 1}>
            <DoubleChev width="13" />
          </First>
        </li>
        <li>
          <Prev onClick={handlePrev} disabled={results.page === 1}>
            <Chev width="10" />
          </Prev>
        </li>
        <li>
          <form onSubmit={handleSubmit}>
            <label>
              Page
              <input
                type="text"
                name="page"
                defaultValue={searchContext.state.page}
              ></input>
              of {results.pages}
            </label>
          </form>
        </li>
        <li>
          <Next onClick={handleNext} disabled={results.page === results.pages}>
            <Chev width="10" style={{ transform: "rotate(180deg)" }} />
          </Next>
        </li>
        <li>
          <Last onClick={handleLast} disabled={results.page === results.pages}>
            <DoubleChev width="13" style={{ transform: "rotate(180deg)" }} />
          </Last>
        </li>
      </ul>
      <form onSubmit={handleRows}>
        <label>
          Results Per Page
          <input
            type="text"
            name="rows"
            defaultValue={searchContext.state.rows}
          ></input>
        </label>
      </form>
    </Root>
  );
};

export default Pagination;
