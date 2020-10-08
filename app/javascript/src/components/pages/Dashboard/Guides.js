import React, { Fragment } from "react";
import styled from 'styled-components';

// components
import * as Text from "#components/shared/Text";
import ResearchGuideCard from "#components/shared/ResearchGuideCard";
import { ResearchGuideGrid } from "#components/pages/CatalogSearch/ResearchGuideResults";

const GuidesSection = styled.div`
  & + & {
    border-top: 1px solid ${props => props.theme.colors.mediumGrey};
    margin: 70px 0;
    padding: 50px 0;
  }
`; 

const Guides = ({ title, guides }) => {
  return (
    <>
      <GuidesSection>
        <Text.H2>{ title }</Text.H2>
        {guides && (
          <ResearchGuideGrid>
            {guides.map((guide) => (
              <ResearchGuideCard
                key={guide.attributes.id}
                title={guide.attributes.title || "Untitled Guide"}
                image={guide.attributes.background_image_url}
                link={`/guides/${guide.attributes.id}/edit`}
                approved={guide.attributes.nara_approved}
                status={guide.attributes.status}
                pending={guide.attributes.pending}
                updated={guide.attributes.updated_at}
                demo={false}
              />
            ))}
          </ResearchGuideGrid>
        )}
      </GuidesSection>
    </>
  );
};

export default Guides;
