// This file is automatically compiled by Webpack, along with any other files
// present in this directory. You're encouraged to place your actual application logic in
// a relevant structure within app/javascript and only use these pack files to reference
// that code so it'll be compiled.

// require("@rails/ujs").start()
// require("turbolinks").start()
// require("@rails/activestorage").start()
// require("channels")

// Uncomment to copy all static images under ../images to the output folder and reference
// them with the image_pack_tag helper in views (e.g <%= image_pack_tag 'rails.png' %>)
// or the `imagePath` JavaScript helper below.
//
// const images = require.context('../images', true)
// const imagePath = (name) => images(name, true)

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
