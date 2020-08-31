import React, { Fragment } from "react";
import styled from "styled-components";
import { Get } from "react-axios";

// components
import Banner from "./Banner";
import GuideIntro from "./GuideIntro";
import Section from "./Section";

export const Root = styled.div``;

const ResearchGuide = ({ ...props }) => {
  const id = props.match.params.id;

  return (
    <Root>
      <Get url={`/guides/${id}`}>
        {(error, response, isLoading) => {
          if (error) {
            return <div>Error</div>;
          } else if (isLoading) {
            return <div>Loading...</div>;
          } else if (response !== null) {
            return (
              <Fragment>
                <Banner data={response.data.data} />
                <GuideIntro data={response.data.data} />
                <Section title="Leaders of the March" />
                <Section title="Planning Documents" />
              </Fragment>
            );
          }

          return <div>Loading...</div>;
        }}
      </Get>
    </Root>
  );
};

export default ResearchGuide;
