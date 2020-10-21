import React, { Fragment } from "react";
import { Get } from "react-axios";
import styled, { css } from "styled-components";

// components
import * as Text from "#components/shared/Text";
import * as Layout from "#components/shared/Layout";
import NavBar from "#components/shared/NavBar";
import Banner from "./Banner";
import PageWrapper from "#components/shared/PageWrapper";
import PageLoader from "#components/shared/PageLoader";

// sytles
import { fl_allStates } from "#styles/frontline";

const Properties = styled.dl``;

const PropertyLabel = styled.dt`
  text-transform: uppercase;
  font-size: 0.85rem;
`;

const PropertyValue = styled.dd`
  margin-top: 0.15rem;
  margin-bottom: 1rem;
`;

const Columns = styled.div`
  display: flex;
`;

const Column = styled.div`
  width: 50%;
`;

const SettingsLink = styled.a`
  text-decoration: none;

  ${fl_allStates(css`
    color: ${(props) => props.theme.colors.blue};
  `)}
`;

const DashboardSettings = () => {
  return (
    <Fragment>
      <NavBar title="Guides to Records Editor" />
      <Get url="/current-user">
        {(error, response, isLoading) => {
          if (response) {
            return (
              <Fragment>
                <Banner
                  gravatar={response.data.data.attributes.gravatar}
                  name={response.data.data.attributes.name}
                  email={response.data.data.attributes.email}
                  role={response.data.data.attributes.role}
                  guides={response.data.data.relationships.guides.data}
                />
                <Layout.Padding>
                  <Layout.Wrapper medium>
                    <PageWrapper>
                      <Text.H2 style={{ marginBottom: "2rem" }}>
                        Settings
                      </Text.H2>
                      <Text.H3 style={{ marginBottom: "1.2rem" }}>
                        Profile Settings
                      </Text.H3>

                      <Columns>
                        <Column>
                          <Properties>
                            <PropertyLabel>User Type</PropertyLabel>
                            <PropertyValue>
                              {response.data.data.attributes.role}
                            </PropertyValue>

                            <PropertyLabel>Username</PropertyLabel>
                            <PropertyValue>
                              {
                                response.data.data.attributes.catalog_attributes
                                  .id
                              }
                            </PropertyValue>

                            <PropertyLabel>Full name</PropertyLabel>
                            <PropertyValue>
                              {response.data.data.attributes.name}
                            </PropertyValue>

                            <PropertyLabel>Email</PropertyLabel>
                            <PropertyValue>
                              {response.data.data.attributes.email}
                            </PropertyValue>
                          </Properties>
                        </Column>
                        <Column>
                          <SettingsLink
                            target="_blank"
                            href="https://catalog.archives.gov/login"
                          >
                            Manage your account
                          </SettingsLink>
                        </Column>
                      </Columns>
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

export default DashboardSettings;
