import styled from "styled-components";

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

export default Form;
