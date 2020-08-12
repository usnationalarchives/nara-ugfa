import React from 'react';
import styled, { css } from 'styled-components';

// asset
import Check from '#assets/icons/check.svg';

const Root = styled.div`
  background: ${props => props.theme.colors.blue};
  border-radius: 100%;
  display: inline-block;
  height: 30px;
  position: relative;
  margin-left: 10px;

  -ms-transform: rotate(45deg); /* IE 9 */
  -webkit-transform: rotate(45deg); /* Chrome, Safari, Opera */
  transform: rotate(45deg);
  
  vertical-align: middle;
  width: 30px;
`;


const Stem = styled.div`
  background-color:#fff;
  height: 13px;
  left: 15px;
  position: absolute;
  top: 6px;
  width: 2px;
`;

const Kick = styled.div`
  background-color:#fff;
  height: 2px;
  left: 10px;
  position: absolute;
  top: 18px;
  width: 7px;
`;


const CheckedCircle = () => {

  return (
    <Root>
      <Stem/>
      <Kick/>
    </Root>
  );
};

export default CheckedCircle;