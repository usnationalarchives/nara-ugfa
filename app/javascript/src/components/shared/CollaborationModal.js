import React, { useState } from "react";
import styled, { css } from 'styled-components';
import Modal from './Modal';
import useClipboard from "react-use-clipboard";

// components
import Button from "#components/shared/Button";
import Form, { TextInput } from "#components/shared/Form";

// styles
import * as Text from "#components/shared/Text";
import { buttonReset } from '#styles/mixins';

// assets
import HeadshotOne from "#assets/images/avatar_1_square.png";
import HeadshotTwo from "#assets/images/avatar_2_square.png";
import HeadshotThree from "#assets/images/avatar_3_square.png";
import Share from '#assets/icons/share.svg';

const OpenButton = styled.button`
  ${buttonReset}
  height: 20px;
  width: 20px;

  svg {
    fill: ${props => props.theme.colors.yellow}
  }
`;

const DetailText = styled.p`
  color: ${props => props.theme.colors.textLightGrey};
  font-size: 0.8em;
`;

const AddCollaborator = styled(Form)`
  margin: 20px 0;

  input {
    width: 100%;

    @media (min-width: 530px) {
      width: 75%;
    }
  }

  button {
    margin-top: 10px;
    position: relative;
    width: 50%;

    &:hover {
      span {
        display: block !important;
      }
    }

    @media (min-width: 530px) {
      margin-left: 20px;
      margin-top: 0;
      width: 20%;
    }
  }
`;

const Collaborators = styled.div`
  border-bottom: 1px solid ${props => props.theme.colors.mediumGrey};
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 40px;
  max-height: 200px;
  overflow-x: scroll;
  padding-bottom: 20px;

  @media ${(props) => props.theme.breakpoints.medium} {
    display: block;
    overflow-x: inherit;
    max-height: none;
  }
`; 

const Collaborator = styled.div`
  color: ${props => props.theme.colors.textLightGrey};
  display:  flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px 0;
  width: 100%;

  @media (min-width: 450px) {
    width: 48%;
  }

  @media ${(props) => props.theme.breakpoints.medium} {
    flex-direction: row;
    width: 100%;
  }

  button {
    height: fit-content;
    margin-top: 10px;
    position: relative;
    width: fit-content;

    &:hover {
      span {
        display: block !important;
      }
    }

    @media ${(props) => props.theme.breakpoints.medium} {
      margin-top: 0;
    }
  }
`;

const CollaboratorHeadshot = styled.img`
  background-color: ${props => props.theme.colors.textLightGrey};
  border-radius: 50%;
  display: block;
  height: 60px;
  width: 60px;
`;

const CollaboratorEmail = styled.div`
  font-size: 0.9em;
`; 

const CollaboratorInfo = styled.div`
  @media ${(props) => props.theme.breakpoints.medium} {
    width: 65%;
  }
`;

const DemoPopup = styled.span`
  background: #fff;
  border: 1px solid ${props => props.theme.colors.lightGrey};
  border-radius: 10px;
  box-shadow: 0px 0px 11px 2px rgba(0, 0, 0, 0.2);
  color: ${props => props.theme.colors.textLightGrey};
  display: none;
  font-size: 12px;
  height: fit-content;
  padding: 5px;
  position: absolute;
  right: -100px;
  text-transform: none;
  top: -20px;
  width: 120px;
  z-index: 100;

  @media ${(props) => props.theme.breakpoints.medium} {
    right: -25px;
    top: -62px;
    width: 150px;
  }

`;


const CollabortaionModal = ({ publicLink }) => {
  const [modalIsOpen, setIsOpen] = useState(false);
  const [isCopied, setCopied] = useClipboard(publicLink);

  function openModal() {
    setIsOpen(true);
  }

  const copyToClipboard = (event) => {
    event.preventDefault();
    setCopied( publicLink );
  };

  const AddCollaboratorEmail = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <OpenButton onClick={openModal}>
        <Text.Screenreader>Collaboration Tools</Text.Screenreader>
        <Share />
      </OpenButton>
      
      <Modal
        toggleModal={setIsOpen}
        isOpen={modalIsOpen}
        contentLabel="Collaboration Tools">
          <Text.H3>Share with Collaborators</Text.H3>
          <AddCollaborator>
            <TextInput 
              id="collaboratorEmail"
              type="text"
              name="collaboratorEmail"
              placeholder="Enter Email Address"
            />
            <Button scheme="green" onClick={AddCollaboratorEmail}>
              Add
              <DemoPopup>This feature is for demonstration purposes only.</DemoPopup>
            </Button>
          </AddCollaborator>
          <Text.H4>Current Collaborators</Text.H4>
          <Collaborators>
              <Collaborator>
                  <CollaboratorHeadshot
                    src={HeadshotOne}
                    alt="Alex Patel Headshot"
                    aria-hidden="true"
                    role="presentation"
                  />
                  <CollaboratorInfo>
                    <p>Alex Patel</p>
                  <CollaboratorEmail>apatel@gmu.com</CollaboratorEmail>
                  </CollaboratorInfo>
                <Button type="submit" scheme="green-outline">
                  Remove
                  <DemoPopup>This feature is for demonstration purposes only.</DemoPopup>
                </Button>
              </Collaborator>
              <Collaborator>
                  <CollaboratorHeadshot
                    src={HeadshotTwo}
                    alt="Jessica Alvarez Headshot"
                    aria-hidden="true"
                    role="presentation"
                  />
                  <CollaboratorInfo>
                    <p>Jessica Alvarez</p>
                  <CollaboratorEmail>Jalvarez@gmail.com</CollaboratorEmail>
                  </CollaboratorInfo>
                  <Button type="submit" scheme="green-outline">
                    Remove
                    <DemoPopup>This feature is for demonstration purposes only.</DemoPopup>
                  </Button>
              </Collaborator>
              <Collaborator>
                  <CollaboratorHeadshot
                    src={HeadshotThree}
                    alt="Keirsten Lange Headshot"
                    aria-hidden="true"
                    role="presentation"
                  />
                  <CollaboratorInfo>
                    <p>Keirsten Lange</p>
                  <CollaboratorEmail>keirsten.lange.72@gmail.com</CollaboratorEmail>
                  </CollaboratorInfo>
                <Button type="submit" scheme="green-outline">
                  Remove
                  <DemoPopup>This feature is for demonstration purposes only.</DemoPopup>
                </Button>
              </Collaborator>
            </Collaborators>
          <Text.H3>Share via a Public Link</Text.H3>
          <AddCollaborator>
            <TextInput
              id="publicLink"
              type="text"
              name="publicLink"
              value={publicLink}
              readOnly
            />
            <Button scheme="green" onClick={copyToClipboard}>{isCopied ? "Copied!" : "Copy"}</Button>
          </AddCollaborator>
          <DetailText>The public share link allows people to view your guide wthout giving them access to the collaboration features.</DetailText>
      </Modal>
    </>
  );
};

export default CollabortaionModal;
