import React from "react";
import styled, {css} from 'styled-components';
import { Link } from "react-router-dom";
import ToggleContent from './ToggleContent';
import Modal from './Modal';

// styles
import { fl_static } from '#styles/frontline';
import { fl_attention } from '#styles/frontline';
import { buttonReset } from '#styles/mixins';

// assets
import Close from '#assets/icons/close-x.svg';

const ModalContent = styled.div`
  background-color:#fff;
  margin: auto 10px;
  max-width: 600px;
  padding: 20px;
  position: relative;

  @media all and (min-width: 600px) {
    margin: auto 20px;
    padding: 40px;
  }

  p {
    a {
      ${fl_static(css`
        color: ${props => props.theme.colors.blue};
        text-decoration: none;
      `)}

      ${fl_attention(css`
        text-decoration: underline;
      `)}
    }
  }
`;

const Title = styled(Link)`
  color: ${props => props.theme.colors.blue};
  font-size: 1.1em;
  font-weight: bold;
  margin: 10px 0;

  ${fl_static(css`
    text-decoration: none;
  `)}

  ${fl_attention(css`
    text-decoration: underline;
  `)}

  @media all and (min-width: 600px) {
    font-size: 1.4em;
  }
`;

const Description = styled.div`
  color: ${props => props.theme.colors.textLightGrey};
  font-size: 0.9em;
  margin: 20px 0;
`;

const CloseButton = styled.button`
  ${buttonReset}
  height: 20px;
  position: absolute;
  right: 7px;
  top: -45px;
  width: 20px;
`;

const RelatedContentAlert = ({ title, link }) => {

  return (
    <>
      <ToggleContent
        toggle={() => ''}
        content={hide => (
          <Modal>
            <ModalContent>
              <CloseButton onClick={ hide }>
                <Close/>
              </CloseButton>
              <p>You've added 10 other items from this series:</p>
              <Title to={link}>{title}</Title>
              <Description>
                <p>RG360</p>
                <p>This series contains photographs documenting subject relating to nations with United States Information Service (USIS) field offices and other events and subjects considered to be useful for informing and influencing foreign...</p>
              </Description>
              <p><Link to={ link }>Check out the Series</Link> to add the entire series to your research guide or browse additional items from the series.</p>
            </ModalContent>
          </Modal>
        )}
      />
    </>
  );
};

export default RelatedContentAlert;
