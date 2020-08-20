import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import styled, {css} from 'styled-components';

// components
import * as Layout from "#components/shared/Layout";
import SearchBox from './SearchBox';

// assets
import Chev from '#assets/icons/chevron.svg';

// contexts
import { UserContext } from "#contexts/User";

// styles
import { fl_allStates } from '#styles/frontline';
import { buttonReset } from '#styles/mixins';

export const Root = styled.div`
  background-color: ${(props) => props.theme.colors.blue};
  color: ${(props) => props.theme.colors.white};
  position: relative;
`;

export const NavBarWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px 0;

  @media all and ${(props) => props.theme.breakpoints.navBP} {
    align-items: center;
    flex-direction: row;
  }
`;

export const NavList = styled.div`
  display: flex;
  list-style: none;
  margin-top: 20px;

  @media all and ${(props) => props.theme.breakpoints.navBP} {
    margin-top: 0;
  }
`;

export const NavListItem = styled.div`
  font-size: 1em;
  line-height: 1.25;
  margin-left: 20px;

  &:first-of-type {
    margin-left: 0;
  }

  @media all and ${(props) => props.theme.breakpoints.wideNavBP} {
    font-size: 1.1em;
  }
`;

export const LoginItem = styled.div`
  border-left: 1px solid rgba(255, 255, 255, .3);
  font-size: 1em;
  line-height: 1.25;
  margin-left: 20px;
  padding-left: 20px;
  position: relative;

  @media all and ${(props) => props.theme.breakpoints.wideNavBP} {
    font-size: 1.1em;
  }

  button {
    ${buttonReset}
    display: block;
    line-height: 1.25;
    position: relative;
  }
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

const DropdownChev = styled(Chev)`
  position: absolute;
  right: 0;
  transition: transform .5s;

  ${props =>
  !props.dropdownOpen &&
  css`
    -ms-transform: rotate(-90deg); /* IE 9 */
    -webkit-transform: rotate(-90deg); /* Chrome, Safari, Opera */
    transform: rotate(-90deg);
  `}

  ${props =>
  props.dropdownOpen &&
  css`
    -ms-transform: rotate(-90deg) rotateY(180deg); /* IE 9 */
    -webkit-transform: rotate(-90deg) rotateY(180deg); /* Chrome, Safari, Opera */
    transform: rotate(-90deg) rotateY(180deg);
  `}

  path {
    stroke: ${props => props.theme.colors.white};
  }
`;

const Dropdown = styled.div`
  background-color: ${props => props.theme.colors.blue};
  bottom: -80px;
  display: none;
  left: 0;
  padding: 15px;
  position: absolute;

  ${props =>
  props.dropdownOpen &&
  css`
    display: block;
  `}

  a {
    ${fl_allStates(css`
    color: ${props => props.theme.colors.white};
    text-decoration: none;
    `)}
    display: block;
    font-size: 0.8em;
    padding-bottom: 10px;
  }

  button {
    ${buttonReset}
    display: block;
    font-size: 0.8em;
  }
`;

const NavBar = () => {
  const context = useContext(UserContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const logout = () => {
    window.location = "/";
    context.actions.logout();
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
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
                {context.state.user && 
                <button onClick={toggleDropdown}>
                  {context.state.name}
                  <DropdownChev dropdownOpen={dropdownOpen} />
                </button>}
                {context.state.user && dropdownOpen &&
                <Dropdown dropdownOpen={dropdownOpen}>
                  <Link to="/dashoard">Dashboard</Link>
                  <button onClick={logout}>Logout</button>
                </Dropdown>}

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
