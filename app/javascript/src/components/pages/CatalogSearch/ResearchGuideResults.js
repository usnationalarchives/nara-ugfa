import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import { Get } from "react-axios";

// contexts
import { SearchContext } from "#contexts/Search";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import ResearchGuideCard from "#components/shared/ResearchGuideCard";
import { Grid, GridItem } from "#components/shared/Grid";

// styles
import { fl_allStates } from "#styles/frontline";

export const Root = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
  border-bottom: 1px solid ${(props) => props.theme.colors.mediumGrey};

  h3 {
    margin-bottom: 20px;
  }

  a {
    ${fl_allStates(css`
      color: ${(props) => props.theme.colors.blue};
      text-decoration: none;
    `)}
    display: inline-block;
    font-size: 0.9em;
    font-weight: bold;
    margin-top: 20px;
    text-transform: uppercase;
  }
`;

export const ResearchGuideGridWrap = styled.div`
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding: 20px;

  @media all and (min-width: ${(props) =>
      props.theme.layout.catalogColumnMin}) {
    padding: 50px;
  }
`;

const ResearchGuideResults = () => {
  const searchContext = useContext(SearchContext);

  return (
    <Get url="guides" params={{ q: searchContext.state.query, rows: 4 }}>
      {(error, response, isLoading) => {
        if (error) {
          return <div>Error</div>;
        } else if (isLoading) {
          return null;
        } else if (response !== null && response.data.data.length > 0) {
          return (
            <Root>
              <ResearchGuideGridWrap>
                <Text.H3>Guides to Records</Text.H3>
                <p>
                  The following guides to records are related to your search
                  topic.
                </p>
                <Grid>
                  {response.data.data.map((guide) => (
                    <GridItem key={guide.attributes.id}>
                      <ResearchGuideCard
                        narrow={false}
                        title={guide.attributes.title}
                        image={guide.attributes.background_image_url}
                        link={`/guides/${guide.attributes.id}`}
                        approved={guide.attributes.nara_approved}
                      />
                    </GridItem>
                  ))}
                </Grid>
                <Layout.Right>
                  <Link to="/guides">View All</Link>
                </Layout.Right>
              </ResearchGuideGridWrap>
            </Root>
          );
        }

        return null;
      }}
    </Get>
  );
};

export default ResearchGuideResults;
