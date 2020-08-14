import React from "react";
import styled from 'styled-components';

// components
import UtilityBar from './UtilityBar';
import FilterColumn from '../../shared/FilterColumn';
import RecordDetailColumn from './RecordDetailColumn';

export const Root = styled.div`
`;

export const ColumnWrap = styled.div`
  display: flex;
`;

const RecordDetail = () => {
  return (
    <Root>
      <UtilityBar />
      <ColumnWrap>
        <FilterColumn />
        <RecordDetailColumn />
      </ColumnWrap>
    </Root>
  );
};

export default RecordDetail;
