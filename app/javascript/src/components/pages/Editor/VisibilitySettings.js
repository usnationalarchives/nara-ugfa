import React, { useState, useContext, useRef } from "react";
import styled from "styled-components";
import Popover from "react-tiny-popover";

// API
import { updateGuide } from "#api/internal/guide";

// contexts
import { EditorContext } from "#contexts/Editor";

// components
import Button from "#components/shared/Button";
import Select from "#components/shared/Select";

const StyledButton = styled(Button)`
  border: 0;
  margin-left: 20px;
`;

const Label = styled.label`
  display: block;
  font-weight: bold;
  margin-bottom: 8px;
`;

const Notice = styled.p`
  color: ${(props) => props.theme.colors.textLightGrey};
  font-size: 12px;
  line-height: 1.5;
  padding-top: 20px;
  text-align: left;
`;

const SettingsWrapper = styled.div`
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.mediumGrey};
  border-radius: 10px;
  box-shadow: 0px 0px 17px 2px rgba(0, 0, 0, 0.2);
  padding: 15px;
  display: flex;
  flex-wrap: wrap;
  width: 235px;
`;

const VisibilitySettings = ({ guide }) => {
  const [status, setStatus] = useState(guide.data.attributes.status);
  const editorContext = useContext(EditorContext);
  const [open, setOpen] = useState(false);
  const popoverEl = useRef();

  const handleChange = (property, value) => {
    updateGuide(guide.data.id, {
      [property]: value,
    }).then((response) => {
      setStatus(response.data.data.attributes.status);
      editorContext.actions.setLastSaved(
        response.data.data.attributes.updatedAgo
      );
    });
  };

  const PopoverContent = () => {
    return (
      <SettingsWrapper>
        <Label htmlFor="publishing_status">Visibility Settings</Label>
        <Select
          style={{ width: "100%" }}
          id="publishing_status"
          defaultValue={status}
          onChange={(event) => handleChange("status", event.target.value)}
        >
          <option value="draft">Private</option>
          <option value="published">Public</option>
        </Select>
        <Notice>
          Privately published guides are only accessible to you, your
          collaborators, and users you share your guide with. Publicly published
          guides will be visible in the NARA Catalog once a NARA archivist has
          reviewed and approved your guide. Your guide will automatically be
          sent to NARA for review when you set it to public.
        </Notice>
      </SettingsWrapper>
    );
  };

  return (
    <Popover
      isOpen={open}
      position={["top", "right"]}
      disableReposition
      onClickOutside={() => setOpen(false)}
      contentLocation={{ top: -245, left: -100 }}
      content={<PopoverContent />}
      contentDestination={popoverEl.current}
      containerStyle={{ overflow: "visible", zIndex: "100" }}
    >
      <div style={{ position: "relative", display: "inline-block" }}>
        <StyledButton scheme="green" onClick={() => setOpen(!open)}>
          Publish
        </StyledButton>
        <div ref={popoverEl}></div>
      </div>
    </Popover>
  );
};

export default VisibilitySettings;
