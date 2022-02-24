import { default as RichTextInputDefault } from "ra-input-rich-text";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({});

export const RichTextInput = (props: any) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const classes = useStyles();

  return (
    <RichTextInputDefault {...props} source={props.source} helperText={props.helperText ?? false} />
  );
};
