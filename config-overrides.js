// This file needs for override standard Create React App webpack config
const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
const { getGlobals } = require("./config/get-globals.js");
const globals = getGlobals();

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.ejs$/,
    use: { loader: "ejs-compiled-loader", options: {} },
  });

  config.resolve.extensions.push(".ejs");

  config.plugins = [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "config", "index_template.ejs"),
      filename: path.resolve(__dirname, "build", "index.html"),
      alwaysWriteToDisk: true,
      inject: false,
      templateParameters: async (options) => {
        const js = Object.keys(options.assets)
          .filter((el) => /\.js$/.test(el))
          .map((el) => "/" + el);
        const css = Object.keys(options.assets)
          .filter((el) => /\.css$/.test(el))
          .map((el) => "/" + el);
        return {
          ...options,
          js,
          css,
          globals,
        };
      },
    }),
    ...config.plugins.slice(3, config.plugins.length),
  ];

  config.plugins.push(
    new HtmlWebpackPlugin({
      inject: false,
      minify: false,
      template: path.resolve(__dirname, "config", "render-stats.js"),
      filename: path.resolve(__dirname, "config", "build-stats.json"),
    })
  );

  config.module.rules[1].oneOf = config.module.rules[1].oneOf.slice(
    0,
    config.module.rules[1].oneOf.length - 1
  );

  return config;
};
