import React, { useState } from "react";
import styled from "styled-components";

// components
import SearchTabs from "#components/shared/SearchTabs";

// assets
import Chev from "#assets/icons/chevron.svg";
import DoubleChev from "#assets/icons/double-chev.svg";

// styles
import { buttonReset } from "#styles/mixins";

const Root = styled.div`
  border-bottom: 1px solid ${(props) => props.theme.colors.mediumGrey};
`;

const Inner = styled.div`
  display: flex;
  flex-direction: column-reverse;
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding-top: 20px;

  @media all and ${(props) => props.theme.breakpoints.extraLarge} {
    flex-direction: row;
    justify-content: space-between;
    padding-top: 0;
  }
`;

const Pagination = styled.div`
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

const ResultsNavigation = ({ pages, page, setPage, rows, total }) => {
  const handleFirst = () => {
    setPage(1);
  };

  const handleLast = () => {
    setPage(pages);
  };

  const handlePrev = () => {
    setPage(page - 1);
  };

  const handleNext = () => {
    setPage(page + 1);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const pageNumber = parseInt(event.target.elements["page"].value);
    setPage(pageNumber);
  };

  return (
    <Root>
      <Inner>
        <SearchTabs />
        <Pagination>
          <ul>
            <li>
              <First onClick={handleFirst} disabled={page === 1}>
                <DoubleChev width="13" />
              </First>
            </li>
            <li>
              <Prev onClick={handlePrev} disabled={page === 1}>
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
                    value={page}
                    onChange={(event) => setPage(event.target.value)}
                  ></input>
                  of {pages}
                </label>
              </form>
            </li>
            <li>
              <Next onClick={handleNext} disabled={page === pages}>
                <Chev width="10" style={{ transform: "rotate(180deg)" }} />
              </Next>
            </li>
            <li>
              <Last onClick={handleLast} disabled={page === pages}>
                <DoubleChev
                  width="13"
                  style={{ transform: "rotate(180deg)" }}
                />
              </Last>
            </li>
          </ul>
        </Pagination>
      </Inner>
    </Root>
  );
};

export default ResultsNavigation;
