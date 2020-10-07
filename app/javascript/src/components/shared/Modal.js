import React, { useState } from 'react';
import styled from 'styled-components';
import ReactModal from 'react-modal';

// styles
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
`;

const CloseButton = styled.button`
  ${buttonReset}
  height: 20px;
  position: absolute;
  right: 7px;
  top: -45px;
  width: 20px;
`;

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-40%',
    overflow: 'initial',
    padding: '0',
    transform: 'translate(-50%, -50%)'
  },
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.8)'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
ReactModal.setAppElement('#root')

const Modal = (props) => {
  const { toggleModal } = props;

  function afterOpenModal() {
    // references are now sync'd and can be accessed.
  }

  function closeModal() {
    setIsOpen(false);
  }

  return(
    <ReactModal
      {...props}
      style={customStyles}
      onAfterOpen={afterOpenModal}
      onRequestClose={() => toggleModal(false)}
    >
      <ModalContent>
        <CloseButton onClick={() => toggleModal(false)}>
          <Close />
        </CloseButton>
        {props.children}
      </ModalContent>
    </ReactModal>
  )
};

export default Modal;