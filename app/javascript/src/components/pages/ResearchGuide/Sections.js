import React, { Fragment } from "react";

// components
import * as Layout from "#components/shared/Layout";
import Section from "./Section";
import GlobalCollapse from "./GlobalCollapse";

const Sections = ({ guide }) => {
  const sections = (guide.included || []).filter(
    (s) => s.type === "guide_sections"
  );

  return (
    <Layout.Padding>
      <Layout.Wrapper narrow>
        <Fragment>
          <GlobalCollapse />
          {sections.map((section) => (
            <Section key={section.id} guide={guide} section={section} />
          ))}
        </Fragment>
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default Sections;
