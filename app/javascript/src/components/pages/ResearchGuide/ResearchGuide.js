import React from "react";
import styled from 'styled-components';

// components
import Banner from './Banner';
import GuideIntro from './GuideIntro';
import Section from './Section';

export const Root = styled.div`
`;

const ResearchGuide = () => {
  return (
    <Root>
      <Banner />
      <GuideIntro />
      <Section title="Leaders of the March" />
      <Section title="Planning Documents"/>
    </Root>
  );
};

export default ResearchGuide;
