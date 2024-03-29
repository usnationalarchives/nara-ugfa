import React, { useState, useRef } from "react";
import styled, { css } from "styled-components";
import Popover from "react-tiny-popover";

// components
import * as Text from "#components/shared/Text";

// modules
import backgroundColors from "#modules/backgroundColors";

// styles
import { buttonReset } from "#styles/mixins";
import { fl_visuallyHidden, fl_attention } from "#styles/frontline";

// assets
import Check from "#assets/icons/check.svg";

const Radio = styled.input`
  ${fl_visuallyHidden}

  + label {
    display: block;
    width: 30px;
    height: 30px;
    border-radius: 100%;
    border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  }

  ${fl_attention(css`
    + label {
      border-color: ${(props) => props.theme.colors.blue};
    }
  `)}
`;

const StyledCheck = styled(Check)`
  height: 30px;
  padding: 8px 7px;
  width: 30px;

  path {
    stroke: ${(props) => props.stroke};
  }
`;

const StyledButton = styled.button`
  ${buttonReset}

  color: ${(props) => props.buttonColor || props.color};
  display: inline-block;
  font-size: 0.75rem;
  position: relative;
  text-transform: uppercase;
  opacity: 0.75;

  &:after {
    /* don't reorder these border properties */
    border: 5px solid ${(props) => props.buttonColor || props.color};

    border-bottom-color: transparent;
    border-left-color: transparent;
    border-right-color: transparent;

    border-radius: 2px;
    content: "";
    display: inline-block;
    height: 10px;
    overflow: hidden;
    width: 10px;
    vertical-align: middle;
    margin-left: 6px;
  }

  ${(props) =>
    props.disabled &&
    css`
      opacity: 0.5;
    `}
`;

const MenuWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  border-radius: 10px;
  box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  width: 235px;
`;

const MenuItem = styled.div`
  margin: 5px;
`;

const BackgroundColor = ({
  backgroundColor,
  buttonColor,
  textColor,
  handleChange,
  backgroundColorValue,
  backgroundImage,
}) => {
  const [open, setOpen] = useState(false);
  const popoverEl = useRef();

  const PopoverContent = () => {
    return (
      <MenuWrapper data-bg-menu>
        {backgroundColors.map((color) => (
          <MenuItem key={color.value}>
            <Radio
              type="radio"
              id={`background-${color.value}`}
              value={color.value}
              name="background-color"
              onChange={handleChange}
              autoFocus={
                backgroundColorValue === color.value ||
                backgroundColor === color.code
              }
              defaultChecked={
                backgroundColorValue === color.value ||
                backgroundColor === color.code
              }
            />
            <label
              style={{ backgroundColor: color.code }}
              htmlFor={`background-${color.value}`}
            >
              {(backgroundColorValue === color.value ||
                backgroundColor === color.code) && (
                <StyledCheck stroke={textColor} />
              )}
              <Text.Screenreader>{color.name}</Text.Screenreader>
            </label>
          </MenuItem>
        ))}
      </MenuWrapper>
    );
  };

  return (
    <Popover
      isOpen={open}
      position={["bottom", "right"]}
      disableReposition
      onClickOutside={(event) => {
        // dont close when changing colors, only when clicking outside of the popover
        if (!event.target.closest("[data-bg-menu]")) {
          setOpen(false);
        }
      }}
      contentLocation={{ top: 30, left: 0 }}
      content={<PopoverContent />}
      contentDestination={popoverEl.current}
      containerStyle={{ overflow: "visible", zIndex: "100" }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <StyledButton
          type="button"
          color={textColor}
          buttonColor={buttonColor}
          onClick={() => setOpen(!open)}
          disabled={backgroundImage ? true : false}
        >
          Change Background Color
        </StyledButton>
        <div ref={popoverEl}></div>
      </div>
    </Popover>
  );
};

export default BackgroundColor;
