const path = require("path");

module.exports = {
  resolve: {
    alias: {
      "#": path.resolve(__dirname, "..", "..", "app/javascript/src"),
      "#hooks": path.resolve(__dirname, "..", "..", "app/javascript/src/hooks"),
      "#api": path.resolve(__dirname, "..", "..", "app/javascript/src/api"),
      "#contexts": path.resolve(
        __dirname,
        "..",
        "..",
        "app/javascript/src/contexts"
      ),
      "#styles": path.resolve(
        __dirname,
        "..",
        "..",
        "app/javascript/src/styles"
      ),
      "#assets": path.resolve(
        __dirname,
        "..",
        "..",
        "app/javascript/src/assets"
      ),
      "#modules": path.resolve(
        __dirname,
        "..",
        "..",
        "app/javascript/src/modules"
      ),
      "#components": path.resolve(
        __dirname,
        "..",
        "..",
        "app/javascript/src/components"
      ),
    },
  },
};
