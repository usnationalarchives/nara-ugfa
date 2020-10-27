import React from "react";
import styled from "styled-components";
import { Get } from "react-axios";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import PageWrapper from "#components/shared/PageWrapper";
import PageLoader from "#components/shared/PageLoader";
import ResearchGuideCard from "#components/shared/ResearchGuideCard";
import { Grid, GridItem } from "#components/shared/Grid";
import NavBar from "#components/shared/NavBar";

const Banner = styled.div`
  background-color: ${(props) => props.theme.colors.darkBlue};
  color: ${(props) => props.theme.colors.white};
`;

const ResearchGuides = () => {
  return (
    <div>
      <NavBar />
      <Banner>
        <Layout.Padding>
          <Layout.Wrapper narrow>
            <PageWrapper>
              <Text.Rich>
                <Text.H1>All Guides to Records</Text.H1>
                <Text.Intro>
                  Explore all public Guides to Records created by NARA staff and
                  citizen archivist.
                </Text.Intro>
              </Text.Rich>
            </PageWrapper>
          </Layout.Wrapper>
        </Layout.Padding>
      </Banner>
      <Get url="/guides">
        {(error, response, isLoading) => {
          if (response) {
            return (
              <Layout.Padding>
                <Layout.Wrapper narrow>
                  <PageWrapper>
                    <Grid>
                      {response.data.data.map((guide) => (
                        <GridItem key={guide.id}>
                          <ResearchGuideCard
                            title={guide.attributes.title || "Untitled Guide"}
                            image={guide.attributes.background_image_url}
                            link={`/guides/${guide.id}`}
                            approved={guide.attributes.nara_approved}
                            status={guide.attributes.status}
                            pending={guide.attributes.pending}
                            updated={guide.attributes.updated_at}
                            demo={false}
                          />
                        </GridItem>
                      ))}
                    </Grid>
                  </PageWrapper>
                </Layout.Wrapper>
              </Layout.Padding>
            );
          }

          return <PageLoader />;
        }}
      </Get>
    </div>
  );
};

export default ResearchGuides;
