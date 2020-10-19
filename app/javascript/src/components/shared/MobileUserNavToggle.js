import React, { Fragment, useContext } from "react";
import { buttonReset } from "#styles/mixins";
import styled, { css } from "styled-components";

// contexts
import { UserContext } from "#contexts/User";

// components
import { Screenreader } from "#components/shared/Text";

// assets
import Chev from "#assets/icons/chevron.svg";

const Root = styled.div`
  display: flex;

  &:before {
    background-color: ${(props) => props.theme.colors.white};
    content: "";
    display: inline-block;
    height: 35px;
    margin: 0 15px;
    opacity: 0.3;
    width: 1px;
  }

  @media all and (min-width: 1000px) {
    display: none;
  }
`;

const UserButton = styled.button`
  ${buttonReset}
  display: flex;
  align-items: center;
`;

const StyledChevron = styled(Chev)`
  transition: transform 0.5s;
  height: 10px;
  width: 10px;
  margin-left: 4px;

  ${(props) =>
    !props.open &&
    css`
      -ms-transform: rotate(-90deg); /* IE 9 */
      -webkit-transform: rotate(-90deg); /* Chrome, Safari, Opera */
      transform: rotate(-90deg);
    `}

  ${(props) =>
    props.open &&
    css`
      -ms-transform: rotate(-90deg) rotateY(180deg); /* IE 9 */
      -webkit-transform: rotate(-90deg) rotateY(180deg); /* Chrome, Safari, Opera */
      transform: rotate(-90deg) rotateY(180deg);
    `}

  path {
    stroke: ${(props) => props.theme.colors.white};
  }
`;

const StyledAvatar = styled.img`
  display: block;
  border-radius: 100%;
  padding: 0;
  width: 30px;
  margin-top: 2px;
`;

const MobileUserNavToggle = ({ open, setOpen }) => {
  const userContext = useContext(UserContext);

  const Avatar = () => {
    return (
      <Fragment>
        <StyledAvatar
          src={userContext.state.user.gravatar}
          alt=""
          aria-hidden="true"
          role="presentation"
        />
        <Screenreader>Menu</Screenreader>
      </Fragment>
    );
  };

  return (
    <Root>
      <UserButton onClick={() => setOpen(!open)}>
        {userContext.state.user && <Avatar />}
        {!userContext.state.user && "Menu"}
        <StyledChevron open={open} />
      </UserButton>
    </Root>
  );
};

export default MobileUserNavToggle;
