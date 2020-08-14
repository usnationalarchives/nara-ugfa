import React, { useState } from "react";
import styled, { css } from "styled-components";
import SlideToggleContent from "../../shared/SlideToggleContent";

// assets
import Chev from '#assets/icons/chevron.svg';

// styles
import { buttonReset } from '#styles/mixins';

const Root = styled.div`
  display: block;
  width: 100%;

  button {
    ${buttonReset}

    background-color: ${props => props.theme.colors.mediumGrey};
    text-align: left;
    margin-top: 20px;
    padding: 10px;
    position: relative;
    width: 100%;
  }
`;

const ToggleChev = styled.div`
  position: absolute;
  right: 20px;
  top: 10px;
  
  svg {
    transition: transform .5s;

    ${props =>
      !props.toggleOpen &&
      css`
      -ms-transform: rotate(-90deg); /* IE 9 */
      -webkit-transform: rotate(-90deg); /* Chrome, Safari, Opera */
      transform: rotate(-90deg);
    `}

    ${props =>
      props.toggleOpen &&
      css`
      -ms-transform: rotate(-90deg) rotateY(180deg); /* IE 9 */
      -webkit-transform: rotate(-90deg) rotateY(180deg); /* Chrome, Safari, Opera */
      transform: rotate(-90deg) rotateY(180deg);
    `}

    path {
      stroke: ${props => props.theme.colors.darkGrey};
    }
  }
`;

const InfoToggle = ({ heading }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  return (
    <Root>
      <button type="button" onClick={() => setIsVisible(!isVisible)}>
        {heading}
        <ToggleChev toggleOpen={isVisible}>
          <Chev/>
        </ToggleChev>
      </button>
      <SlideToggleContent isVisible={isVisible}>
        <div>
          <div>
            <p>National Archives Identifier:</p>
            <p>6188109</p>
          </div>
          <div>
            <p>Local Identifier:</p>
            <p>207-DP-8615-FHEO14.jpg</p>
          </div>
          <div>
            <p>Creators:</p>
            <p>Department of Housing and Urban Development. Office of the Chief Human Capital Office. Office of Broadcasting Operations. Photo Section. (ca. 2011 - ca. 7/18/2014)  (Most Recent) Department of Housing and Urban Development. Office of the Assistant Secretary for Administration. Office of the Deputy Assistant Secretary for Budget and Administrative Support. Office of Administrative and Management Services. Multimedia Division. Publications Branch. Multimedia Library, (2003 - 2010)  (Predecessor)</p>
          </div>
        </div>
      </SlideToggleContent>
    </Root>
  );
};

export default InfoToggle;