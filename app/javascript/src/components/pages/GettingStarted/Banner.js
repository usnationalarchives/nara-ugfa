import React from "react";
import styled from "styled-components";

// components
import * as Layout from "#components/shared/Layout";
import PageWrapper from "#components/shared/PageWrapper";

export const Root = styled.div`
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.darkBlue};
  color: ${(props) => props.theme.colors.white};

  @media all and (min-width: 700px) {
    flex-direction: row;
  }
`;

export const Description = styled.p`
  font-size: 1em;
  line-height: 1.5;

  @media all and (min-width: 700px) {
    font-size: 1.2em;
  }

  @media all and (min-width: 1000px) {
    font-size: 1.5em;
  }
`;

export const Title = styled.h1`
  font-size: 1.5em;
  font-weight: bold;
  line-height: 1.25;
  margin-bottom: 10px;

  @media all and (min-width: 700px) {
    font-size: 1.9em;
  }

  @media all and (min-width: 1000px) {
    font-size: 2.2em;
    margin-bottom: 20px;
  }
`;


const Banner = () => {

  return (
    <Root>
      <Layout.Padding>
        <Layout.Wrapper narrow>
          <PageWrapper>
            <Title>Getting Started</Title>
            <Description>Learn how the new Guides to Records tool can enhance your Catalog research and browsing experience</Description>
          </PageWrapper>
        </Layout.Wrapper>
      </Layout.Padding>
    </Root>
  );
};

export default Banner;
