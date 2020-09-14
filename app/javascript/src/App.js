import React, { Fragment, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AxiosProvider } from "react-axios";

import client from "#api/internal/client";

// contexts
import { UserProvider } from "#contexts/User";
import { SearchProvider } from "#contexts/Search";

// components
import Header from "#components/chrome/Header/Header";
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
const DashboardGuides = lazy(() =>
  import("./components/pages/Dashboard/DashboardGuides")
);
const DashboardSettings = lazy(() =>
  import("./components/pages/Dashboard/DashboardSettings")
);
const ResearchGuides = lazy(() =>
  import("./components/pages/ResearchGuides/ResearchGuides")
);
const CatalogSearch = lazy(() =>
  import("./components/pages/CatalogSearch/CatalogSearch")
);
const Editor = lazy(() => import("./components/pages/Editor/Editor"));
const RecordDetail = lazy(() =>
  import("./components/pages/RecordDetail/RecordDetail")
);
const ResearchGuide = lazy(() =>
  import("./components/pages/ResearchGuide/ResearchGuide")
);

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
                  <PrivateRoute
                    path="/dashboard/guides"
                    component={DashboardGuides}
                  />
                  <PrivateRoute
                    path="/dashboard/settings"
                    component={DashboardSettings}
                  />
                  <PrivateRoute path="/dashboard" component={Dashboard} />
                  <PrivateRoute path="/guides/:id/edit" component={Editor} />
                  <AnonymousRoute
                    path="/login"
                    component={Login}
                    redirect="/dashboard"
                  />
                  <Route path="/research-guides" component={ResearchGuides} />
                  <Route path="/guides/:id" component={ResearchGuide} />
                  <SearchProvider>
                    <Switch>
                      <Route path="/search" component={CatalogSearch} />
                      <Route path="/:naId" component={RecordDetail} />
                      <Route path="/" component={Home} />
                    </Switch>
                  </SearchProvider>
                </Switch>
              </Suspense>
            </Fragment>
          </Router>
        </UserProvider>
      </AxiosProvider>
    </ThemeProvider>
  );
};

export default App;
