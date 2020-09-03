import React from "react";
import styled, { css } from "styled-components";
import PropTypes from "prop-types";
import { buttonReset } from "#styles/mixins";
import tinycolor from "tinycolor2";

export const buttonStyles = css`
  ${buttonReset}
  border-radius: 23px;
  border: 1px solid ${(props) => props.theme.colors.white};
  display: inline-block;
  font-size: 0.75rem;
  font-weight: bold;
  line-height: 1rem;
  padding: 15px 22px;
  text-decoration: none;
  text-transform: uppercase;

  // > * {
  //   position: relative;
  //   line-height: 1;
  //   vertical-align: middle;
  // }

  svg:last-child {
    margin-left: 5px;
  }

  &:focus {
    outline: none;
  }

  ${(props) =>
    props.scheme === "green" &&
    css`
      background-color: ${(props) => props.theme.colors.green};
      color: #fff;

      &:focus,
      &:hover {
        background-color: ${(props) =>
          tinycolor(props.theme.colors.green).darken(10).toString()};
      }
    `};

  ${(props) =>
    props.scheme === "blue" &&
    css`
      background-color: ${(props) => props.theme.colors.blue};
      color: #fff;

      &:focus,
      &:hover {
        background-color: ${(props) =>
          tinycolor(props.theme.colors.blue).darken(10).toString()};
      }
    `};

  ${(props) =>
    props.scheme === "green-plus" &&
    css`
      align-items: center;
      border: 1px solid ${(props) => props.theme.colors.mediumGrey};
      border-radius: 40px;
      color: ${(props) => props.theme.colors.green};
      display: flex;
      font-size: 0.9em;
      font-weight: normal;
      justify-content: space-between;
      padding: 8px 7px 8px 20px;
      position: relative;
      text-transform: uppercase;

      &:focus,
      &:hover {
        border: 1px solid ${(props) => props.theme.colors.green};
      }
    `};

  ${(props) =>
    props.scheme === "blue-check" &&
    css`
      align-items: center;
      border: 1px solid ${(props) => props.theme.colors.mediumGrey};
      border-radius: 40px;
      color: ${(props) => props.theme.colors.blue};
      display: flex;
      font-size: 0.9em;
      font-weight: normal;
      justify-content: space-between;
      padding: 8px 7px 8px 20px;
      text-transform: uppercase;
      width: 160px;

      &:focus,
      &:hover {
        border: 1px solid ${(props) => props.theme.colors.mediumGrey};
      }
    `};

  ${(props) =>
    props.scheme === "outline" &&
    css`
      border: 1px solid ${(props) => props.theme.colors.blue};
      color: ${(props) => props.theme.colors.blue};
    `};

  ${(props) =>
    props.disabled === "true" &&
    css`
      background-color: ${(props) => props.theme.colors.mediumGrey};

      &:focus,
      &:hover {
        background-color: ${(props) =>
          tinycolor(props.theme.colors.mediumGrey).darken(3).toString()};};
      }
    `};

  ${(props) =>
    props.block &&
    css`
      display: block;
      width: 100%;
    `}
`;

export const ButtonLink = styled.a`
  ${buttonStyles}
`;

const Button = styled.button`
  ${buttonStyles}
`;

export default Button;
