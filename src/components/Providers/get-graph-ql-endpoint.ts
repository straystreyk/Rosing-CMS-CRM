export const getGraphQlEndpoints = () => {
  return {
    http: window._GLOBALS_.REACT_APP_GRAPH_QL_ENDPOINT,
    ws: window._GLOBALS_.REACT_APP_GRAPH_QL_WS_ENDPOINT,
  };
};
