export const getGraphQlEndpoints = () => {
  return {
    http: window._GLOBALS_.REACT_APP_GRAPH_QL_ENDPOINT,
    ws: "ws://192.168.34.0:3000/cable",
  };
};
