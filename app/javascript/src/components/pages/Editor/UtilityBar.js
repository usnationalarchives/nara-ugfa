import React, { useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// contexts
import { EditorContext } from "#contexts/Editor";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import VisibilitySettings from "./VisibilitySettings";
import GlobalCollapse from "#components/pages/ResearchGuide/GlobalCollapse";

// assets
import HelpIcon from "#assets/icons/help.svg";

// styles
import { fl_allStates, fl_attention } from "#styles/frontline";
import { buttonReset } from "#styles/mixins";

const Root = styled.div`
  background-color: ${(props) => props.theme.colors.darkGrey};
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  width: 100%;
  z-index: 100;
`;

const Inner = styled.div`
  text-align: center;
  position: relative;
  padding: 5px 0;
`;

const Status = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-size: 0.8rem;
  left: 0;
  position: absolute;
  text-transform: uppercase;
  top: 50%;
  transform: translateY(-50%);
`;

const MobileStatus = styled.div`
  @media all and ${(props) => props.theme.breakpoints.larger} {
    display: none;
  }
`;
const DesktopStatus = styled.div`
  display: none;

  @media all and ${(props) => props.theme.breakpoints.larger} {
    display: flex;
  }
`;

const ShareHelp = styled.div`
  color: ${(props) => props.theme.colors.white};
  font-size: 0.8rem;
  right: 0;
  position: absolute;
  text-transform: uppercase;
  top: 50%;
  transform: translateY(-50%);
`;

const ShareHelpOpen = styled.button`
  ${buttonReset}

  ${(props) =>
    props.shareHelpOpen &&
    css`
      display: none;
    `}


  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: none;
  }
`;

const ShareHelpClose = styled.button`
  ${buttonReset}

  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: none;
  }
`;

const MobileShareHelpMenu = styled.div`
  display: none;
  ${(props) =>
    props.shareHelpOpen &&
    css`
      background-color: ${(props) => props.theme.colors.black};
      bottom; 0;
      color: ${(props) => props.theme.colors.white};
      display: block;
      height: 60px;
      left: 0;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
    `}

  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: none !important;
  }
`;

const DesktopShareHelpMenu = styled.div`
  display: none;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    align-items: center;
    display: flex;
    opacity: 0.75;

    a {
      align-items: center;
      display: flex;

      ${fl_allStates(css`
        color: ${(props) => props.theme.colors.white};
        text-decoration: none;
      `)}

      ${fl_attention(css`
        text-decoration: underline;
      `)}
    }

    svg {
      margin-left: 15px;
      width: 30px;
      height: 30px;
      fill: ${(props) => props.theme.colors.white};
      vertical-align: middle;
    }
  }
`;

const StyledLink = styled(Link)`
  font-size: 0.8rem;
  text-transform: uppercase;

  ${fl_allStates(css`
    color: ${(props) => props.theme.colors.white};
    text-decoration: none;
  `)}
`;

const UtilityBar = ({ guide }) => {
  const [shareHelpOpen, setShareHelpOpen] = useState(false);
  const editorContext = useContext(EditorContext);

  useEffect(() => {
    editorContext.actions.setLastSaved(guide.data.attributes.updatedAgo);
  }, []);

  return (
    <Root>
      <Layout.Padding>
        <Inner>
          <Status>
            <MobileStatus>
              {/* TODO: add spinner */}
              {editorContext.state.saving && <p>...</p>}
            </MobileStatus>

            <DesktopStatus>
              {editorContext.state.saving && <p>Saving...</p>}
              {!editorContext.state.saving && (
                <p>Last saved {editorContext.state.lastSaved} ago</p>
              )}
              <GlobalCollapse inline />
            </DesktopStatus>
          </Status>

          <div>
            <StyledLink to={`/guides/${guide.data.id}`}>Preview</StyledLink>
            <VisibilitySettings guide={guide} />
          </div>

          <ShareHelp>
            <ShareHelpOpen
              shareHelpOpen={shareHelpOpen}
              onClick={() => setShareHelpOpen(true)}
            >
              ...
            </ShareHelpOpen>

            <DesktopShareHelpMenu shareHelpOpen={shareHelpOpen}>
              <Link to="#">
                Help
                <HelpIcon />
              </Link>
            </DesktopShareHelpMenu>
          </ShareHelp>
        </Inner>
      </Layout.Padding>

      <MobileShareHelpMenu shareHelpOpen={shareHelpOpen}>
        <Text.Screenreader>Help</Text.Screenreader>
        <HelpIcon />

        <ShareHelpClose onClick={() => setShareHelpOpen(false)}>
          X
        </ShareHelpClose>
      </MobileShareHelpMenu>
    </Root>
  );
};

export default UtilityBar;
