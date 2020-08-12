import React from "react";
import styled from 'styled-components';

export const Root = styled.div`
  padding: 20px;
  opacity: 0.2;
  width: 150px;

  @media all and (min-width: 1000px) {
    width: 200px;
  }
`;

export const FilterHeader = styled.p`
  font-weight: bold;
`;

export const FilterSection = styled.ul`
  margin-bottom: 20px;
`;

const FilterColumn = () => {
  return (
    <Root>
      <FilterHeader>Refine by: Data Source</FilterHeader>
      <FilterSection>
        <li>Archival descriptions with Digital Objects</li>
        <li>Archives.gov</li>
        <li>Archival Descriptions</li>
        <li>Archival Records</li>
      </FilterSection>

      <FilterHeader>Refine by: Level of Description</FilterHeader>
      <FilterSection>
        <li>Item</li>
        <li>File Unit</li>
        <li>Series</li>
      </FilterSection>

      <FilterHeader>Refine by: Type of Materials</FilterHeader>
      <FilterSection>
        <li>Textual Records</li>
        <li>Data Files</li>
        <li>Photographs and other graphic materials</li>
        <li>Moving images</li>
        <li>Artifacts</li>
        <li>Maps and Charts</li>
        <li>Sound Recordings</li>
        <li>Architectural and Engineering Drawings</li>
      </FilterSection>

      <FilterHeader>Refine by: Data Source</FilterHeader>
      <FilterSection>
        <li>Lorem Ipsum</li>
        <li>Lorem Ipsum Lorem Ipsum Lorem Ipsum</li>
        <li>Lorem Ipsum</li>
      </FilterSection>
    </Root>
  );
};

export default FilterColumn;
