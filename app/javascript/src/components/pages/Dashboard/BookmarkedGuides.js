import React, { Fragment, useContext } from "react";
import { Get } from "react-axios";

// components
import * as Text from "#components/shared/Text";
import * as Layout from "#components/shared/Layout";
import NavBar from "#components/shared/NavBar";
import Banner from "./Banner";
import Guides from "./Guides";
import PageWrapper from "#components/shared/PageWrapper";
import ResearchGuideCard from "#components/shared/ResearchGuideCard";
import { Grid, GridItem } from "#components/shared/Grid";

const DashboardGuides = () => {
  return (
    <Fragment>
      <NavBar title="Guides to Records Editor" />
      <Get url="/current-user">
        {(error, response, isLoading) => {
          if (response) {
            return (
              <Fragment>
                <Banner
                  name={response.data.data.attributes.name}
                  gravatar={response.data.data.attributes.gravatar}
                  role={response.data.data.attributes.role}
                  guides={response.data.data.relationships.guides.data}
                />
                <Layout.Padding>
                  <Layout.Wrapper medium>
                    <PageWrapper>
                      <Get url="/guides?bookmarked=true">
                        {(error, response, isLoading) => {
                          if (response) {
                            return (
                              <>
                                <Text.H2>Bookmarked Guides</Text.H2>
                                {response.data.data && (
                                  <Grid>
                                    {response.data.data.map((guide) => (
                                      <GridItem key={guide.attributes.id}>
                                        <ResearchGuideCard
                                          title={
                                            guide.attributes.title ||
                                            "Untitled Guide"
                                          }
                                          image={
                                            guide.attributes
                                              .background_image_url
                                          }
                                          link={`/guides/${guide.attributes.id}`}
                                          approved={
                                            guide.attributes.nara_approved
                                          }
                                          status={guide.attributes.status}
                                          pending={guide.attributes.pending}
                                          updated={guide.attributes.updated_at}
                                          demo={false}
                                        />
                                      </GridItem>
                                    ))}
                                  </Grid>
                                )}
                              </>
                            );
                          }
                          return <div>Loading...</div>;
                        }}
                      </Get>
                    </PageWrapper>
                  </Layout.Wrapper>
                </Layout.Padding>
              </Fragment>
            );
          }

          return <div>Loading...</div>;
        }}
      </Get>
    </Fragment>
  );
};

export default DashboardGuides;
