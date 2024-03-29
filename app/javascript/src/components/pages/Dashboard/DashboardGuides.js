import React, { Fragment, useContext } from "react";
import { Get } from "react-axios";

// contexts
import { UserContext } from "#contexts/User";

// components
import * as Layout from "#components/shared/Layout";
import NavBar from "#components/shared/NavBar";
import Banner from "./Banner";
import Guides from "./Guides";
import PageWrapper from "#components/shared/PageWrapper";

const DashboardGuides = () => {
  const userContext = useContext(UserContext);

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
                      <Guides
                        title="My Guides to Records"
                        guides={response.data.included}
                        editable={true}
                      />
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
