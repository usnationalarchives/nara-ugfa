import { css } from "styled-components";

export const buttonReset = css`
  background-color: transparent;
  background-image: none; // for Firefox mobile
  border: 0;
  color: inherit;
  cursor: pointer;
  display: inline-block;
  line-height: 1;
  text-align: center;
  transition: background-color 150ms ease-in-out, border 150ms ease-in-out,
    color 150ms ease-in-out, transform 50ms ease-in-out;
`;
