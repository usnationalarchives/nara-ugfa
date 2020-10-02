import React from "react";
import styled from 'styled-components';

export const Root = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  color: ${(props) => props.theme.colors.white};
`;

const Footer = () => {
  return (
    <Root>
      <p>Footer</p>
    </Root>
  );
};

export default Footer;
