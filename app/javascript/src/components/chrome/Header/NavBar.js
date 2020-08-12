import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styled, {css} from 'styled-components';

// components
import * as Layout from "#components/shared/Layout";
import SearchBox from './SearchBox';

// contexts
import { UserContext } from "#contexts/User";

// styles
import { fl_allStates } from '#styles/frontline';

export const Root = styled.div`
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
`;

export const NavBarWrap = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
`;

export const NavList = styled.div`
  display: flex;
  list-style: none;
`;

export const NavListItem = styled.div`
  font-size: 1.1em;
  margin-left: 20px;
`;

export const LoginItem = styled.div`
  border-left: 1px solid rgba(255, 255, 255, .3);
  font-size: 1.1em;
  margin-left: 20px;
  padding-left: 20px;
`;

const NavLink = styled(Link)`
  ${fl_allStates(css`
    color: ${props => props.theme.colors.white};
    text-decoration: none;
  `)}
`;

const LoginLink = styled(Link)`
  ${fl_allStates(css`
    color: ${props => props.theme.colors.white};
    text-decoration: none;
  `)}
`;

const NavBar = () => {
  const context = useContext(UserContext);

  const logout = () => {
    window.location = "/";
    context.actions.logout();
  };

  return (
    <Root>
      <Layout.Padding>
        <Layout.Wrapper>
          <NavBarWrap>
            <SearchBox/>
            <NavList>
              <NavListItem>
                <NavLink to="/research-guides">Research Guides</NavLink>
              </NavListItem>
              <NavListItem>
                <NavLink to="/research-guides">Create a Guide</NavLink>
              </NavListItem>
              <LoginItem>
                {context.state.user && <button onClick={logout}>Log Out</button>}
                {!context.state.user && <LoginLink to="/login">Login</LoginLink>}
              </LoginItem>
            </NavList>
          </NavBarWrap>
        </Layout.Wrapper>
      </Layout.Padding>
    </Root>
  );
};

export default NavBar;
