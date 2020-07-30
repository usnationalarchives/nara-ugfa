import React, { Fragment, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { ThemeProvider } from "styled-components";

// components
import Header from "#components/chrome/Header/Header";
import Footer from "#components/chrome/Footer/Footer";
import ScrollToTop from "#components/shared/ScrollToTop";

// styles
import BaseStyles from "#styles/base";
import * as theme from "#styles/theme";

// Lazy load (via code splitting) the top level page components
const Home = lazy(() => import("./components/pages/Home/Home"));

const App = () => {
  return (
    <div>
      <ThemeProvider theme={theme}>
        <BaseStyles />
        <Router>
          <ScrollToTop />
          <Fragment>
            <Header />

            <Suspense fallback={<p>Loading...</p>}>
              <Switch>
                <Route path="/" component={Home} />
              </Switch>
            </Suspense>

            <Footer />
          </Fragment>
        </Router>
      </ThemeProvider>
    </div>
  );
};

export default App;
