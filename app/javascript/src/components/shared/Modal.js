import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';

export const Root = styled.div`
  background-color: rgba(0,0,0,0.8);
  bottom: 0;
  display: flex;
  justify-content: center;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 100;
`;

const Modal = ({ children }) => (
  ReactDOM.createPortal(
    <Root>
      {children}
    </Root>,
    document.getElementById('modal-root')
  )
);

export default Modal;