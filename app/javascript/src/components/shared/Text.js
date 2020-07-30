import styled from 'styled-components';
import { fl_visuallyHidden } from '#styles/frontline';

export const H1 = styled.h1`
  font-weight: bold;
  font-size: 2rem;
  line-height: 1.18;

  @media ${(props) => props.theme.breakpoints.mediLabelum} {
    font-size: 3rem;
    line-height: 1.2;
  }
`;

export const H2 = styled.h2`
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 1.3;

  @media ${(props) => props.theme.breakpoints.medium} {
    font-size: 2rem;
    line-height: 1.18;
  }
`;

export const H3 = styled.h3`
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.625;

  @media ${(props) => props.theme.breakpoints.medium} {
    font-size: 1.375rem;
    line-height: 1.18;
  }
`;

export const H4 = styled.h4`
  font-weight: bold;
  font-size: 1rem;
  line-height: 1.25;
`;

export const H5 = styled.h5`
  font-weight: bold;
  font-size: 0.9375rem;
  line-height: 1.33;
`;

export const H6 = styled.h6`
  font-weight: normal;
  font-size: 0.8125rem;
  line-height: 1.23;
  text-transform: uppercase;
`;

export const Intro = styled.p`
  font-weight: 200;
  font-size: 1.125rem;
  line-height: 1.55;

  @media ${(props) => props.theme.breakpoints.medium} {
    font-size: 1.375rem;
    line-height: 1.6;
  }
`;

export const Label = styled.p`
  font-size: 0.9rem;
  font-weight: bold;
  line-height: 1.2;
  text-transform: uppercase;
`;

export const Screenreader = styled.span`
  ${fl_visuallyHidden}
`;

export const Rich = styled.div`
  font-size: 1rem;
  line-height: 1.625;

  & > {
    div {
      margin-bottom: 2em;
      margin-top: 2em;

      &:first-child {
        margin-top: 0;
      }

      &:last-child {
        margin-bottom: 0;
      }
    }

    *:first-child {
      margin-top: 0;
    }

    *:last-child {
      margin-bottom: 0;
    }

    p {
      margin-bottom: 1em;

      &:empty {
        display: none !important;
      }
    }

    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
      margin-bottom: 1rem;
      margin-top: 2em;

      &:first-child {
        margin-top: 0;
      }
    }

    h2 + h2,
    h3 + h3,
    h4 + h4,
    h5 + h5,
    h6 + h6,
    h1 + h2,
    h2 + h3,
    h3 + h4,
    h4 + h5,
    h5 + h6 {
      margin-top: 1em;
    }

    // Horz rule
    //---------------------------------
    hr {
      margin: 2em 0;
    }

    // Lists
    //---------------------------------
    ol,
    ul {
      margin-bottom: 1em;
      overflow: hidden; // Prevent custom bullets from overlapping floated elements
      padding-left: fs-rem(30px);

      ul,
      ol {
        margin-bottom: 0;
      }

      li {
        margin-top: 0.5em;

        ol {
          padding-left: fs-rem(27px);
        }

        ul {
          padding-left: fs-rem(20px);
        }

        &:first-child {
          margin-top: 0;
        }

        li:first-child {
          margin-top: 0.5em;
        }

        & > p:last-child {
          margin-bottom: 0;
        }
      }
    }

    ul,
    ol ul {
      list-style: disc;

      ul {
        list-style: circle;
      }
    }

    ol,
    ul ol {
      list-style: decimal;

      ol {
        list-style: lower-alpha;

        ol {
          list-style: lower-roman;
        }
      }
    }

    blockquote {
      font-size: 1.25em;
      font-weight: bold;
      margin: 1.5em auto;
      max-width: 500px;

      & > p:not(:last-child) {
        margin-bottom: 1em;
      }
    }

    table {
      td,
      th {
        font-size: 1em;
      }
    }

    dl {
    }
  }

  b,
  strong {
    font-weight: bold;
  }

  sup {
    font-size: 0.8em;
    left: -1px;
  }

  small {
    display: inline-block;
  }
`;
