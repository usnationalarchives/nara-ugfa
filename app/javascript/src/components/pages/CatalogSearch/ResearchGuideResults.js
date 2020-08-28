import React from "react";
import styled, { css }  from 'styled-components';
import { Link } from "react-router-dom";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import ResearchGuideCard from './ResearchGuideCard';

// styles
import { fl_allStates } from '#styles/frontline';

export const Root = styled.div`
  background-color: ${props => props.theme.colors.lightGrey};
  border-bottom: 1px solid ${props => props.theme.colors.mediumGrey};

  h3 {
    margin-bottom: 20px;
  }

  a {
    ${fl_allStates(css`
      color: ${props => props.theme.colors.blue};
      text-decoration: none;
  `)}
    display: inline-block;
    font-size: 0.9em;
    font-weight: bold;
    margin-top: 20px;
    text-transform: uppercase;
  }
`;

export const ResearchGuideGridWrap = styled.div`
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding: 20px;
  
  @media all and (min-width: ${(props) =>
    props.theme.layout.catalogColumnMin}) {
    padding: 50px;
  }
`;

export const ResearchGuideGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
`;

const ResearchGuideResults = () => {
  return (
    <Root>
      <ResearchGuideGridWrap>
        <Text.H3>Research Guides</Text.H3>
        <p>The following research guides published by NARA are related to your search</p>
        <ResearchGuideGrid>
          <ResearchGuideCard 
          title="Photographs from the Civil Rights Movement"
          image={true}/>
          <ResearchGuideCard 
          title="The 1960's in Pictures"
          image={true}/>
          <ResearchGuideCard 
          title="Women in the Civil Rights Movement and Black Power Movements"
          image={false}/>
          <ResearchGuideCard 
          title="The JFK Presidency"
          image={true}/>
        </ResearchGuideGrid>
        <Layout.Right>
          <Link to="/research-guides">View All</Link>
        </Layout.Right>
      </ResearchGuideGridWrap>
    </Root>
  );
};

export default ResearchGuideResults;
