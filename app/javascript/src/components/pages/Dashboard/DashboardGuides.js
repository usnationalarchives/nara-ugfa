import React, { Fragment } from "react";
import { Get } from "react-axios";

// components
import * as Layout from "#components/shared/Layout";
import NavBar from "#components/shared/NavBar";
import Banner from "./Banner";
import Guides from "./Guides";
import PageWrapper from "#components/shared/PageWrapper";

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
                  email={response.data.data.attributes.email}
                  role={response.data.data.attributes.role}
                  guides={response.data.data.relationships.guides.data}
                />
                <Layout.Padding>
                  <Layout.Wrapper medium>
                    <PageWrapper>
                      <Guides guides={response.data.included} />
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
