import React, { useState } from "react";
import styled, { css } from 'styled-components';
import ToggleContent from './ToggleContent';
import Modal from './Modal';
import useClipboard from "react-use-clipboard";

// components
import Button from "#components/shared/Button";
import Form, { Label, TextInput } from "#components/shared/Form";

// styles
import * as Text from "#components/shared/Text";
import { buttonReset } from '#styles/mixins';

// assets
import Headshot from "#assets/images/headshot.png";
import Close from '#assets/icons/close-x.svg';
import Share from '#assets/icons/share.svg';

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

const OpenButton = styled.button`
  ${buttonReset}
  height: 20px;
  width: 20px;

  svg {
    fill: ${props => props.theme.colors.yellow}
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

const DetailText = styled.p`
  color: ${props => props.theme.colors.textLightGrey};
  font-size: 0.8em;
`;

const AddCollaborator = styled(Form)`
  margin: 20px 0;

  input {
    @media ${(props) => props.theme.breakpoints.medium} {
      width: 75%;
    }
  }

  button {
    margin-top: 10px;

    @media (min-width: 500px) {
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
    max-height: none;
  }
`; 

const Collaborator = styled.div`
  color: ${props => props.theme.colors.textLightGrey};
  display:  flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px 0;
  width: 48%;

  @media ${(props) => props.theme.breakpoints.medium} {
    flex-direction: row;
    width: 100%;
  }

  button {
    margin-top: 10px;
    width: fit-content;

    @media ${(props) => props.theme.breakpoints.medium} {
      margin-top: 0;
    }
  }
`;

const CollaboratorHeadshot = styled.img`
  background-color: ${props => props.theme.colors.textLightGrey};
  background-image: url('assets/images/headshot.png');
  border-radius: 50%;
  display: block;
  height: 50px;
  width: 50px;
`;

const CollaboratorEmail = styled.div`
  font-size: 0.9em;
`; 

const CollaboratorInfo = styled.div`

  @media ${(props) => props.theme.breakpoints.medium} {
    width: 65%;
  }
`;

const CollabortaionModal = ({ publicLink }) => {
  const [isCopied, setCopied] = useClipboard(publicLink);

  const copyToClipboard = (event) => {
    event.preventDefault();
    setCopied( publicLink );
  };

  const AddCollaboratorEmail = (event) => {
    event.preventDefault();
  };

  return (
    <>
      <ToggleContent
        toggle={show =>
          <OpenButton onClick={show}>
            <Share />
          </OpenButton>
        }
        content={hide => (
          <Modal>
            <ModalContent>
              <CloseButton onClick={hide}>
                <Close />
              </CloseButton>
              <Text.H3>Share with Collaborators</Text.H3>
              <AddCollaborator>
                <TextInput 
                  id="collaboratorEmail"
                  type="text"
                  name="collaboratorEmail"
                  placeholder="Enter Email Address"
                />
                <Button scheme="green" onClick={AddCollaboratorEmail}>Add</Button>
              </AddCollaborator>
              <Text.H4>Current Collaborators</Text.H4>
              <Collaborators>
                  <Collaborator>
                      <CollaboratorHeadshot
                        src={Headshot}
                        alt=""
                        aria-hidden="true"
                        role="presentation"
                      />
                      <CollaboratorInfo>
                        <p>Alex Patel</p>
                      <CollaboratorEmail>apatel@gmu.com</CollaboratorEmail>
                      </CollaboratorInfo>
                    <Button type="submit" scheme="green-outline">Remove</Button>
                  </Collaborator>
                  <Collaborator>
                      <CollaboratorHeadshot
                        src={Headshot}
                        alt=""
                        aria-hidden="true"
                        role="presentation"
                      />
                      <CollaboratorInfo>
                        <p>Jessica Alvarez</p>
                      <CollaboratorEmail>Jalvarez@gmail.com</CollaboratorEmail>
                      </CollaboratorInfo>
                    <Button scheme="green-outline">Remove</Button>
                  </Collaborator>
                  <Collaborator>
                      <CollaboratorHeadshot
                        src={Headshot}
                        alt=""
                        aria-hidden="true"
                        role="presentation"
                      />
                      <CollaboratorInfo>
                        <p>Keirsten Lange</p>
                      <CollaboratorEmail>keirsten.lange.72@gmail.com</CollaboratorEmail>
                      </CollaboratorInfo>
                    <Button type="submit" scheme="green-outline">Remove</Button>
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

            </ModalContent>
          </Modal>
        )}
      />
    </>
  );
};

export default CollabortaionModal;
