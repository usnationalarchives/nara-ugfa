import React, { useContext, Fragment } from "react";
import styled, { css } from "styled-components";

// contexts
import { GuideContext } from "#contexts/Guide";

// components
import Button from "#components/shared/Button";

// assets
import CollapseIcon from "#assets/icons/collapse.svg";
import ExpandIcon from "#assets/icons/expand.svg";

// styles
import { fl_allStates } from "#styles/frontline";

const StyledButton = styled(Button)`
  border-color: ${(props) => props.theme.colors.mediumGrey};
  margin-top: 40px;
  padding-right: 40px;
  position: relative;

  ${fl_allStates(css`
    color: ${(props) => props.theme.colors.green};
  `)}

  svg {
    fill: currentColor;
    height: 20px;
    position: absolute;
    right: 15px;
    top: 50%;
    transform: translateY(-50%);
    width: 20px;
  }

  @media all and ${(props) => props.theme.breakpoints.medium} {
    float: right;
    margin-left: 20px;
    margin-top: 0;
  }
`;

const GlobalCollapse = () => {
  const guideContext = useContext(GuideContext);

  const handleHierarchy = () => {
    guideContext.actions.setShowHierarchy(!guideContext.state.showHierarchy);
  };

  return (
    <StyledButton scheme="outline" onClick={handleHierarchy}>
      {guideContext.state.showHierarchy && (
        <Fragment>
          Collapse Hierarchy
          <CollapseIcon />
        </Fragment>
      )}
      {!guideContext.state.showHierarchy && (
        <Fragment>
          Expand Hierarchy
          <ExpandIcon />
        </Fragment>
      )}
    </StyledButton>
  );
};

export default GlobalCollapse;
