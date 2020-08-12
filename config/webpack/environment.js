const { environment } = require("@rails/webpacker");
const customConfig = require("./custom");

environment.loaders.append("svg", {
  test: /\.svg$/,
  use: ["@svgr/webpack"]
})

environment.config.merge(customConfig);

module.exports = environment;
