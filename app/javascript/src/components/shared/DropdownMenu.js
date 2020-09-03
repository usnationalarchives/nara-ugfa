import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";

// assets
import Chev from "#assets/icons/chevron.svg";

// styles
import { buttonReset } from "#styles/mixins";
import { fl_allStates } from "#styles/frontline";

const Root = styled.span`
  position: relative;
`;

const StyledButton = styled.button`
  ${buttonReset}
  margin-left: 0.5rem;
  border-radius: 0;
  padding-right: 20px;
  position: relative;

  [data-whatinput="mouse"] & {
    outline: 0;
  }

  ${(props) =>
    props.open &&
    css`
      &:after {
        background-color: ${(props) => props.theme.colors.yellow};
        content: "";
        display: block;
        height: 4px;
        width: 100%;
        left: 0;
        right: 0;
        bottom: -19px;
        position: absolute;
      }
    `}
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

const Content = styled.div`
  background-color: white;
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  padding: 20px 30px 40px;
  width: 300px;
  position: absolute;
  top: 41px;
  right: 0;
  z-index: 500;
`;

export const DropdownLink = styled(Link)`
  display: block;
  font-size: 0.95rem;
  margin-bottom: 1rem;

  ${fl_allStates(css`
    color: ${(props) => props.theme.colors.blue};
    text-decoration: none;
  `)}
`;

const DropdownMenu = ({ label, ...props }) => {
  const ref = useRef();
  const [open, setOpen] = useState(false);

  // close the menu when clicking outside the relevant element
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpen(false);
      }
    };

    // listen for click events on the document
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // remove event listener on cleanup
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <Root ref={ref}>
      <StyledButton open={open} onClick={() => setOpen(!open)}>
        {label}
        <StyledChevron open={open} />
      </StyledButton>
      {open && <Content>{props.children}</Content>}
    </Root>
  );
};

export default DropdownMenu;
