import React from "react";

// API
import { updateGuide } from "#api/internal/guide";

const BackgroundColor = ({ guide }) => {
  const handleBackgroundColor = (event) => {
    updateGuide(guide.data.id, {
      background_color: event.target.value,
    });
  };

  return (
    <fieldset>
      <legend>Background Color</legend>
      {colors.map((color) => (
        <div key={color.value}>
          <input
            type="radio"
            id={`background-${color.value}`}
            value={color.value}
            name="background-color"
            onChange={handleBackgroundColor}
            defaultChecked={
              guide.data.attributes.background_color === color.value
            }
          />
          <label htmlFor={`background-${color.value}`}>{color.name}</label>
        </div>
      ))}
    </fieldset>
  );
};

export default BackgroundColor;

const colors = [
  {
    name: "Grey",
    value: "grey",
    code: "#cccccc",
  },
  {
    name: "Dark Grey",
    value: "dark_grey",
    code: "#cccccc",
  },
  {
    name: "Dark Blue",
    value: "dark_blue",
    code: "#cccccc",
  },
  {
    name: "Teal",
    value: "teal",
    code: "#cccccc",
  },
  {
    name: "Green",
    value: "green",
    code: "#cccccc",
  },
  {
    name: "Violet",
    value: "violet",
    code: "#cccccc",
  },
  {
    name: "Magenta",
    value: "magenta",
    code: "#cccccc",
  },
  {
    name: "Red",
    value: "red",
    code: "#cccccc",
  },
  {
    name: "Light Blue",
    value: "light_blue",
    code: "#cccccc",
  },
  {
    name: "Yellow",
    value: "yellow",
    code: "#cccccc",
  },
];
