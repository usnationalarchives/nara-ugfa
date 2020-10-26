import React, { Fragment } from "react";
import { Get } from "react-axios";

// components
import * as Layout from "#components/shared/Layout";
import { ButtonLink } from "#components/shared/Button";
import NavBar from "#components/shared/NavBar";
import Banner from "./Banner";
import Guides from "./Guides";
import PageWrapper from "#components/shared/PageWrapper";
import PageLoader from "#components/shared/PageLoader";

const Dashboard = () => {
  return (
    <Fragment>
      <NavBar title="Guides to Records Editor" />
      <Get url="/current-user">
        {(error, response, isLoading) => {
          if (response) {
            const {
              name,
              gravatar,
              role,
              admin,
            } = response.data.data.attributes;

            return (
              <Fragment>
                <Banner
                  name={name}
                  gravatar={gravatar}
                  role={role}
                  guides={response.data.data.relationships.guides.data}
                />
                <Layout.Padding>
                  <Layout.Wrapper medium>
                    <PageWrapper>
                      {admin && (
                        <Get url="/guides?pending=true">
                          {(error, response, isLoading) => {
                            if (response) {
                              return (
                                <>
                                  <Guides
                                    title="Pending Moderation"
                                    guides={response.data.data}
                                    editable={false}
                                  />
                                </>
                              );
                            }
                            return <div>Loading...</div>;
                          }}
                        </Get>
                      )}

                      {response.data.included && (
                        <Fragment>
                          <Guides
                            title="My Guides to Records"
                            guides={response.data.included.slice(0, 3)}
                            editable={true}
                          />

                          <Layout.Center
                            style={{ marginTop: "10px", marginBottom: "30px" }}
                          >
                            <ButtonLink
                              exact
                              href="/dashboard/guides"
                              scheme="green"
                            >
                              View All
                            </ButtonLink>
                          </Layout.Center>
                        </Fragment>
                      )}
                      <Get url="/guides?bookmarked=true">
                        {(error, response, isLoading) => {
                          if (response) {
                            return (
                              <Fragment>
                                {response.data.data && (
                                  <Guides
                                    title="Bookmarked Guides"
                                    guides={response.data.data.slice(0, 3)}
                                    editable={false}
                                  />
                                )}

                                <Layout.Center
                                  style={{
                                    marginTop: "10px",
                                    marginBottom: "30px",
                                  }}
                                >
                                  <ButtonLink
                                    exact
                                    href="/dashboard/bookmarked-guides"
                                    scheme="green"
                                  >
                                    View All
                                  </ButtonLink>
                                </Layout.Center>
                              </Fragment>
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

          return <PageLoader />;
        }}
      </Get>
    </Fragment>
  );
};

export default Dashboard;
