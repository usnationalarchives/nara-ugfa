import React, { useState, useContext, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";

// contexts
import { EditorContext } from "#contexts/Editor";

// components
import * as Layout from "#components/shared/Layout";
import VisibilitySettings from "./VisibilitySettings";
import GlobalCollapse from "#components/pages/ResearchGuide/GlobalCollapse";
import CollaborationModal from "#components/shared/CollaborationModal";
import BulkActions from "./BulkActions";
import DeleteGuide from "./DeleteGuide";

// assets
import HelpIcon from "#assets/icons/help.svg";
import Ellipsis from "#assets/icons/ellipsis.svg";
import Close from "#assets/icons/close.svg";

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
  z-index: 500;
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
  display: flex;
  font-size: 0.8rem;
  position: absolute;
  right: 0;
  text-transform: uppercase;
  top: 50%;
  transform: translateY(-50%);
`;

const ShareHelpOpen = styled.button`
  ${buttonReset}

  align-items: center;
  background-color: ${(props) => props.theme.colors.textLightGrey};
  border-radius: 40px;
  display: flex;
  height: 40px;
  width: 40px;

  svg {
    fill: ${(props) => props.theme.colors.white};
    margin: 0 auto;
  }
`;

const ShareHelpClose = styled.button`
  ${buttonReset}

  align-items: center;
  border-left: 1px solid #555;
  display: flex;
  height: 36px;
  margin-left: 10px;
  padding-left: 20px;
  padding-right: 12px;
  width: 46px;

  svg {
    fill: ${(props) => props.theme.colors.white};
    margin: 0 auto;
    width: 16px;
    height: 16px;
  }

  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: none;
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

const Help = styled(Link)`
  align-items: center;
  border-left: 1px solid ${(props) => props.theme.colors.grey};
  color: ${(props) => props.theme.colors.white};
  display: flex;
  font-size: 0.8rem;
  height: 36px;
  margin-left: 20px;
  opacity: 0.7;
  padding-left: 20px;
  text-decoration: none;
  text-transform: uppercase;

  svg {
    fill: ${(props) => props.theme.colors.white};
    width: 30px;
    height: 30px;
    margin: 0 10px;
  }
`;

const MetaActionsRoot = styled.div`
  align-items: center;
  display: flex;
`;

const MobileShareHelpMenu = styled.div`
  display: none;

  ${(props) =>
    props.shareHelpOpen &&
    css`
      align-items: center;
      justify-content: flex-end;
      background-color: ${(props) => props.theme.colors.black};
      bottom; 0;
      color: ${(props) => props.theme.colors.white};
      display: flex;
      height: 100%;
      left: 0;
      padding: 0 8px;
      position: absolute;
      right: 0;
      top: 0;
      width: 100%;
    `}

  @media all and ${(props) => props.theme.breakpoints.medium} {
    display: none !important;
  }
`;

const StyledSpinner = styled.div`
  @keyframes loadspin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: loadspin 1s linear infinite;
  height: 30px;
  transition: 300ms;
  width: 30px;

  svg {
    display: block;
  }
`;

const Spinner = () => {
  return (
    <StyledSpinner>
      <svg
        width="30px"
        height="30px"
        viewBox="0 0 98 98"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          <g transform="translate(3.000000, 3.000000)" strokeWidth="3">
            <circle stroke="#ffffff" cx="46" cy="46" r="46"></circle>
            <path
              d="M28.7975511,88.6754941 C34.1116252,90.8196378 39.9179684,92 46,92 C71.4050985,92 92,71.4050985 92,46 C92,20.5949015 71.4050985,0 46,0"
              stroke="#333"
            ></path>
          </g>
        </g>
      </svg>
    </StyledSpinner>
  );
};

const UtilityBar = ({ guide }) => {
  const [shareHelpOpen, setShareHelpOpen] = useState(false);
  const editorContext = useContext(EditorContext);
  const currentURL = window.location.href;
  const urlArray = currentURL.split("/");

  useEffect(() => {
    editorContext.actions.setLastSaved(guide.data.attributes.updatedAgo);
  }, []);

  const MetaActions = () => {
    return (
      <MetaActionsRoot>
        <CollaborationModal
          publicLink={`${urlArray[0] + "//" + urlArray[2]}/guides/public/${
            guide.data.attributes.uuid
          }`}
        />
        <DeleteGuide guideId={guide.data.id} />
        <Help to="/getting-started">
          Help
          <HelpIcon />
        </Help>
      </MetaActionsRoot>
    );
  };

  return (
    <Root>
      <Layout.Padding>
        <Inner>
          {editorContext.state.bulkItems.length > 0 && <BulkActions />}
          {editorContext.state.bulkItems.length === 0 && (
            <Status>
              <MobileStatus>
                {editorContext.state.saving && <Spinner />}
              </MobileStatus>

              <DesktopStatus>
                {editorContext.state.saving && <p>Saving...</p>}
                {!editorContext.state.saving && (
                  <p>Last saved {editorContext.state.lastSaved} ago</p>
                )}
                <GlobalCollapse inline />
              </DesktopStatus>
            </Status>
          )}

          <div>
            <StyledLink to={`/guides/${guide.data.id}`}>Preview</StyledLink>
            <VisibilitySettings guide={guide} />
          </div>

          <ShareHelp>
            <Layout.Desktop>
              <MetaActions />
            </Layout.Desktop>

            <Layout.Mobile>
              <ShareHelpOpen
                shareHelpOpen={shareHelpOpen}
                onClick={() => setShareHelpOpen(true)}
              >
                <Ellipsis />
              </ShareHelpOpen>
            </Layout.Mobile>
          </ShareHelp>
        </Inner>
      </Layout.Padding>

      <MobileShareHelpMenu shareHelpOpen={shareHelpOpen}>
        <MetaActions />

        <ShareHelpClose onClick={() => setShareHelpOpen(false)}>
          <Close />
        </ShareHelpClose>
      </MobileShareHelpMenu>
    </Root>
  );
};

export default UtilityBar;
