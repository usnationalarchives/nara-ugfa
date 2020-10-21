import React from "react";
import styled from "styled-components";

const Root = styled.div`
  height: calc(100vh - 100px);
  position: relative;
`;

const Inner = styled.div`
  @keyframes loadspin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  animation: loadspin 1s linear infinite;
  height: 98px;
  left: calc(50% - 49px);
  position: absolute;
  top: calc(50% - 49px);
  transition: 300ms;
  width: 98px;

  svg {
    display: block;
  }
`;

const PageLoader = () => {
  return (
    <Root>
      <Inner>
        <svg
          width="98px"
          height="98px"
          viewBox="0 0 98 98"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
            <g transform="translate(3.000000, 3.000000)" strokeWidth="3">
              <circle
                id="Oval-Copy"
                stroke="#E6ECF3"
                cx="46"
                cy="46"
                r="46"
              ></circle>
              <path
                d="M28.7975511,88.6754941 C34.1116252,90.8196378 39.9179684,92 46,92 C71.4050985,92 92,71.4050985 92,46 C92,20.5949015 71.4050985,0 46,0"
                id="Path"
                stroke="#345D96"
              ></path>
            </g>
          </g>
        </svg>
      </Inner>
    </Root>
  );
};

export default PageLoader;
