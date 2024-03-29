import { createGlobalStyle } from "styled-components";
import * as frontline from "#styles/frontline";

const BaseStyles = createGlobalStyle`
  html {
    background-color: ${(props) => props.theme.colors.white};
    color: ${(props) => props.theme.colors.darkGrey};
    font-family: ${(props) => props.theme.font.family};
    scroll-behavior: smooth;
  }

  body {
    overflow-x: hidden;
  }

  [data-whatinput='mouse'],
  [data-whatinput='touch'] {
    &:focus {
      outline: none
    }
  }

  .skip-links {
    a {
      background-color: #000;
      color: #fff;
      display: inline-block;
      font-size: 16px;
      position: absolute;
      padding: 8px 15px;
      line-height: 1.4;
      right: 20px;
      top: -200px; // Must be larger than the element's height
      z-index: -1;

      &:focus {
        top: 2px;
        z-index: 9999;
      }
    }
  }

  @media print {
    * {
      background: transparent !important;
      box-shadow: none !important;
      color: #000 !important; // Black prints faster: http://h5bp.com/s
      filter: none !important;
      text-shadow: none !important;
      transition: none !important;
    }

    html {
      font-size: percentage(13px / 16px);// [2]
    }

    svg {
      fill: #000 !important;
    }

    img {
      max-width: 100% !important;
    }

    p,
    h2,
    h3 {
      orphans: 2;
      widows: 2;
    }

    h2,
    h3 {
      page-break-after: avoid;
    }

    a {
      ${frontline.fl_static(`
        color: ${(props) => props.theme.colors.blue}
      `)}

      &:visited {
        color: 'purple';
      }
    }

    @page { margin: 0.75in 0.75in 1in; }
  }

`;

export default BaseStyles;
