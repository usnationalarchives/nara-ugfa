import React, { useState } from "react";
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

  return (
    <Root>
      <Heading>
        <h1>{response.data.data.attributes.title}</h1>
        <Add>
          <AddToGuideButton
            guides={guides}
            setGuides={setGuides}
            descriptionIds={[response.data.data.id]}
          />
          <ExistingGuides guides={guides} />
        </Add>
      </Heading>
      {response.data.data.attributes.objects[0].imageTiles && (
        <InspectArea>
          <ImageViewer objects={response.data.data.attributes.objects} />
        </InspectArea>
      )}
      <InfoToggle heading="Additional Information About this Item" />
      <InfoToggle heading="Details" />
      <InfoToggle heading="Scope and Content" />
      <InfoToggle heading="Variant Control Numbers" />
      <InfoToggle heading="Archived Copies" />
    </Root>
  );
};

export default Record;
