import React, { Fragment } from "react";
import styled from "styled-components";

// components
import * as Text from "#components/shared/Text";

// assets
import CheckIcon from "#assets/icons/check.svg";

const Form = styled.form`
  input[type="text"],
  input[type="email"],
  input[type="password"] {
    background-color: ${(props) => props.theme.colors.white};
    border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  }
`;

export const Label = styled.label`
  display: block;
`;

export const TextInput = styled.input`
  background-color: ${(props) => props.theme.colors.white};
  border-radius: 21px;
  border: 0;
  height: 42px;
  padding: 16px 22px;

  [data-whatinput="mouse"] & {
    outline: none;
  }
`;

const StyledCheckbox = styled.input`
  display: none;

  + label {
    position: relative;
    display: flex;
    align-items: center;

    &:before {
      border: 1px solid ${(props) => props.theme.colors.blue};
      content: "";
      display: inline-block;
      height: 15px;
      width: 15px;
      margin-right: 10px;
    }

    svg {
      display: none;
    }
  }

  &:checked + label {
    &:before {
      background-color: ${(props) => props.theme.colors.blue};
    }

    svg {
      display: block;
      fill: ${(props) => props.theme.colors.white};
      height: 11px;
      left: 1px;
      position: absolute;
      top: 5px;
      width: 14px;
    }
  }
`;

export const Checkbox = ({ id, label, onChange, defaultChecked, value }) => {
  return (
    <Fragment>
      <StyledCheckbox
        id={id}
        type="checkbox"
        onChange={onChange}
        defaultChecked={defaultChecked}
        value={value}
      />
      <label htmlFor={id}>
        {label}
        <CheckIcon />
      </label>
    </Fragment>
  );
};

export default Form;
