import React from "react";
import styled from 'styled-components';

export const Root = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.mediumGrey};
  font-size: 0.9em;
`;

export const Utilties = styled.div`
  display: flex;
  margin-left: 150px;
  padding: 10px 0;

  @media all and (min-width: 1000px) {
    margin-left: 200px;
  }
`;

const UtilityBar = () => {
  return (
    <Root>
      <Utilties>
        <p>1-20 of 345,238 results in 1.38 seconds. Show expanded search terms.</p>
      </Utilties>
    </Root>
  );
};

export default UtilityBar;
