import React, { Fragment, useState, useRef, useEffect } from "react";
import styled, { css } from "styled-components";
import { Link, useHistory } from "react-router-dom";
import { Get } from "react-axios";
import { startCase } from "lodash";

// components
import RelatedContentAlert from "./RelatedContentAlert";
import Button from "./Button";
import PlusCircle from "./PlusCircle";
import CheckedCircle from "./CheckedCircle";

// API
import { createGuide } from "#api/internal/guide";

// styles
import { fl_static, fl_attention } from "#styles/frontline";
import { buttonReset } from "#styles/mixins";

export const Root = styled.div`
  position: relative;
`;

export const CreateGuide = styled.button`
  ${buttonReset}
  border-top: 1px solid ${(props) => props.theme.colors.mediumGrey};
  display: block;
  padding: 15px 0 0 0;

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

export const GuideList = styled.ul``;

export const GuideTitle = styled.p`
  color: ${(props) => props.theme.colors.blue};
  font-size: 1em;
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

const Guide = styled.button`
  ${buttonReset}
  text-align: left;
  line-height: 1.4;
`;

const AddToGuideButton = ({ added, text, menuPosition, descriptionId }) => {
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
          description_ids: [descriptionId],
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

  const addToGuide = () => {};

  return (
    <Root>
      <Button
        scheme={added ? "blue-check" : "green-plus"}
        onClick={toggleAddOptions}
      >
        {text}
        {added ? <CheckedCircle /> : <PlusCircle />}
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
                    <GuideList>
                      {response.data.included
                        .filter((i) => i.type === "guides")
                        .map((guide) => (
                          <li key={guide.id}>
                            <Guide onClick={addToGuide(guide.id)}>
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
                    <CreateGuide onClick={(event) => handleCreateGuide()}>
                      Create a Guide
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
