import React, { Fragment } from "react";
import styled from "styled-components";
import { Get } from "react-axios";
// contexts
import { GuideProvider } from "#contexts/Guide";

// components
import Banner from "./Banner";
import GuideIntro from "./GuideIntro";
import Sections from "./Sections";
import NavBar from "#components/shared/NavBar";

export const Root = styled.div``;

const ResearchGuide = ({ ...props }) => {
  const id = props.match.params.id;

  return (
    <GuideProvider>
      <Root>
        <NavBar />

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
                  <GuideIntro guide={response.data} />
                  <Sections guide={response.data} />
                </Fragment>
              );
            }

            return <div>Loading...</div>;
          }}
        </Get>
      </Root>
    </GuideProvider>
  );
};

export default ResearchGuide;
