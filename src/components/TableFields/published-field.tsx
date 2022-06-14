import * as React from "react";
import { PublishedIcons, UnPublishedIcons } from "../../constants/icons";
import { Tooltip } from "@material-ui/core";

export const PublishedField: React.FC<{ published: boolean }> = ({ published }) => {
  return (
    <Tooltip placement="left" title={published ? "Published" : "Unpublished"} arrow>
      <button>{published ? <PublishedIcons /> : <UnPublishedIcons />}</button>
    </Tooltip>
  );
};
