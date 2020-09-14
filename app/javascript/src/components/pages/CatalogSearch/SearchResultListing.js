import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// components
import AddToGuideButton from "../../shared/AddToGuideButton";

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

const SearchResultListing = ({
  id,
  title,
  naId,
  hierarchy,
  identifier,
  image,
  added,
  recordType,
}) => {
  const [addOptionsVisible, setAddOptionsVisible] = useState();

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
        {recordType == "series" ? <SeriesPlaceholder /> : ""}
        {recordType == "fileUnit" ? <FileUnitPlaceholder /> : ""}
      </ImageWrap>
      <Text>
        <Link to={`/${naId}`}>{title}</Link>
        <Hierarchy>{hierarchy}</Hierarchy>
        <p>{identifier}</p>
      </Text>
      <ActionWrap>
        <AddToGuideButton
          descriptionIds={[id]}
          added={added}
          text={added ? "Added" : "Add to Guide"}
        />
        {added && <ViewGuideLink to="/search">View Guide</ViewGuideLink>}
      </ActionWrap>
    </Root>
  );
};

export default SearchResultListing;
