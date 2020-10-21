import React, { Fragment, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import { AxiosProvider } from "react-axios";

import client from "#api/internal/client";

// contexts
import { UserProvider } from "#contexts/User";
import { SearchProvider } from "#contexts/Search";
import { EditorProvider } from "#contexts/Editor";
import { GuideProvider } from "#contexts/Guide";

// components
import Header from "#components/chrome/Header/Header";
import ScrollToTop from "#components/shared/ScrollToTop";
import PrivateRoute from "#components/shared/PrivateRoute";
import AnonymousRoute from "#components/shared/AnonymousRoute";
import PageLoader from "#components/shared/PageLoader";

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
const BookmarkedGuides = lazy(() =>
  import("./components/pages/Dashboard/BookmarkedGuides")
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
const GettingStarted = lazy(() =>
  import("./components/pages/GettingStarted/GettingStarted")
);

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <BaseStyles />
      <AxiosProvider instance={client}>
        <Router>
          <UserProvider>
            <EditorProvider>
              <SearchProvider>
                <GuideProvider>
                  <ScrollToTop />
                  <Fragment>
                    <Header />

                    <Suspense fallback={<PageLoader />}>
                      <Switch>
                        <PrivateRoute
                          path="/dashboard/guides"
                          component={DashboardGuides}
                        />
                        <PrivateRoute
                          path="/dashboard/bookmarked-guides"
                          component={BookmarkedGuides}
                        />
                        <PrivateRoute
                          path="/dashboard/settings"
                          component={DashboardSettings}
                        />
                        <PrivateRoute
                          exact
                          path="/dashboard"
                          component={Dashboard}
                        />
                        <AnonymousRoute
                          path="/login"
                          component={Login}
                          redirect="/dashboard"
                        />
                        <PrivateRoute
                          exact
                          path="/guides/:id/edit"
                          component={Editor}
                        />
                        <Switch>
                          <Route
                            path="/getting-started"
                            component={GettingStarted}
                          />
                          <Route
                            path="/research-guides"
                            component={ResearchGuides}
                          />
                          <Route
                            exact
                            path="/guides/:id"
                            component={ResearchGuide}
                          />
                          <Route
                            exact
                            path="/guides/public/:uuid"
                            component={ResearchGuide}
                          />
                          <Route
                            exact
                            path="/search"
                            component={CatalogSearch}
                          />
                          <Route exact path="/:naId" component={RecordDetail} />
                          <Route exact path="/" exact component={Home} />
                        </Switch>
                      </Switch>
                    </Suspense>
                  </Fragment>
                </GuideProvider>
              </SearchProvider>
            </EditorProvider>
          </UserProvider>
        </Router>
      </AxiosProvider>
    </ThemeProvider>
  );
};

export default App;
