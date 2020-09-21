import styled, { css } from "styled-components";

const PlusCircle = styled.div`
  background: ${(props) => props.theme.colors.green};
  border-radius: 100%;
  display: inline-block;
  height: 28px;
  position: relative;
  margin-left: 20px;
  vertical-align: middle;
  width: 28px;

  ${(props) =>
    props.grey &&
    css`
      background: ${(props) => props.theme.colors.textLightGrey};
    `}

  &:before,
  &:after {
    background: ${(props) => props.theme.colors.white};
    bottom: 3px;
    content: "";
    left: 3px;
    position: absolute;
    right: 3px;
    top: 3px;
  }

  &:before {
    width: 2px;
    margin: 3px auto;
  }

  &:after {
    margin: auto 3px;
    height: 2px;
    box-shadow: none;
  }
`;

export default PlusCircle;
