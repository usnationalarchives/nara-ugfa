import styled from "styled-components";

const horizontalGutter = 30;
const verticalGutter = 30;

const Grid = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0 -${horizontalGutter / 2}px;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

const GridItem = styled.li`
  padding: ${verticalGutter / 2}px ${horizontalGutter / 2}px;
  display: flex;
  align-items: stretch;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    width: 50%;
  }

  @media all and ${(props) => props.theme.breakpoints.large} {
    width: 33.33%;
  }
`;

export { Grid, GridItem };
