import React from "react";
import styled from "styled-components";

// components
import * as Text from "#components/shared/Text";
import * as Layout from "#components/shared/Layout";
import NavBar from "#components/shared/NavBar";
import Banner from "./Banner";
import PageWrapper from "#components/shared/PageWrapper";
import Button from "#components/shared/Button";

// assets
import ImageTwo from "#assets/images/getting-started-2.png";
import ImageThree from "#assets/images/getting-started-3.png";
import ImageFour from "#assets/images/getting-started-4.png";
import ImageFive from "#assets/images/getting-started-5.png";

export const Root = styled.div``;

const Separator = styled.div`
  background-color: ${(props) => props.theme.colors.mediumGrey};
  height: 1px;
  margin: 40px 0 20px !important;
  width: 100%;
`;

const NumberedList = styled.ol`
  margin: 0 0 1.5em;
  padding: 0;
  counter-reset: item;

  & > li {
    margin: 0;
    padding: 0 0 1em 2em;
    text-indent: -2em;
    list-style-type: none;
    counter-increment: item;
  }

  & > li:before {
    display: inline-block;
    width: 1em;
    padding-right: 0.5em;
    font-weight: bold;
    text-align: right;
    content: counter(item) ".";
  }
  
`;

const VisualAid = styled.img`
  margin-bottom: 1rem;
  margin-top: 1rem;
  width: 100%;

  &.--right-aligned {

    @media all and (min-width: 700px) {
      float: right;
      padding-left: 1em;
      width: 65%;
    }
  }
`;


const GettingStarted = () => {
  return (
    <Root>
      <NavBar/>
      <Banner/>
        <Layout.Padding>
          <Layout.Wrapper narrow>
            <PageWrapper>
              <Text.Rich>
                <Text.H2>About this Research Tool</Text.H2>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <Text.H3>How to Create Your First Guide to Records</Text.H3>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <VisualAid
                  src={ImageTwo}
                  alt=""
                  aria-hidden="true"
                  role="presentation"
                />

                <Text.H3>How to Add Content to Your Guide to Records</Text.H3>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <VisualAid
                  src={ImageThree}
                  alt=""
                  aria-hidden="true"
                  role="presentation"
                />

                <Text.H3>How to Work with Archival Hierarchy</Text.H3>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <VisualAid
                  src={ImageFour}
                  alt=""
                  aria-hidden="true"
                  role="presentation"
                />

                <Text.H3>How to Save, Publish, and Share Your Guide to Records</Text.H3>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <Separator/>
                <Text.H2>Components of a Successful Guide to Records</Text.H2>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <VisualAid
                  className="--right-aligned"
                  src={ImageFive}
                  alt=""
                  aria-hidden="true"
                  role="presentation"
                />

                <NumberedList>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, xcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                  <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                  <li>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
                  <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                  <li>Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</li>
                  <li>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, xcepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</li>
                </NumberedList>

                <Separator />
                <Text.H2>FAQs</Text.H2>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <Text.H3>What is the different between 'My List' and 'My Guide to Records'?</Text.H3>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in.</p>

                <Text.H3>Who will be able to see my guide to records when they are published?</Text.H3>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                
                <Text.H3>What is the difference between series, file units, and items?</Text.H3>

                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <Separator />
                <Text.H2>Can't Find Your Answer?</Text.H2>
                
                <p>Ask an expert on History Hub eur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>

                <Button scheme="green">Ask on History Hub</Button>

              </Text.Rich>
            </PageWrapper>
          </Layout.Wrapper>
        </Layout.Padding>
    </Root>
  );
};

export default GettingStarted;
