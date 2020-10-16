import React, { Fragment, useState } from "react";
import styled from "styled-components";

// components
import AddToGuideButton from "../../shared/AddToGuideButton";
import ExistingGuides from "#components/pages/CatalogSearch/ExistingGuides";
import InfoToggle from "./InfoToggle";
import ImageViewer from "./ImageViewer";

export const Root = styled.div`
  max-width: ${(props) => props.theme.layout.maxWidth};
  padding: 20px;

  @media all and (min-width: ${(props) =>
      props.theme.layout.catalogColumnMin}) {
    padding: 40px;
  }
`;

export const Heading = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 20px;

  @media all and (min-width: ${(props) =>
      props.theme.layout.catalogColumnMin}) {
    align-items: center;
    flex-direction: row;
  }

  h1 {
    font-size: 1.2em;
    font-weight: bold;
    width: 75%;
  }

  button {
    margin-top: 20px;

    @media all and (min-width: ${(props) =>
        props.theme.layout.catalogColumnMin}) {
      margin: 0 auto 0 0;
    }
  }
`;

const Add = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const InspectArea = styled.div`
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  content: "";
  height: 500px;
  width: 100%;
`;

const Record = ({ response }) => {
  const [guides, setGuides] = useState(
    response.data.meta.guide_descriptions.filter(
      (d) => d.description_id === parseInt(response.data.data.id)
    ) || []
  );

  const {
    title,
    objects,
    naId,
    creators,
    scopeContent,
    ancestors,
  } = response.data.data.attributes;

  const parent = ancestors[ancestors.length - 1];

  const Creator = ({ creator }) => {
    return (
      <a href={`https://catalog.archives.gov/id/${creator.naId}`}>
        {creator.name}
      </a>
    );
  };

  return (
    <Root>
      <Heading>
        <h1>{title}</h1>
        <Add>
          <AddToGuideButton
            guides={guides}
            setGuides={setGuides}
            descriptionIds={[response.data.data.id]}
          />
          <ExistingGuides guides={guides} />
        </Add>
      </Heading>
      {(objects[0] || {}).imageTiles && (
        <InspectArea>
          <ImageViewer objects={objects} />
        </InspectArea>
      )}
      <InfoToggle heading="Additional Information About this Item">
        <div>
          <p>National Archives Identifier:</p>
          <p>{naId}</p>
        </div>
        <div>
          <p>Creators:</p>
          <p>
            {creators.map((creator, i) => (
              <Fragment key={creator.naId}>
                <Creator key={creator.naId} creator={creator} />
                {i === 0 && " (Most Recent)"}
                {i !== 0 && " (Predecessor)"}
                <br />
              </Fragment>
            ))}
          </p>
        </div>

        <div>
          <p>From:</p>
          <p>
            {parent.level}:{" "}
            <a href={`https://catalog.archives.gov/id/${parent.naId}`}>
              {parent.title}
            </a>
          </p>
        </div>
      </InfoToggle>
      {scopeContent && (
        <InfoToggle heading="Scope and Content">
          <p>{scopeContent}</p>
        </InfoToggle>
      )}
    </Root>
  );
};

export default Record;
