import React, { Fragment } from "react";
import styled from "styled-components";
import { Get } from "react-axios";

// components
import Banner from "./Banner";
import GuideIntro from "./GuideIntro";
import Sections from "./Sections";
import NavBar from "#components/shared/NavBar";
import PageLoader from "#components/shared/PageLoader";

export const Root = styled.div``;

const ResearchGuide = ({ ...props }) => {
  const id = props.match.params.id;
  const uuid = props.match.params.uuid;

  return (
    <Root>
      <NavBar />

      <Get url={id ? `/guides/${id}` : `/guides/public/${uuid}`}>
        {(error, response, isLoading) => {
          if (error) {
            return <div>Error</div>;
          } else if (isLoading) {
            return <PageLoader />;
          } else if (response !== null) {
            return (
              <Fragment>
                <Banner data={response.data.data} />
                <GuideIntro guide={response.data} />
                <Sections guide={response.data} />
              </Fragment>
            );
          }

          return <PageLoader />;
        }}
      </Get>
    </Root>
  );
};

export default ResearchGuide;
