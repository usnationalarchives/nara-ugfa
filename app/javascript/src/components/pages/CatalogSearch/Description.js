import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// components
import AddToGuideButton from "../../shared/AddToGuideButton";
import ExistingGuides from "./ExistingGuides";

// assets
import SeriesPlaceholder from "#assets/images/series-placeholder.svg";
import FileUnitPlaceholder from "#assets/images/fileunit-placeholder.svg";

// styles
import { fl_static } from "#styles/frontline";
import { fl_attention } from "#styles/frontline";

export const Root = styled.div`
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;

  &:first-of-type {
    margin-top: 20px;
  }

  @media ${(props) => props.theme.breakpoints.medium} {
    flex-direction: row;
  }
`;

export const Image = styled.div`
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  content: "";
  height: 100px;
  width: 10%;
`;

const Title = styled(Link)`
  font-weight: bold;
`;

export const Text = styled.div`
  margin-bottom: 20px;

  @media ${(props) => props.theme.breakpoints.medium} {
    margin-bottom: 0;
    padding: 0 20px;
    width: 70%;
  }

  a {
    ${fl_static(css`
      color: ${(props) => props.theme.colors.blue};
      text-decoration: none;
    `)}
    ${fl_attention(css`
      text-decoration: underline;
    `)}
  }
`;

export const ActionWrap = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  position: relative;
`;

export const ViewGuideLink = styled(Link)`
  ${fl_static(css`
    color: ${(props) => props.theme.colors.blue};
    font-size: 0.8em;
    text-decoration: none;
    text-transform: uppercase;
    margin-top: 5px;
  `)}
  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

export const ImageWrap = styled.div`
  svg {
    width: 80px;
  }
`;

export const Hierarchy = styled.div`
  color: ${(props) => props.theme.colors.green};
  font-style: italic;
`;

const Description = ({ description, response }) => {
  const [addOptionsVisible, setAddOptionsVisible] = useState();
  const [guides, setGuides] = useState(
    response.data.meta.guide_descriptions.filter(
      (d) => d.description_id === parseInt(description.id)
    ) || []
  );

  console.log(description);

  const {
    id,
    level,
    naId,
    title,
    scopeContent,
    ancestors,
  } = description.attributes;

  const parent = ancestors[ancestors.length - 1];

  const clickedOut = () => {
    setAddOptionsVisible(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickedOut);
    return () => {
      document.removeEventListener("mousedown", clickedOut);
    };
  }, []);

  return (
    <Root>
      <ImageWrap>
        {level == "series" ? <SeriesPlaceholder /> : ""}
        {level == "fileUnit" ? <FileUnitPlaceholder /> : ""}
      </ImageWrap>
      <Text>
        <Title to={`/${naId}`}>{title}</Title>
        <Hierarchy>
          From {parent.level}: {parent.title}
        </Hierarchy>
        {scopeContent && <p>{scopeContent}</p>}
        <p style={{ fontSize: "0.9rem", marginTop: "5px" }}>
          <b>National Archives Identifier:</b> {naId}
        </p>
      </Text>
      <ActionWrap>
        <AddToGuideButton
          guides={guides}
          setGuides={setGuides}
          descriptionIds={[id]}
        />
        <ExistingGuides guides={guides} />
      </ActionWrap>
    </Root>
  );
};

export default Description;
