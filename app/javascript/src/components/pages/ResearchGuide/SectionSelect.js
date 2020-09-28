import React from "react";
import styled, { css } from "styled-components";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";

// styles
import { fl_attention } from "#styles/frontline";

export const Root = styled.div`
  display: block;

  @media all and (min-width: ${(props) => props.theme.layout.maxWidthNarrow}) {
    display: none;
  }
`;

export const Select = styled.select`
  background-color: ${(props) => props.theme.colors.lightGrey};
  border-color: ${(props) => props.theme.colors.textlightGrey};
  border-radius: 30px;
  color: ${(props) => props.theme.colors.textlightGrey};
  max-width: 400px;
  padding: 10px;
  width: 100%;

  ${fl_attention(css`
    border-color: ${(props) => props.theme.colors.darkGrey};
  `)}
`;

const SectionSelect = ({ guide }) => {
  const sections = (guide.included || []).filter(
    (s) => s.type === "guide_sections"
  );

  const handleChange = (event) => {};

  return (
    <Root>
      <Layout.Center>
        <label>
          <Text.Screenreader>Jump to a Section</Text.Screenreader>
        </label>
        <Select>
          <option value="">Jump to a section</option>
          {sections.map((section) => (
            <option key={section.id} value={`section-${section.id}`}>
              March on Washignton Program
            </option>
          ))}
        </Select>
      </Layout.Center>
    </Root>
  );
};

export default SectionSelect;
