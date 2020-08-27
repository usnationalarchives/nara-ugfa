import React from "react";
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";
import SectionItem from './SectionItem';

// styles
import { fl_static } from "#styles/frontline";
import { fl_attention } from "#styles/frontline";
import ResearchHighlight from "./ResearchHighlight";

export const Root = styled.div`
  &:last-of-type  {
    margin-bottom: 50px;
  }
`;

export const SectionTitle = styled.h2`
  color: ${(props) => props.theme.colors.darkGrey};
  font-size: 1.6em;
  font-weight: bold;
  margin: 30px 0 10px 0;
  padding: 0 20px;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    font-size: 2em;
    margin: 50px 0 20px 0;
    padding: 0;
  }
`;


const Section = ({ title }) => {
  return (
    <Root>
      <Layout.Wrapper narrow={true}>
        <SectionTitle>{ title }</SectionTitle>
        <SectionItem item={true} image={true}/>
        <SectionItem fileUnit={true}/>
        <ResearchHighlight />
        <SectionItem series={true} />
        <SectionItem fileUnit={true}/>
        <SectionItem item={true}/>
      </Layout.Wrapper>
    </Root>
  );
};

export default Section;
