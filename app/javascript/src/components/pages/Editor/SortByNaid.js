import React, { Fragment, useState } from "react";
import styled, { css } from "styled-components";
import { isEqual } from "lodash";

// API
import { sortGuideSectionByNaid } from "#api/internal/guideSection";

// components
import Modal from "#components/shared/Modal";
import Button from "#components/shared/Button";
import * as Text from "#components/shared/Text";

// styles
import { buttonReset } from "#styles/mixins";
import { fl_static, fl_attention } from "#styles/frontline";

// assets
import WarningIcon from "#assets/icons/warning.svg";

const Root = styled.div`
  margin-bottom: 20px;
  margin-top: 20px;
`;

const StyledButton = styled.button`
  ${buttonReset}

  background-color: ${(props) => props.theme.colors.lightBlue};
  border-radius: 28px;
  color: ${(props) => props.theme.colors.blue};
  font-size: 0.75rem;
  padding: 8px 10px;
  text-transform: uppercase;

  &:disabled {
    opacity: 1;
    cursor: not-allowed;
    color: ${(props) => props.theme.colors.black};
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

const SortByNaid = ({ guide, section, descriptions, dispatchDescriptions }) => {
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

  const descriptionIds = descriptions.map((d) => d.id);
  const sortedDescriptionIds = [...descriptions]
    .sort((a, b) =>
      parseInt(a.attributes.naId) > parseInt(b.attributes.naId) ? 1 : -1
    )
    .map((d) => d.id);

  const sorted = isEqual(descriptionIds, sortedDescriptionIds);

  return (
    <Fragment>
      {descriptions.length > 1 && (
        <Root>
          <StyledButton disabled={sorted} onClick={() => setModalOpen(true)}>
            {sorted && "Section sorted by NAID"}
            {!sorted && "Sort Section by NAID"}
          </StyledButton>

          <Modal isOpen={modalOpen} toggleModal={() => setModalOpen(!open)}>
            <ModalInner>
              <Warning>
                <WarningIcon />
                This cannot be undone
              </Warning>
              <Text.H3 style={{ marginBottom: "20px" }}>
                Sort This Section by NAID
              </Text.H3>
              <p>
                Are you sure you want to sort this section in ascending order by
                NAID? This will overwrite any custom ordering you may have done
                and it cannot be undone.
              </p>

              <Actions>
                <Cancel onClick={() => setModalOpen(false)}>Cancel</Cancel>
                <Button onClick={handleSort} scheme="green">
                  Sort By NAID
                </Button>
              </Actions>
            </ModalInner>
          </Modal>
        </Root>
      )}
    </Fragment>
  );
};

export default SortByNaid;
