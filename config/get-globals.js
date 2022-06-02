const dotenv = require("dotenv").config();

const getGlobals = () => {
  const processConfig = {};

  if (process.env.REACT_APP_GRAPH_QL_ENDPOINT)
    processConfig.REACT_APP_GRAPH_QL_ENDPOINT = process.env.REACT_APP_GRAPH_QL_ENDPOINT;

  if (process.env.REACT_APP_GRAPH_QL_WS_ENDPOINT)
    processConfig.REACT_APP_GRAPH_QL_WS_ENDPOINT = process.env.REACT_APP_GRAPH_QL_WS_ENDPOINT;

  if (process.env.REACT_APP_IMAGE_ENDPOINT)
    processConfig.REACT_APP_IMAGE_ENDPOINT = process.env.REACT_APP_IMAGE_ENDPOINT;

  return processConfig;
};

module.exports.getGlobals = getGlobals;
