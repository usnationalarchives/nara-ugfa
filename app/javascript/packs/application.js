import "babel-polyfill";

// Detect input method in order to hide outlines in an accessible manner
// https://github.com/ten1seven/what-input
import "what-input";

// Threespot's CSS Reset
import "frontline-css-reset";

// Webfonts
import "../src/assets/fonts/fonts.css";

import React from "react";
import ReactDOM from "react-dom";
import App from "#/App";

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
