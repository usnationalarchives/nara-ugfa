import React, { Fragment, useContext } from "react";
import styled from 'styled-components';
import { Get } from "react-axios";

// contexts
import { UserContext } from "#contexts/User";

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

const Guides = ({ guides }) => {
  const userContext = useContext(UserContext);

  return (
    <Fragment>

      {!userContext.state.user.isNaraStaff &&
        <GuidesSection>
          <Text.H2>Pending Moderation</Text.H2>
          <Get url="/guides?pending=true">
            {(error, response, isLoading) => {
              if (response) {
                console.log(response.data.data);
                return (
                  <Fragment>
                    <ResearchGuideGrid>
                    {response.data.data.map((guide) => (
                      <ResearchGuideCard
                        key={guide.attributes.id}
                        title={guide.attributes.title || "Untitled Guide"}
                        image={true}
                        link={`#`}
                        approved={guide.attributes.nara_approved}
                        status={guide.attributes.status}
                        pending={true}
                        updated={guide.attributes.updated_at}
                        demo={true}
                      />
                    ))}
                    </ResearchGuideGrid>
                  </Fragment>
                );
              }
            return <div>Loading...</div>;
          }}
          </Get>
        </GuidesSection>
      }

      <GuidesSection>
        <Text.H2>My Guides to Records</Text.H2>
        {guides && (
          <ResearchGuideGrid>
            {guides.map((guide) => (
              <ResearchGuideCard
                key={guide.attributes.id}
                title={guide.attributes.title || "Untitled Guide"}
                image={true}
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
    </Fragment>
  );
};

export default Guides;
