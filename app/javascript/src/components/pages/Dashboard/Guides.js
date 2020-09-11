import React, { Fragment } from "react";

// components
import * as Text from "#components/shared/Text";
import ResearchGuideCard from "#components/shared/ResearchGuideCard";
import { ResearchGuideGrid } from "#components/pages/CatalogSearch/ResearchGuideResults";

const Guides = ({ guides }) => {
  return (
    <Fragment>
      <Text.H2>My Guides to Records</Text.H2>
      <ResearchGuideGrid>
        {guides.map((guide) => (
          <ResearchGuideCard
            key={guide.attributes.id}
            title={guide.attributes.title || "Untitled Guide"}
            image={true}
            link={`/guides/${guide.attributes.id}/edit`}
            approved={guide.attributes.nara_approved}
          />
        ))}
      </ResearchGuideGrid>
    </Fragment>
  );
};

export default Guides;
