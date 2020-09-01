import React, { Fragment } from "react";
import { Get } from "react-axios";

import * as Text from "#components/shared/Text";
import * as Layout from "#components/shared/Layout";
import NavBar from "#components/shared/NavBar";
import Banner from "./Banner";
import PageWrapper from "#components/shared/PageWrapper";

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
                  name={response.data.data.attributes.name}
                  email={response.data.data.attributes.email}
                  role={response.data.data.attributes.role}
                  guides={response.data.data.relationships.guides.data}
                />
                <Layout.Padding>
                  <Layout.Wrapper medium>
                    <PageWrapper>
                      <Text.H2>Settings</Text.H2>
                      <Text.H3>Profile Settings</Text.H3>
                      <dl>
                        <dt>User Type</dt>
                        <dd>{response.data.data.attributes.role}</dd>

                        <dt>Username</dt>
                        <dd>
                          {response.data.data.attributes.catalog_attributes.id}
                        </dd>

                        <dt>Full name</dt>
                        <dd>{response.data.data.attributes.name}</dd>

                        <dt>Email</dt>
                        <dd>{response.data.data.attributes.email}</dd>
                      </dl>

                      <a
                        target="_blank"
                        href={`https://catalog.archives.gov/accounts/${response.data.data.attributes.catalog_attributes.id}`}
                      >
                        Manage your account
                      </a>
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

export default DashboardSettings;
