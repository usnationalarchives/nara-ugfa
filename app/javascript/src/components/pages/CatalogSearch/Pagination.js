import React from "react";
import styled from 'styled-components';

// assets
import Chev from '#assets/icons/chevron.svg';
import DoubleChev from '#assets/icons/double-chev.svg';

export const Root = styled.div`
  display: flex;
  color: ${props => props.theme.colors.darkGrey};
  font-size: 0.9em;
  padding-left: 10px;
  margin-bottom: 10px;

  ul {
    align-items: center;
    display: flex;
    margin-right: 20px;

    li {
      display: flex;
      padding:  0 5px;

      svg + svg {
        fill: ${props => props.theme.colors.darkGrey};
        margin-left: -5px;
      }
    }
  }

  label {
    align-items: center;
    display: flex;

    input {
      border: 1px solid ${props => props.theme.colors.mediumGrey};
      margin: 0 10px;
      text-align: center;
      width: 30px;
    }
  }
`;

const Pagination = () => {
  return (
    <Root>
      <ul>
        <li>
          <DoubleChev width="13"/>
        </li>
        <li>
          <Chev width="10"/>
        </li>
        <li>1</li>
        <li>2</li>
        <li>3</li>
        <li>
          <label>
          Page
            <input type="text" value="1"></input>
            of 18,000
          </label>
        </li>
        <li>
          <Chev width="10" style={{transform: 'rotate(180deg)'}}/>
        </li>
        <li>
          <DoubleChev width="13" style={{transform: 'rotate(180deg)'}}/>
        </li>
      </ul>
      <label>
        Results Per Page
        <input type="text" value="20"></input>
      </label>
    </Root>
  );
};

export default Pagination;
