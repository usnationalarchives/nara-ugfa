import React, { Fragment, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AxiosProvider } from "react-axios";

import client from "#api/internal/client";

// contexts
import { UserProvider } from "#contexts/User";

// components
import Header from "#components/chrome/Header/Header";
import Footer from "#components/chrome/Footer/Footer";
import ScrollToTop from "#components/shared/ScrollToTop";
import PrivateRoute from "#components/shared/PrivateRoute";
import AnonymousRoute from "#components/shared/AnonymousRoute";

// styles
import BaseStyles from "#styles/base";
import * as theme from "#styles/theme";

// Lazy load (via code splitting) the top level page components
const Home = lazy(() => import("./components/pages/Home/Home"));
const Login = lazy(() => import("./components/pages/Login/Login"));
const Dashboard = lazy(() => import("./components/pages/Dashboard/Dashboard"));
const ResearchGuides = lazy(() => import("./components/pages/ResearchGuides/ResearchGuides"));
const CatalogSearch = lazy(() => import("./components/pages/CatalogSearch/CatalogSearch"));

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BaseStyles />
      <AxiosProvider instance={client}>
        <UserProvider>
          <Router>
            <ScrollToTop />
            <Fragment>
              <Header />

              <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <PrivateRoute path="/research-guides" component={ResearchGuides} />
                  <AnonymousRoute
                    path="/login"
                    component={Login}
                    redirect="/dashboard"
                  />
                  <AnonymousRoute path="/catalog-search" component={CatalogSearch} />
                  <Route path="/" component={CatalogSearch} />
                </Switch>
              </Suspense>

              <Footer />
            </Fragment>
          </Router>
        </UserProvider>
      </AxiosProvider>
    </ThemeProvider>
  );
};

export default App;
