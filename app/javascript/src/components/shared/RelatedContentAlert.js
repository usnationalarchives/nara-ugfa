import React, { useState } from "react";
import styled, { css } from "styled-components";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import Cookies from "js-cookie";

// components
import { Checkbox } from "#components/shared/Form";

// styles
import { fl_static } from "#styles/frontline";
import { fl_attention } from "#styles/frontline";

const Title = styled(Link)`
  color: ${(props) => props.theme.colors.blue};
  display: block;
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
  color: ${(props) => props.theme.colors.textLightGrey};
  font-size: 0.9em;
  margin: 20px 0;
`;

const OptOut = styled.div`
  margin-top: 20px;
`;

const RelatedContentAlert = ({
  guideId,
  count,
  description,
  clearDescription,
  clearCount,
}) => {
  const [isOpen, setIsOpen] = useState(true);
  const { level, title, data, naid } = description;

  const handleOptOut = (event) => {
    if (event.target.checked) {
      Cookies.set(`optOutRelated-${guideId}`, true);
    } else {
      Cookies.remove(`optOutRelated-${guideId}`);
    }
  };

  const toggleModal = () => {
    setIsOpen(false);
    clearDescription();
    clearCount();
  };

  return (
    <Modal toggleModal={setIsOpen} isOpen={isOpen}>
      <p>
        You've added {parseInt(count) - 1} other items from this {level}:
      </p>
      <Title to={`/${naid}`}>{title}</Title>
      <Description>
        <p>{data.scopeContent}</p>
      </Description>
      <p>
        <Link to={`/${naid}`}>Check out the {level}</Link> to add the entire
        series to your research guide or browse additional items from the
        series.
      </p>

      <OptOut>
        <Checkbox
          id="dontShowAgain"
          value={guideId}
          onChange={handleOptOut}
          label="Don't show me this again"
        />
      </OptOut>
    </Modal>
  );
};

export default RelatedContentAlert;
