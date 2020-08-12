import React, { useRef, useState, useEffect } from "react";
import styled from 'styled-components';

// assets
import Verified from '#assets/icons/verified.svg';
import VerifiedSolid from '#assets/icons/verified-solid.svg';

export const Root = styled.div`
  background-color: ${props => props.theme.colors.white};
  -webkit-box-shadow: 0px 0px 17px 2px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 0px 17px 2px rgba(0,0,0,0.2);
  box-shadow: 0px 0px 17px 2px rgba(0,0,0,0.2);
  margin-top: 30px;
  min-height: 250px;
  position: relative;
  width: 100%;  
  
  @media all and (min-width: ${(props) => props.theme.layout.catalogColumnMin}) {
    width: 48%;  
  }

  @media all and (min-width: 1000px) {
    max-width: 250px;
    width: 23%;
  }
`;

export const Image = styled.div`
  background-color: ${props => props.theme.colors.darkGrey};
  content: '';
  height: 100px;
  width: 100%;
`;

export const Title = styled.p`
  color: ${props => props.theme.colors.blue};
  font-size: 1.1em;
  font-weight: bold;
  padding: 20px;
`;

export const VerifiedInfo = styled.div`
  bottom: 10px;
  cursor: pointer;
  position: absolute;
  right: 10px;
`;

export const VerifiedToolTip = styled.div`
  background-color: ${props => props.theme.colors.darkGrey};
  border-radius: 3px;
  bottom: 30px;
  color: ${props => props.theme.colors.white};
  font-size: 0.8em;
  padding: 10px;
  position: absolute;
  text-transform: uppercase;
  width: 150px;
  z-index: 10;
`;

// Hover Hook
// this should probably live somewhere else
const useHover = () => {
  const [value, setValue] = useState(false);

  const ref = useRef(null);

  const handleMouseOver = () => setValue(true);
  const handleMouseOut = () => setValue(false);

  useEffect(
    () => {
      const node = ref.current;
      if (node) {
        node.addEventListener('mouseover', handleMouseOver);
        node.addEventListener('mouseout', handleMouseOut);

        return () => {
          node.removeEventListener('mouseover', handleMouseOver);
          node.removeEventListener('mouseout', handleMouseOut);
        };
      }
    },
    [ref.current]
  );

  return [ref, value];
}

const ResearchGuideCard = () => {
  const [hoverRef, isHovered] = useHover();

  return (
    <Root>
      <Image/>
      <Title>Photographs from the Civil Rights Movement</Title>
      <VerifiedInfo ref={hoverRef}>
        {isHovered ? (<VerifiedSolid />) : (<Verified />)}
        {isHovered ? (<VerifiedToolTip>Published By NARA</VerifiedToolTip>) : ('')}
      </VerifiedInfo>
    </Root>
  );
};

export default ResearchGuideCard;
