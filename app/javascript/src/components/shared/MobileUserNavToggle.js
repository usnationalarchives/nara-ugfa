import React, { useContext } from "react";
import { buttonReset } from "#styles/mixins";
import styled, { css } from "styled-components";

// contexts
import { UserContext } from "#contexts/User";

// assets
import Chev from "#assets/icons/chevron.svg";

const UserButton = styled.button`
  ${buttonReset}

  display: block;
  position: relative;
  padding-right: 20px;

  @media all and (min-width: 1000px) {
    display: none;
  }
`;

const StyledChevron = styled(Chev)`
  position: absolute;
  right: 0;
  top: 4px;
  transition: transform 0.5s;

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

const MobileUserNavToggle = ({ open, setOpen }) => {
  const userContext = useContext(UserContext);

  return (
    <UserButton onClick={() => setOpen(!open)}>
      {userContext.state.user && userContext.state.user.name}
      {!userContext.state.user && "Menu"}
      <StyledChevron open={open} />
    </UserButton>
  );
};

export default MobileUserNavToggle;
