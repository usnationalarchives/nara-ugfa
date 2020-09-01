import React from "react";
import styled from "styled-components";

const Root = styled.div`
  padding: 40px 0;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    padding: 80px 0;
  }
`;

const PageWrapper = ({ ...props }) => {
  return <Root>{props.children}</Root>;
};

export default PageWrapper;
