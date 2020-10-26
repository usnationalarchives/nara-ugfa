import React, { useState } from "react";
import styled, { css } from "styled-components";

// components
import SlideToggleContent from "../../shared/SlideToggleContent";

// assets
import Chev from "#assets/icons/chevron.svg";

// styles
import { buttonReset } from "#styles/mixins";
import { fl_static, fl_attention } from "#styles/frontline";

const Root = styled.div`
  display: block;
  width: 100%;

  button {
    ${buttonReset}

    background-color: ${(props) => props.theme.colors.lightGrey};
    border-bottom: 1px solid ${(props) => props.theme.colors.mediumGrey};
    text-align: left;
    margin-top: 20px;
    padding: 10px 40px 10px 10px;
    position: relative;
    width: 100%;
  }
`;

const ToggleChev = styled.div`
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translateY(-50%);

  svg {
    transition: transform 0.5s;

    ${(props) =>
      !props.toggleOpen &&
      css`
        -ms-transform: rotate(-90deg); /* IE 9 */
        -webkit-transform: rotate(-90deg); /* Chrome, Safari, Opera */
        transform: rotate(-90deg);
      `}

    ${(props) =>
      props.toggleOpen &&
      css`
        -ms-transform: rotate(-90deg) rotateY(180deg); /* IE 9 */
        -webkit-transform: rotate(-90deg) rotateY(180deg); /* Chrome, Safari, Opera */
        transform: rotate(-90deg) rotateY(180deg);
      `}

    path {
      stroke: ${(props) => props.theme.colors.darkGrey};
    }
  }
`;

const InfoWrap = styled.div`
  padding-top: 20px;

  div {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;

    p {
      width: 65%;

      &:first-of-type {
        text-align: right;
        width: 30%;
      }
    }
  }

  a {
    ${fl_static(css`
      color: ${(props) => props.theme.colors.blue};

      text-decoration: none;
    `)}

    ${fl_attention(css`
      text-decoration: underline;
    `)}
  }
`;

const InfoToggle = ({ heading, ...rest }) => {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <Root>
      <button type="button" onClick={() => setIsVisible(!isVisible)}>
        {heading}
        <ToggleChev toggleOpen={isVisible}>
          <Chev />
        </ToggleChev>
      </button>
      <SlideToggleContent isVisible={isVisible}>
        <InfoWrap aria-live="polite">{rest.children}</InfoWrap>
      </SlideToggleContent>
    </Root>
  );
};

export default InfoToggle;
