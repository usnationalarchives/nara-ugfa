import React from "react";
import styled from "styled-components";

// components
import * as Layout from "#components/shared/Layout";

export const Root = styled.div`
  align-items: stretch;
  background-color: ${(props) => props.theme.colors.darkGrey};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-height: 300px;

  @media all and (min-width: 700px) {
    flex-direction: row;
  }
`;

export const Content = styled.div`
  margin: auto;
  padding: 20px 0;

  @media all and (min-width: 700px) {
    width: 500px;
  }

  @media all and (min-width: 1000px) {
    max-width: 700px;
  }
`;

export const Title = styled.h1`
  color: ${(props) => props.theme.colors.white};
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

export const Attribution = styled.p`
  color: ${(props) => props.theme.colors.white};
`;

export const PublishedDate = styled.p`
  color: ${(props) => props.theme.colors.white};
  font-size: 0.8em;
  margin-top: 20px;
  text-transform: uppercase;
  opacity: 0.7;
`;

export const Image = styled.div`
  background-color: ${(props) => props.theme.colors.mediumGrey};
  height: 150px;
  width: 100%;

  @media all and (min-width: 700px) {
    height: inherit;
    width: 33%;
  }
`;

const Banner = ({ data }) => {
  return (
    <Root>
      <Content>
        <Layout.Padding>
          <Title>{data.attributes.title}</Title>
          <Attribution>
            {data.attributes.author.name}, {data.attributes.author.role}
          </Attribution>
          <PublishedDate>Last Edit {data.attributes.updated}</PublishedDate>
        </Layout.Padding>
      </Content>
      <Image></Image>
    </Root>
  );
};

export default Banner;
