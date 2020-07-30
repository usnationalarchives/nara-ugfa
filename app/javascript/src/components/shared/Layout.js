import styled, { css } from 'styled-components';
import { fl_clearfix } from '#styles/frontline';

export const Padding = styled.div`
  width: 100%;
  padding-left: ${(props) => props.theme.layout.minPadding};
  padding-right: ${(props) => props.theme.layout.minPadding};

  @media all and ${(props) => props.theme.breakpoints.medium} {
    padding-left: ${(props) => props.theme.layout.maxPadding};
    padding-right: ${(props) => props.theme.layout.maxPadding};
  }

  @media print {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Wrapper = styled.div`
  ${fl_clearfix}

  margin-left: auto;
  margin-right: auto;
  max-width: ${(props) => props.theme.layout.maxWidth};

  ${(props) =>
    props.wide &&
    css`
      max-width: ${(props) => props.theme.layout.maxWidthWide} !important;
    `};

  ${(props) =>
    props.medium &&
    css`
      max-width: ${(props) => props.theme.layout.maxWidthMedium} !important;
    `};

  ${(props) =>
    props.narrow &&
    css`
      max-width: ${(props) => props.theme.layout.maxWidthNarrow} !important;
    `};

  @media print {
    max-width: none !important;
  }
`;

export const Center = styled.div`
  text-align: center;
`;
