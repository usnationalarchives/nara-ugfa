import React, { Fragment, useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { useHistory } from "react-router-dom";
import { Get } from "react-axios";
import { startCase } from "lodash";

// components
import RelatedContentAlert from "./RelatedContentAlert";
import Button from "./Button";
import PlusCircle from "./PlusCircle";

// API
import { createGuide, addDescriptions } from "#api/internal/guide";

// styles
import { fl_static, fl_attention } from "#styles/frontline";
import { buttonReset } from "#styles/mixins";

export const Root = styled.div`
  position: relative;
`;

export const CreateGuide = styled.button`
  ${buttonReset}
  display: block;

  ${fl_static(css`
    color: ${(props) => props.theme.colors.blue};
    font-size: 1em;
    font-weight: bold;
    text-decoration: none;
    margin-botton: 0;
  `)}
  ${fl_attention(css`
    text-decoration: underline;
  `)}
`;

export const GuideList = styled.ul`
  border-bottom: 1px solid ${(props) => props.theme.colors.mediumGrey};
  margin: 0 0 15px;
`;

export const GuideTitle = styled.p`
  color: ${(props) => props.theme.colors.blue};
  font-size: 0.9rem;
  font-weight: bold;
  text-decoration: none;
  margin-bottom: 0;
  margin-top: 5px;
`;

export const GuideMeta = styled.p`
  font-size: 0.8rem;
  color: #888888;
`;

export const AddOptions = styled.span`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  -moz-box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  font-size: 0.9em;
  left: 0;
  padding: 20px;
  position: absolute;
  text-align: left !important;
  text-transform: none;
  top: -20px;
  width: 250px;
  z-index: 100;

  @media all and ${(props) => props.theme.breakpoints.medium} {
    left: -100px !important;
  }

  ${(props) =>
    props.menuPositionRight &&
    css`
      @media all and ${(props) => props.theme.breakpoints.medium} {
        right: -80px !important;
        left: initial !important;
      }
    `}

  li {
    padding-bottom: 15px;
  }
`;

export const Guide = styled.button`
  ${buttonReset}
  text-align: left;
  line-height: 1.4;
`;

const AddToGuideButton = ({
  menuPosition,
  descriptionIds,
  guides,
  setGuides,
  context,
  text = "Add to Guide",
}) => {
  const [addOptionsVisible, setAddOptionsVisible] = useState();
  const wrapperRef = useRef(null);
  const history = useHistory();

  const toggleAddOptions = () => {
    setAddOptionsVisible(!addOptionsVisible);
  };

  const clickedOut = (event) => {
    event.preventDefault;
    if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
      setAddOptionsVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", clickedOut, false);
    return () => {
      document.removeEventListener("mousedown", clickedOut, false);
    };
  }, []);

  const handleCreateGuide = () => {
    createGuide({
      guide_sections_attributes: [
        {
          description_ids: descriptionIds,
        },
      ],
    })
      .then((response) => {
        const id = response.data.data.id;
        history.push(`/guides/${id}/edit`);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleAddToGuide = (id) => {
    addDescriptions(id, descriptionIds)
      .then((response) => {
        const newGuide = {
          guide_id: response.data.data.id,
          guide_title: response.data.data.attributes.title,
          status: response.data.data.attributes.status,
          updated: response.data.data.attributes.updated,
        };
        setAddOptionsVisible(false);
        setGuides([...guides, newGuide]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Root>
      <Button scheme="green-plus" onClick={toggleAddOptions}>
        {text}
        <PlusCircle />
      </Button>

      {addOptionsVisible && (
        <AddOptions
          menuPositionRight={menuPosition === "right"}
          ref={wrapperRef}
        >
          <Get url="/current-user">
            {(error, response, isLoading) => {
              if (response) {
                return (
                  <Fragment>
                    {response.data.included && (
                      <GuideList>
                        {response.data.included
                          .filter((i) => i.type === "guides")
                          .map((guide) => (
                            <li key={guide.id}>
                              <Guide
                                disabled={
                                  context !== "addAll" &&
                                  guides
                                    .map((g) => parseInt(g.guide_id))
                                    .includes(parseInt(guide.id))
                                }
                                onClick={() => handleAddToGuide(guide.id)}
                              >
                                <GuideTitle>
                                  {guide.attributes.title || "Untitled Guide"}
                                </GuideTitle>
                                <GuideMeta>
                                  {startCase(guide.attributes.status)} | Last
                                  Edited on {guide.attributes.updated}
                                </GuideMeta>
                              </Guide>
                            </li>
                          ))}
                      </GuideList>
                    )}
                    <CreateGuide onClick={(event) => handleCreateGuide()}>
                      Add to a New Guide
                    </CreateGuide>
                  </Fragment>
                );
              }

              return null;
            }}
          </Get>
        </AddOptions>
      )}

      {/* <RelatedContentAlert
          title="Miscellaneous, Staff and Stringer Photographs, 1961-1974"
          link="/"
        /> */}
    </Root>
  );
};

export default AddToGuideButton;
