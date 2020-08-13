import React from 'react';
import styled, { css } from 'styled-components';

// styles
import { fl_burger, fl_burgerToCross } from '#styles/frontline';
import { buttonReset } from '#styles/mixins';

const Root = styled.button`
  ${buttonReset}

  align-items: center;
  display: flex;
  justify-content: space-between;
  outline: none;
  text-align: center;
  text-transform: uppercase;
  width: 80px;
`;

const Burger = styled.div`
  ${fl_burger({
  color: "#333333",
  gutter: 4,
  height: 2,
  transitionDuration: 250,
  width: 20,
})}

  ${props =>
    props.menuOpen &&
    css`
      ${fl_burgerToCross({
      color: "#333333",
      burgerGutter: 4,
      burgerHeight: 2,
    })}
    `}
`;

const Label = styled.p`
  font-size: 1.1rem;
  line-height: 2;
  padding-left: 7px;
`;


const MenuToggle = ({ menuOpen, setMenuOpen }) => {
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Root onClick={toggleMenu}>
      <Burger menuOpen={menuOpen} />
      <Label>
        {!menuOpen && 'Menu'}
        {menuOpen && 'Close'}
      </Label>
    </Root>
  );
};

export default MenuToggle;