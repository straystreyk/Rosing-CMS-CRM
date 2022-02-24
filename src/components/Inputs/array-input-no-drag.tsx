import * as React from "react";
import { ArrayInput as ArrayInputRA } from "react-admin";
import { Switch } from "../UI/MaterialUI/switch";
import { Button, makeStyles } from "@material-ui/core";
import { FieldArray } from "react-final-form-arrays";
import { GroupInputs } from "../GroupInputs";
import { DeleteIcon } from "../../constants/icons";
import { useFormState } from "react-final-form";
import { CreateIcon } from "../../constants/forms-constants";

type ArrayInputProps = React.ComponentProps<typeof ArrayInputRA>;

const useStyles = makeStyles((theme) => ({
  GroupInputsLabel: {
    fontSize: 14,
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    lineHeight: "20px",
    display: "inline-block",
    marginBottom: 5,
    marginTop: 8,
    "& > span": {
      marginRight: 5,
    },
  },
  GroupHelperText: {
    fontFamily: "Gilroy, sans-serif",
    fontSize: 12,
    color: "#9FA5A8",
    lineHeight: "16px",
  },
  DeleteButton: {
    color: theme.palette.primary.contrastText,
  },
  ArrayInputButtonsWrapper: {
    display: "flex",
    alignItems: "center",
    "& button": {
      marginRight: 10,
      textTransform: "unset",
      fontFamily: "Gilroy, sans-serif",
      display: "flex",
      alignItems: "center",
    },
  },
}));

export const ArrayInputNoDrag: React.FC<ArrayInputProps> = ({
  children,
  source,
  resource,
  label,
  helperText,
  switchable,
  getItemLabel,
  disableReordering,
  formType,
  groupInputs,
  ...props
}) => {
  const [show, setShow] = React.useState(!switchable || formType === "edit");
  const classes = useStyles();
  const { values } = useFormState();

  return (
    <>
      <span
        style={{ cursor: switchable ? "pointer" : "" }}
        onClick={() => (switchable ? setShow((p: boolean) => !p) : null)}
        className={classes.GroupInputsLabel}
      >
        {label && <span>{label}</span>}
        {switchable && <Switch checked={show} />}
      </span>
      {helperText && <p className={classes.GroupHelperText}>{helperText}</p>}
      {show && (
        <ArrayInputRA {...props} source={source} resource={resource} label="">
          <FieldArray name={source}>
            {(fieldProps) => {
              return (
                <>
                  {fieldProps.fields.map((item, index) => {
                    return (
                      <React.Fragment key={item + index}>
                        {groupInputs ? (
                          <GroupInputs key={index}>
                            {React.Children.map(children, (child) => {
                              return React.cloneElement(child, {
                                source: `${source}[${index}].${child.props.source}`,
                              });
                            })}
                          </GroupInputs>
                        ) : (
                          <React.Fragment key={index}>
                            {React.Children.map(children, (child) => {
                              return React.cloneElement(child, {
                                source: `${source}[${index}].${child.props.source}`,
                              });
                            })}
                          </React.Fragment>
                        )}
                        <div className={classes.ArrayInputButtonsWrapper}>
                          <Button
                            startIcon={<DeleteIcon color={"#D21C1C"} />}
                            className={classes.DeleteButton}
                            type="button"
                            onClick={() => fieldProps.fields.remove(index)}
                          >
                            Delete
                          </Button>
                          <Button
                            type="button"
                            startIcon={<CreateIcon color="#005AA3" />}
                            onClick={() => fieldProps.fields.push(undefined)}
                            color="secondary"
                          >
                            Add another one
                          </Button>
                        </div>
                      </React.Fragment>
                    );
                  })}
                  {!values[source] || values[source].length === 0 ? (
                    <div className={classes.ArrayInputButtonsWrapper}>
                      <Button
                        type="button"
                        startIcon={<CreateIcon color="#005AA3" />}
                        onClick={() => fieldProps.fields.push(undefined)}
                        color="secondary"
                      >
                        Add another one
                      </Button>
                    </div>
                  ) : null}
                </>
              );
            }}
          </FieldArray>
        </ArrayInputRA>
      )}
    </>
  );
};
