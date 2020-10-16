import React, { useEffect, useState, useContext } from "react";
import styled, { css } from "styled-components";
import useCollapse from "react-collapsed";

// contexts
import { GuideContext } from "#contexts/Guide";

// components
import Triangle from "#components/shared/Triangle";

// assets
import SeriesIcon from "#assets/icons/hierarchy-series.svg";
import ItemIcon from "#assets/icons/hierarchy-item.svg";
import BoxIcon from "#assets/icons/hierarchy-record-group.svg";
import FileUnitIcon from "#assets/icons/hierarchy-file-unit.svg";

// styles
import { buttonReset } from "#styles/mixins";
import { fl_allStates } from "#styles/frontline";

export const Ancestors = styled.ol`
  color: ${(props) => props.theme.colors.textLightGrey};
  font-size: 0.8rem;
`;

const svgStyles = css`
  svg {
    fill: currentColor;
    height: 18px;
    margin-right: 8px;
    position: absolute;
    top: 0;
    left: 0;
    width: 18px;
  }
`;

export const Ancestor = styled.li`
  margin-bottom: 28px;
  padding-left: 30px;
  position: relative;

  ${svgStyles}

  &:after {
    background-color: currentColor;
    content: "";
    display: block;
    height: 15px;
    left: 9px;
    position: absolute;
    top: 25px;
    width: 1px;
  }

  a {
    margin-left: 8px;
    ${fl_allStates(css`
      color: ${(props) => props.theme.colors.textLightGrey};
    `)}
  }
`;

const AncestorLevel = styled.span`
  font-size: 0.8rem;
  text-transform: uppercase;
`;

export const Level = styled.button`
  ${buttonReset}

  font-size: 0.8rem;
  line-height: normal;
  margin-bottom: 10px;
  padding-left: 30px;
  position: relative;
  text-transform: uppercase;

  ${svgStyles}

  svg {
    fill: ${(props) => props.theme.colors.green};
  }

  span {
    position: relative;
    top: -3px;
  }
`;

const LevelInner = styled.span`
  margin-right: 8px;
  position: static !important;
`;

const DescriptionHierarchy = ({ description }) => {
  const guideContext = useContext(GuideContext);
  const [isExpanded, setExpanded] = useState(
    (guideContext || { state: {} }).state.showHierarchy || true
  );
  const { getCollapseProps, getToggleProps } = useCollapse({
    isExpanded,
  });

  if (guideContext) {
    useEffect(() => {
      setExpanded(guideContext.state.showHierarchy);
    }, [guideContext.state.showHierarchy]);
  }

  const Icon = ({ level }) => {
    switch (level) {
      case "recordGroup":
      case "Record Group":
      case "collection":
      case "Collection":
        return <BoxIcon />;
      case "series":
      case "Series":
        return <SeriesIcon />;
      case "fileUnit":
      case "File Unit":
        return <FileUnitIcon />;
      case "item":
      case "Item":
      case "itemAv":
      case "Item AV":
        return <ItemIcon />;
      default:
        return null;
    }
  };

  return (
    <div>
      <Ancestors {...getCollapseProps()}>
        {description.attributes.ancestors.map((ancestor) => (
          <Ancestor key={ancestor.naId}>
            <Icon level={ancestor.level} />
            <AncestorLevel>{ancestor.level}</AncestorLevel>:
            <a href={`https://catalog.archives.gov/id/${ancestor.naId}`}>
              {ancestor.title}
            </a>
          </Ancestor>
        ))}
      </Ancestors>

      <Level
        {...getToggleProps({
          onClick: () => setExpanded((prevExpanded) => !prevExpanded),
        })}
      >
        <Icon level={description.attributes.level} />
        <LevelInner>{description.attributes.level}</LevelInner>
        <Triangle small toggleOpen={!isExpanded} />
      </Level>
    </div>
  );
};

export default DescriptionHierarchy;
