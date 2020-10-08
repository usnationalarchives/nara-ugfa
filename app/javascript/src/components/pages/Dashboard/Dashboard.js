import React, { Fragment } from "react";
import { Get } from "react-axios";

// components
import * as Layout from "#components/shared/Layout";
import NavBar from "#components/shared/NavBar";
import Banner from "./Banner";
import Guides from "./Guides";
import PageWrapper from "#components/shared/PageWrapper";

const Dashboard = () => {
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
                      {response.data.included && (
                        <Guides title="My Guides to Records" guides={response.data.included.slice(0, 3)} />
                      )}
                      {response.data.included && (
                        <Guides title="Bookmarked Guides" guides={response.data.included.slice(0, 3)} />
                      )}
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

export default Dashboard;
