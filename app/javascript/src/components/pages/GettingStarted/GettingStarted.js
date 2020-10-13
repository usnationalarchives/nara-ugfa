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
    text-indent: -1em;
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

                <p>First, login to your NARA Catalog account or create an account here. Once logged in, you may create a new guide in multiple ways depending on your research preferences. From your dashboard, you may create a new guide by clicking on the “Create a Guide” button within the “Guides to Records” menu. </p>

                <p>Alternatively, if you prefer to begin research before creating a guide, head to the Catalog to begin your search as you normally would. When you find a record you would like to add to your guide, simply click the “Add to Guide” button to the right of the record. From the dropdown, click “Create a Guide” to start a new Guide to Records, thereby adding the selected record to that new guide. Once your first guide is created, the name of your new guide will automatically appear in the dropdown menu when you are ready to add more records to the guide.</p>

                <VisualAid
                  src={ImageTwo}
                  alt=""
                  aria-hidden="true"
                  role="presentation"
                />

                <Text.H3>How to Add Content to Your Guide to Records</Text.H3>

                <p>Once your guide has been created, you may continue to add records via the Catalog (as described above) or begin adding records directly from the editing experience of the new guide. The latter will give you automatic control over where records appear within the guide. From the guide editing experience, click the “Add Record” button where you want your new record to appear. Records may be added to any section and between any existing records as desired. You may always reorder the record(s) later. </p>

                <p>In addition to records, you may also add Summaries and Research Highlights to your guide via the “Add Context” button. The Summary content provides an opportunity to share context and overview information on the records that you have added to your guide. Research Highlights give creators the opportunity to highlight key research takeaways and insights with a more prominent design that can be formatted with an optional image. Multiple Summaries and Research Highlights can be added to each section of your guide.</p>

                <VisualAid
                  src={ImageThree}
                  alt=""
                  aria-hidden="true"
                  role="presentation"
                />

                <Text.H3>How to Work with Archival Hierarchy</Text.H3>

                <p>By default, the archival hierarchy will always be displayed above the record name as shown below. Archival hierarchy is how records are organized in NARA’s holdings as well as the NARA Catalog. Each level of the hierarchy links back to that record in the Catalog where the full details may be viewed. Archival hierarchy can be a valuable tool for research and to discover additional content that may be related to your Guide to Records.</p>

                <p>The archival hierarchy may be collapsed individually or globally via the “Collapse Hierarchy” button if desired.</p>

                <VisualAid
                  src={ImageFour}
                  alt=""
                  aria-hidden="true"
                  role="presentation"
                />

                <Text.H3>How to Save, Publish, and Share Your Guide to Records</Text.H3>

                <p>Once a Guide to Records is complete -- or just ready to be shared -- click the “Publish” button at the bottom of the screen. From here, the creator may publish the guide either publicly or privately.</p>

                <NumberedList>
                  <li><strong>Public Guides</strong>: public guides will be submitted to NARA for review. Once approved, the guide will be accessible via the NARA Catalog and Guides to Records listing page.</li>
                  <li><strong>Private Guides</strong>: private guides will remain private and undiscoverable unless the creator or a collaborator actively share a direct link to the published guide.</li>
                </NumberedList>

                <p>To share a direct link to a guide, click the “Share & Collaborate” icon in the bottom right corner of the guide editing experience. All Guides to Records will autosave by default -- no need to manually save research progress.</p>

                <Separator/>
                <Text.H2>Components of a Successful Guide to Records</Text.H2>

                <p>At a minimum, all published Guides to Records must have a title, at least one record, and an assigned topic. However, there are several other key components that are recommended to create a successful and useful guide..</p>

                <VisualAid
                  className="--right-aligned"
                  src={ImageFive}
                  alt=""
                  aria-hidden="true"
                  role="presentation"
                />

                <NumberedList>
                  <li>A descriptive title that captures the topic or topics covered in the Guide to Records. If possible, avoid broad titles like “Civil Rights”; instead use a more specific title that describes the unique focus of the guide (for example, “Women in the Civil Rights and Black Power Movement” or “The March on Washington for Jobs and Freedom”).</li>
                  <li>Adding an optional image to the guide header can be a great way to differentiate your guide and highlight a record from your guide. Images must be selected from records that have already been added to the guide.</li>
                  <li>Although only the first question (What is your guide to records about?) is required, responding to as many background questions as possible is encouraged and will help other users discover and benefit from a guide once it is published.</li>
                  <li>Creating sections in a guide will not only help organize your personal research, it will also help make the guide more intuitive and scannable for other viewers. Sections will be used to create the structure of the table of contents in the published guide.</li>
                </NumberedList>

                <Separator />
                <Text.H2>FAQs</Text.H2>

                <Text.H3>Who will be able to see my Guides to Records when they are published?</Text.H3>

                <p>If a guide is published publicly and approved by a NARA moderator, it will be discoverable via the NARA Catalog and the Guides to Records landing page. If a guide is published privately, only the guide creator and anyone else that has received a share link or has been invited as a collaborator can view the guide. </p>

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
