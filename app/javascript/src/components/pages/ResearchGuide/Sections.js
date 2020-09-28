import React, { Fragment } from "react";

// components
import Section from "./Section";
import * as Layout from "#components/shared/Layout";

const Sections = ({ guide }) => {
  const sections = (guide.included || []).filter(
    (s) => s.type === "guide_sections"
  );

  return (
    <Layout.Padding>
      <Layout.Wrapper narrow>
        <Fragment>
          {sections.map((section) => (
            <Section key={section.id} guide={guide} section={section} />
          ))}
        </Fragment>
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default Sections;
