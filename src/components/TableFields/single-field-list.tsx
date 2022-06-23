import * as React from "react";
import { SingleFieldList as SingleFieldListRA } from "react-admin";
import { SingleFieldListProps } from "ra-ui-materialui/lib/list/SingleFieldList";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  SingleFieldList: {
    margin: 0,
    color: "var(--primary-text-default)",
  },
});

export const SingleFieldList: React.FC<SingleFieldListProps> = (props) => {
  const classes = useStyles();

  return <SingleFieldListRA classes={{ root: classes.SingleFieldList }} {...props} />;
};
