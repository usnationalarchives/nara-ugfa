import React from "react";
import styled from "styled-components";

// components
const Display = styled.p`
  padding: 15px 0;
`;

const SummaryBlock = ({ block }) => {
  return <Display>{block.attributes.data.summary || "empty summary"}</Display>;
};

export default SummaryBlock;
