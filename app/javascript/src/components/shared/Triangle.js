import React from "react";
import styled, { css } from "styled-components";

const Triangle = styled.span`
  display: inline-block;
  height: 0;
  border-style: solid;
  border-width: 6px 6px 0 6px;
  border-color: ${(props) => props.theme.colors.blue} transparent transparent
    transparent;
  transition: transform 0.5s;
  width: 0;

  ${(props) =>
    props.toggleOpen &&
    css`
      -ms-transform: rotate(180deg); /* IE 9 */
      -webkit-transform: rotate(180deg); /* Chrome, Safari, Opera */
      transform: rotateX(180deg);
    `}

  ${(props) =>
    props.small &&
    css`
      border-width: 5px 5px 0;
    `}
`;

export default Triangle;
