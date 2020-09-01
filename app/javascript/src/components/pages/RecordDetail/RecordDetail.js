import React from "react";
import styled from "styled-components";
import { Get } from "react-axios";

// components
import UtilityBar from "./UtilityBar";
import FilterColumn from "../../shared/FilterColumn";
import RecordDetailColumn from "./RecordDetailColumn";
import NavBar from "#components/shared/NavBar";

export const Root = styled.div``;

export const ColumnWrap = styled.div`
  display: flex;
`;

const RecordDetail = ({ ...props }) => {
  const naId = props.match.params.naId;

  return (
    <Root>
      <NavBar />
      <UtilityBar />
      <ColumnWrap>
        <FilterColumn />
        <Get url={`/descriptions/${naId}`}>
          {(error, response, isLoading) => {
            if (error) {
              return <div>Error</div>;
            } else if (isLoading) {
              return <div>Loading...</div>;
            } else if (response !== null) {
              return <RecordDetailColumn data={response.data.data} />;
            }

            return <div>Loading...</div>;
          }}
        </Get>
      </ColumnWrap>
    </Root>
  );
};

export default RecordDetail;
