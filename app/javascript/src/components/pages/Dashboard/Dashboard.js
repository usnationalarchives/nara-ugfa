import React, { Fragment, useContext } from "react";
import { Get } from "react-axios";

// contexts
import { UserContext } from "#contexts/User";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";

const Dashboard = () => {
  const context = useContext(UserContext);

  return (
    <Layout.Padding>
      <Layout.Wrapper>
        <Fragment>
          <Text.H1>Dashboard</Text.H1>

          <Text.Intro>Welcome {context.state.user.name}</Text.Intro>

          <Get url="/current-user">
            {(error, response, isLoading, makeRequest, axios) => {
              if (response) {
                return <p>{response.data.user.email}</p>;
              }

              return <div>Loading...</div>;
            }}
          </Get>
        </Fragment>
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default Dashboard;
