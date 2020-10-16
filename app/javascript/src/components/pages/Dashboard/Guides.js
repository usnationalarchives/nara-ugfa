import React, { Fragment } from "react";
import styled from "styled-components";

// components
import * as Text from "#components/shared/Text";
import ResearchGuideCard from "#components/shared/ResearchGuideCard";
import { Grid, GridItem } from "#components/shared/Grid";

const GuidesSection = styled.div`
  & + & {
    border-top: 1px solid ${(props) => props.theme.colors.mediumGrey};
    margin: 70px 0;
    padding: 50px 0;
  }
`;

const Guides = ({ title, guides, editable }) => {
  return (
    <>
      <GuidesSection>
        <Text.H2>{title}</Text.H2>
        {guides && (
          <Grid>
            {guides.map((guide) => (
              <GridItem key={guide.attributes.id}>
                <ResearchGuideCard
                  title={guide.attributes.title || "Untitled Guide"}
                  image={guide.attributes.background_image_url}
                  link={`/guides/${guide.attributes.id}${
                    editable ? "/edit" : ""
                  }`}
                  approved={guide.attributes.nara_approved}
                  status={guide.attributes.status}
                  pending={guide.attributes.pending}
                  updated={guide.attributes.updated_at}
                  demo={false}
                />
              </GridItem>
            ))}
          </Grid>
        )}
      </GuidesSection>
    </>
  );
};

export default Guides;
