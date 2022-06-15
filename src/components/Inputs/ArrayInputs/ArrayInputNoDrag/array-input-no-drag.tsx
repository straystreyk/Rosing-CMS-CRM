import * as React from "react";
import cn from "classnames";
import { ArrayInput as ArrayInputRA, ArrayInputProps as ArrayInputPropsRA } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { useFormState } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";

import { ArrayInputNoDragShow } from "./show-view";
import { GroupInputs } from "../../../GroupInputs";
import { Switch } from "../../../UI/MaterialUI/switch";
import { DeleteIcon, PlusIcon } from "../../../../constants/icons";
import { CreateIcon } from "../../../../constants/forms-constants";
import { StandardButton } from "../../../UI/Buttons/standard-button";
import { formHelperText } from "../../styles";

export interface ArrayInputProps extends Omit<ArrayInputPropsRA, "children"> {
  inputType: "create" | "edit" | "show";
  ChildComponent: React.FC<any>;
  source: string;
  resource: string;
}

const useStyles = makeStyles((theme) => ({
  GroupInputsLabel: {
    fontSize: 14,
    fontFamily: "var(--font-family)",
    fontWeight: 500,
    lineHeight: "20px",
    display: "inline-block",
    marginBottom: 4,
    marginTop: 8,
    "& > span": {
      marginRight: 8,
    },
  },
  GroupHelperText: { ...formHelperText, marginTop: 0 },
  ArrayInputWrapper: {
    paddingBottom: 8,
    "& .MuiFormControl-marginNormal": {
      marginTop: 0,
    },
  },
  ArrayInputButtonsWrapper: {
    display: "flex",
    alignItems: "center",
    paddingLeft: 18,
    "& button": {
      textTransform: "unset",
      fontFamily: "var(--font-family)",
      display: "flex",
      alignItems: "center",
      marginRight: 10,
      marginTop: 5,
    },
  },
  DeleteButton: {
    marginTop: 5,
    padding: 0,
  },
}));

export const ArrayInputNoDragOrigin: React.FC<ArrayInputProps> = React.memo(
  ({
    source,
    resource,
    label,
    helperText,
    switchable,
    getItemLabel,
    initialPushObject,
    disableReordering,
    inputType,
    groupInputs,
    ...props
  }) => {
    const [show, setShow] = React.useState(!switchable || ["edit", "show"].includes(inputType));
    const classes = useStyles();
    const { values } = useFormState();
    const { ChildComponent, ...rest } = props;
    const current = props.parentSource
      ? values[props.parentSource][props.index][props.standardSource]
      : values[source];

    return (
      <div className={classes.ArrayInputWrapper}>
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
          <ArrayInputRA {...rest} source={source} resource={resource} label="">
            <FieldArray name={source}>
              {(fieldProps) => {
                return (
                  <>
                    {fieldProps.fields.map((item, index) => {
                      return (
                        <React.Fragment key={item + index}>
                          {groupInputs ? (
                            <GroupInputs
                              resource={resource}
                              source={source}
                              key={index}
                              inputType={inputType}
                              index={index.toString()}
                              onlyCreateView
                            >
                              <props.ChildComponent
                                resource={resource}
                                inputType={inputType}
                                parentSource={source}
                                index={index}
                                parentSourceWithIndex={`${source}[${index}]`}
                                choices={props.choices ?? undefined}
                              />
                              <StandardButton
                                startIcon={<DeleteIcon color="var(--additional-red-default)" />}
                                type="button"
                                variant="text"
                                className={classes.DeleteButton}
                                onClick={() => fieldProps.fields.remove(index)}
                                customColor="var(--additional-red-default)"
                                text="Delete"
                              />
                            </GroupInputs>
                          ) : (
                            <>
                              <props.ChildComponent
                                resource={resource}
                                index={index}
                                inputType={inputType}
                                parentSource={source}
                                parentSourceWithIndex={`${source}[${index}]`}
                                choices={props.choices ?? undefined}
                              />
                            </>
                          )}
                          {fieldProps.fields.length === index + 1 && (
                            <div className={classes.ArrayInputButtonsWrapper}>
                              <StandardButton
                                type="button"
                                variant="text"
                                startIcon={<PlusIcon color="var(--primary-button-default)" />}
                                onClick={() => fieldProps.fields.push(undefined)}
                                color="secondary"
                                text="Add another one"
                              />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                    {!current || current.length === 0 ? (
                      <div className={classes.ArrayInputButtonsWrapper}>
                        <StandardButton
                          type="button"
                          variant="text"
                          startIcon={<PlusIcon color="#005AA3" />}
                          onClick={() => fieldProps.fields.push(initialPushObject ?? undefined)}
                          color="secondary"
                          text="Add another one"
                        />
                      </div>
                    ) : null}
                  </>
                );
              }}
            </FieldArray>
          </ArrayInputRA>
        )}
      </div>
    );
  }
);

export const ArrayInputNoDrag: React.FC<ArrayInputProps> = ({ inputType, ...props }) => {
  return inputType === "show" ? (
    <ArrayInputNoDragShow inputType={inputType} {...props} />
  ) : (
    <ArrayInputNoDragOrigin inputType={inputType} {...props} />
  );
};
