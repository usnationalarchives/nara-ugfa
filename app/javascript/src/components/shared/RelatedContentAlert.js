import React, { useState} from "react";
import styled, {css} from 'styled-components';
import { Link } from "react-router-dom";
import Modal from './Modal';

// styles
import { fl_static } from '#styles/frontline';
import { fl_attention } from '#styles/frontline';
import { buttonReset } from '#styles/mixins';

const ModalContent = styled.div`
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

const RelatedContentAlert = ({ title, link }) => {
  const [modalIsOpen, setIsOpen] = useState(false);

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <button onClick={openModal}>
        Related Content
      </button>
        <Modal
        toggleModal={setIsOpen}
        isOpen={modalIsOpen}
        contentLabel="Related Content">
            <ModalContent>
              <p>You've added 10 other items from this series:</p>
              <Title to={link}>{title}</Title>
              <Description>
                <p>RG360</p>
                <p>This series contains photographs documenting subject relating to nations with United States Information Service (USIS) field offices and other events and subjects considered to be useful for informing and influencing foreign...</p>
              </Description>
              <p><Link to={ link }>Check out the Series</Link> to add the entire series to your research guide or browse additional items from the series.</p>
            </ModalContent>
          </Modal>
    </>
  );
};

export default RelatedContentAlert;
