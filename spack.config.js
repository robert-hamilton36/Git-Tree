const { config } = require("@swc/core/spack");

module.exports = config({
  entry: {
    ['content-script']: __dirname + "/src/content-script.tsx",
  },
  output: {
    path: __dirname
  },
  module: {},
  options: {
    sourceMaps: true
  }
});