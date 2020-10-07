import React, { useState } from "react";
import styled from "styled-components";
import Modal from "react-modal";

// API
import { sortGuideSectionByNaid } from "#api/internal/guideSection";

// styles
import { buttonReset } from "#styles/mixins";

const customModalStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-40%",
    overflow: "initial",
    padding: "0",
    transform: "translate(-50%, -50%)",
  },
};

const Root = styled.div`
  margin-bottom: 20px;
`;

const StyledButton = styled.button`
  ${buttonReset}

  background-color: ${(props) => props.theme.colors.lightBlue};
  border-radius: 28px;
  color: ${(props) => props.theme.colors.blue};
  font-size: 0.75rem;
  padding: 8px 10px;
  text-transform: uppercase;
`;

const ModalContent = styled.div`
  background-color: #fff;
  margin: auto 10px;
  max-width: 600px;
  padding: 20px;
  position: relative;

  @media all and (min-width: 600px) {
    margin: auto 20px;
    padding: 40px;
  }
`;

const SortByNaid = ({ guide, section, dispatchDescriptions }) => {
  const [modalOpen, setModalOpen] = useState(false);

  const handleSort = () => {
    sortGuideSectionByNaid(guide.data.id, section.id).then(() => {
      setModalOpen(false);
      dispatchDescriptions({
        type: "sortSectionByNaid",
        sectionId: section.id,
      });
    });
  };

  return (
    <Root>
      <StyledButton onClick={handleSort}>Sort Section by NAID</StyledButton>

      {/* <Modal isOpen={modalOpen} style={customModalStyles}>
        <ModalContent>
          <button onClick={handleSort}>Sort By NAID</button>
        </ModalContent>
      </Modal> */}
    </Root>
  );
};

export default SortByNaid;
