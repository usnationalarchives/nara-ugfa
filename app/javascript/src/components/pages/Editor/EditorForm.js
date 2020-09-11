import React from "react";
import { debounce } from "lodash";

// API
import { updateGuide } from "#api/internal/guide";

// components
import Select from "#components/shared/Select";
import BackgroundColor from "./BackgroundColor";
import AudienceSelect from "./AudienceSelect";

const EditorForm = ({ guide }) => {
  const handleChange = debounce((property, value) => {
    updateGuide(guide.data.id, {
      [property]: value,
    });
  }, 300);

  return (
    <div>
      <div style={{ marginBottom: "20px" }}>
        <label htmlFor="title">Title</label>
        <br />
        <input
          id="title"
          defaultValue={guide.data.attributes.title}
          type="text"
          onChange={(event) => handleChange("title", event.target.value)}
        />
      </div>

      <BackgroundColor guide={guide} />

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <label htmlFor="about">What is your guide to records about?</label>
        <textarea
          id="about"
          rows="6"
          defaultValue={guide.data.attributes.about}
          onChange={(event) => handleChange("about", event.target.value)}
        />
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <label htmlFor="purpose">
          Why did you create your guide to records?
        </label>
        <textarea
          id="purpose"
          rows="6"
          defaultValue={guide.data.attributes.purpose}
          onChange={(event) => handleChange("purpose", event.target.value)}
        />
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <label htmlFor="looking_for_collaborators">
          Are you looking for collaborators from the Catalog / History Hub
          community to help with your guide to records? If you are seeking help
          on a guide, you can indicate that so other users of the Catalog or
          History Hub can request to participate in updating the guide.
        </label>
        <br />
        <Select
          id="looking_for_collaborators"
          defaultValue={guide.data.attributes.looking_for_collaborators}
          onChange={(event) =>
            handleChange("looking_for_collaborators", event.target.value)
          }
        >
          <option value="no">No</option>
          <option value="yes">Yes</option>
        </Select>
      </div>

      <AudienceSelect guide={guide} />

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <label htmlFor="looking_for_collaborators">
          Is your guide to records complete or in progress?
        </label>
        <br />
        <Select
          id="complete_or_wip"
          defaultValue={guide.data.attributes.complete_or_wip}
          onChange={(event) =>
            handleChange("complete_or_wip", event.target.value)
          }
        >
          <option value="wip">In Progress</option>
          <option value="complete">Complete</option>
        </Select>
      </div>

      <div style={{ marginTop: "20px", marginBottom: "20px" }}>
        <label htmlFor="publishing_status">Publishing Status</label>
        <br />
        <Select
          id="publishing_status"
          defaultValue={guide.data.attributes.status}
          onChange={(event) => handleChange("status", event.target.value)}
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </Select>
      </div>
    </div>
  );
};

export default EditorForm;
