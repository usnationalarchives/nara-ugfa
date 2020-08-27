import React from "react";
import styled from "styled-components";

// components
import Record from "./Record";

export const Root = styled.div`
  border-left: 1px solid ${(props) => props.theme.colors.mediumGrey};
  overflow: hidden;
  width: 100%;

  @media all and (min-width: ${(props) =>
      props.theme.layout.catalogColumnMin}) {
    width: 90%;
  }
`;

const RecordDetailColumn = ({ data }) => {
  return (
    <Root>
      <Record data={data} />
    </Root>
  );
};

export default RecordDetailColumn;
