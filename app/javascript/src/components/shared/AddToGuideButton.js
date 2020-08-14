import React, { useState, useEffect } from "react";
import styled, { css } from 'styled-components';
import { Link } from "react-router-dom";

// components
import Button from './Button';
import PlusCircle from './PlusCircle';
import CheckedCircle from "./CheckedCircle";

// styles
import { fl_static } from '#styles/frontline';
import { fl_attention } from '#styles/frontline';

export const Root = styled.div`
  position: relative;
`;

export const CreateGuideLink = styled(Link)`
  border-top: 1px solid ${props => props.theme.colors.mediumGrey};
  display: block;
  padding: 10px 0;

  ${fl_static(css`
    color: ${props => props.theme.colors.blue};
    font-size: 1em;
    font-weight: bold;
    text-decoration: none;
    margin-botton: 0;
    margin-top: 5px;
`)}
  ${fl_attention(css`
    text-decoration: underline;
`)}
`;

export const MyListLink = styled(Link)`
  border-top: 1px solid ${props => props.theme.colors.mediumGrey};
  display: block;
  padding: 10px 0;
  
  ${fl_static(css`
      color: ${props => props.theme.colors.darkGrey};
      font-size: 1em;
      font-weight: bold;
      text-decoration: none;
      margin-botton: 0;
      margin-top: 5px;
  `)}
    ${fl_attention(css`
      text-decoration: underline;
  `)}
`;

export const GuideList = styled.ul`
  a {
    ${fl_static(css`
      color: ${props => props.theme.colors.darkGrey};
      font-size: 1em;
      font-weight: bold;
      text-decoration: none;
      margin-botton: 0;
      margin-top: 5px;
  `)}
    ${fl_attention(css`
      text-decoration: underline;
  `)}
  }
`;

export const AddOptions = styled.span`
  background-color: ${props => props.theme.colors.white};
  border: 1px solid ${props => props.theme.colors.mediumGrey};
  border-radius: 10px;
  -webkit-box-shadow: 0px 0px 17px 2px rgba(0,0,0,0.2);
  -moz-box-shadow: 0px 0px 17px 2px rgba(0,0,0,0.2);
  box-shadow: 0px 0px 17px 2px rgba(0,0,0,0.2);
  display: none;
  font-size: 0.8em;
  left: -50px;
  padding: 20px;
  position: absolute;
  text-align: left !important;
  top: -20px;
  width: 250px;
  z-index: 100;

  ${props =>
    props.addOptionsVisible &&
    css`
    display: block;
  `}

  li {
    padding-bottom: 15px;
  }

  p {
    color: #888;
  }
`;

const AddToGuideButton = ({ added, text }) => {
  const [addOptionsVisible, setAddOptionsVisible] = useState();

  const toggleAddOptions = () => {
    setAddOptionsVisible(!addOptionsVisible);
  }

  const clickedOut = () => {
    setAddOptionsVisible(false);
  }

  useEffect(() => {
    document.addEventListener("mousedown", clickedOut);
    return () => {
      document.removeEventListener("mousedown", clickedOut);
    };
  }, []);

  return (
    <Root>
      <Button scheme={added ? 'blue-check' : 'green-plus'} onClick={toggleAddOptions}>
        {text && text}
        {added ? (<CheckedCircle />) : (<PlusCircle />)}
        {!added &&
          <AddOptions addOptionsVisible={addOptionsVisible}>
            <ul>
              <GuideList>
                <li>
                  <Link to="/">Women's Voting Rights in the 1920s</Link>
                  <p>Draft | Last Edited on July 16, 2020</p>
                </li>
                <li>
                  <Link to="/">The JFK Presidency</Link>
                  <p>Published on Aug 10, 2020 | Public</p>
                </li>
              </GuideList>
              <MyListLink to="/my-list">My List</MyListLink>
              <CreateGuideLink to="research-guide-editor">Create a Guide</CreateGuideLink>
            </ul>
          </AddOptions>}
      </Button>
    </Root>
  );
};

export default AddToGuideButton;
