import React, { useContext } from "react";
import styled, { css } from "styled-components";
import { Link, useHistory } from "react-router-dom";

// contexts
import { UserContext } from "#contexts/User";
import { EditorContext } from "#contexts/Editor";

// components
import DropdownMenu, { DropdownLink } from "#components/shared/DropdownMenu";
import Button from "#components/shared/Button";

// api
import { createGuide } from "#api/internal/guide";

// styles
import { fl_allStates } from "#styles/frontline";

const Root = styled.ul`
  display: none;

  @media all and (min-width: 1000px) {
    display: flex;
  }
`;

const Item = styled.li`
  border-left: 1px solid rgba(255, 255, 255, 0.3);
  font-size: 1.1em;
  line-height: 1.25;
  margin-left: 20px;
  padding-left: 20px;

  &:first-child {
    margin-left: 0;
    padding-left: 0;
    border: 0;
  }
`;

const LoginLink = styled(Link)`
  ${fl_allStates(css`
    color: ${(props) => props.theme.colors.white};
    text-decoration: none;
  `)}
`;

const DesktopUserNav = () => {
  const userContext = useContext(UserContext);
  const editorContext = useContext(EditorContext);
  const history = useHistory();

  const logout = () => {
    window.location = "/";
    userContext.actions.logout();
  };

  const handleCreate = () => {
    editorContext.actions.clear();

    createGuide()
      .then((response) => {
        const id = response.data.data.id;

        history.push(`/guides/${id}/edit`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <Root>
      <Item>
        <DropdownMenu label="Guides to Records">
          <DropdownLink to="/research-guides">
            Explore Guides to Records
          </DropdownLink>
          <DropdownLink to="/getting-started">Getting Started</DropdownLink>

          {userContext.state.user && (
            <Button
              onClick={handleCreate}
              style={{ marginTop: "20px" }}
              block
              scheme="outline"
              href="/research-guides"
            >
              Create a Guide
            </Button>
          )}
        </DropdownMenu>
      </Item>
      <Item>
        {userContext.state.user && (
          <DropdownMenu label={userContext.state.user.name}>
            <DropdownLink to="/dashboard">Dashboard</DropdownLink>
            <DropdownLink to="/dashboard/guides">
              My Guides to Records
            </DropdownLink>
            <DropdownLink to="/dashboard/settings">Settings</DropdownLink>
            <Button
              style={{ marginTop: "20px" }}
              block
              scheme="outline"
              onClick={logout}
            >
              Sign Out
            </Button>
          </DropdownMenu>
        )}

        {!userContext.state.user && <LoginLink to="/login">Login</LoginLink>}
      </Item>
    </Root>
  );
};

export default DesktopUserNav;
