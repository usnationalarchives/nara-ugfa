import React, { Fragment, useContext, useState } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";

// contexts
import { UserContext } from "#contexts/User";
import { EditorContext } from "#contexts/Editor";

// components
import { DropdownLink } from "#components/shared/DropdownMenu";
import Button, { ButtonLink } from "#components/shared/Button";

// api
import { createGuide } from "#api/internal/guide";

const Root = styled.div`
  display: block;
  padding-bottom: 20px;

  @media all and (min-width: 1000px) {
    display: none;
  }
`;

const Menu = styled.ul``;

const MenuItem = styled.li`
  background-color: ${(props) => props.theme.colors.white};
  margin-top: 20px;
`;

const MenuItemLabel = styled.div`
  background-color: ${(props) => props.theme.colors.lightGrey};
  color: ${(props) => props.theme.colors.blue};
  font-size: 1.1rem;
  padding: 8px 16px;
`;

const MenuItemContent = styled.div`
  padding: 20px 16px;
`;

const MobileUserNav = () => {
  const userContext = useContext(UserContext);
  const editorContext = useContext(EditorContext);
  const history = useHistory();
  const [open, setOpen] = useState(true);

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
      {open && (
        <Menu>
          <MenuItem>
            <MenuItemLabel>Guides to Records</MenuItemLabel>
            <MenuItemContent>
              <DropdownLink to="/guides">
                Explore Guides to Records
              </DropdownLink>

              <DropdownLink to="/getting-started">Getting Started</DropdownLink>

              {userContext.state.user && (
                <Button
                  onClick={handleCreate}
                  style={{ marginTop: "20px" }}
                  block
                  scheme="outline"
                >
                  Create a Guide
                </Button>
              )}
            </MenuItemContent>
          </MenuItem>
          {userContext.state.user && (
            <MenuItem>
              <Fragment>
                <MenuItemLabel>{userContext.state.user.name}</MenuItemLabel>
                <MenuItemContent>
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
                </MenuItemContent>
              </Fragment>
            </MenuItem>
          )}
          {!userContext.state.user && (
            <MenuItem>
              <MenuItemLabel>Account Login</MenuItemLabel>
              <MenuItemContent>
                <ButtonLink
                  style={{ marginTop: "20px" }}
                  block
                  scheme="outline"
                  href="/login"
                >
                  Login
                </ButtonLink>
              </MenuItemContent>
            </MenuItem>
          )}
        </Menu>
      )}
    </Root>
  );
};

export default MobileUserNav;
