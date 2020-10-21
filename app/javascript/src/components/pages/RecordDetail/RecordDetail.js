import React from "react";
import styled from "styled-components";
import { Get } from "react-axios";

// components
import UtilityBar from "./UtilityBar";
import FilterColumn from "../../shared/FilterColumn";
import RecordDetailColumn from "./RecordDetailColumn";
import NavBar from "#components/shared/NavBar";
import PageLoader from "#components/shared/PageLoader";

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
              return <PageLoader />;
            } else if (response !== null) {
              return <RecordDetailColumn response={response} />;
            }

            return <PageLoader />;
          }}
        </Get>
      </ColumnWrap>
    </Root>
  );
};

export default RecordDetail;
