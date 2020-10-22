import React, { Fragment, useState } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";

// components
import { H3, Screenreader } from "#components/shared/Text";
import Modal from "#components/shared/Modal";
import Button from "#components/shared/Button";

// API
import { deleteGuide } from "#api/internal/guide";

// assets
import TrashIcon from "#assets/icons/trash.svg";
import WarningIcon from "#assets/icons/warning.svg";

// styles
import { buttonReset } from "#styles/mixins";
import { fl_static, fl_attention } from "#styles/frontline";

const StyledButton = styled.button`
  ${buttonReset}
  margin-left: 20px;

  svg {
    width: 20px;
    height: 20px;
    fill: ${(props) => props.theme.colors.white};
  }
`;

const ModalInner = styled.div`
  max-width: 600px;
`;

const Warning = styled.p`
  align-items: center;
  color: ${(props) => props.theme.colors.red};
  display: flex;
  font-size: 0.8rem;
  margin-bottom: 30px;
  text-transform: uppercase;

  svg {
    fill: currentColor;
    height: 23px;
    margin-right: 5px;
    width: 23px;
  }
`;

const Cancel = styled.button`
  ${buttonReset}
  font-size: 0.8em;
  margin-right: 20px;
  text-transform: uppercase;

  ${fl_static(css`
    color: ${(props) => props.theme.colors.darkrGrey};
  `)}

  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

const Actions = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
`;

const DeleteGuide = ({ guideId }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const history = useHistory();

  const handleDelete = () => {
    deleteGuide(guideId)
      .then(() => {
        setModalOpen(false);
        history.push("/dashboard");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const Alert = () => {
    return (
      <Modal isOpen={modalOpen} toggleModal={() => setModalOpen(!open)}>
        <ModalInner>
          <Warning>
            <WarningIcon />
            This cannot be undone
          </Warning>
          <H3 style={{ marginBottom: "20px" }}>Delete this Guide</H3>
          <p>
            Are you sure you want to delete this guide. This action cannot be
            undone.
          </p>

          <Actions>
            <Cancel onClick={() => setModalOpen(false)}>Cancel</Cancel>
            <Button onClick={handleDelete} scheme="green">
              Delete Guide
            </Button>
          </Actions>
        </ModalInner>
      </Modal>
    );
  };

  return (
    <Fragment>
      <StyledButton onClick={() => setModalOpen(true)}>
        <TrashIcon />
        <Screenreader>Delete Guide</Screenreader>
      </StyledButton>
      <Alert />
    </Fragment>
  );
};

export default DeleteGuide;
