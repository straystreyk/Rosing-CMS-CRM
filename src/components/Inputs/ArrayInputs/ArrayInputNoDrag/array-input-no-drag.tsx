import * as React from "react";
import { ArrayInput as ArrayInputRA, ArrayInputProps as ArrayInputPropsRA } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { useFormState } from "react-final-form";
import { FieldArray } from "react-final-form-arrays";

import { ArrayInputNoDragShow } from "./show-view";
import { GroupInputs } from "../../../GroupInputs";
import { Switch } from "../../../UI/Buttons/switch";
import { DeleteIcon, PlusIcon } from "../../../../constants/icons";
import { StandardButton } from "../../../UI/Buttons/StandardButton/standard-button";
import { formHelperText, labelStyles } from "../../styles";
import { InputProps } from "../../input-types";
import cn from "classnames";

export interface ChildComponentProps extends InputProps {
  parentSourceWithIndex: string;
  parenSource: string;
  index: string | number;
}

export interface ChildComponentWithChoices extends ChildComponentProps {
  choices: object[];
}

export interface ArrayInputProps extends Omit<ArrayInputPropsRA, "children"> {
  inputType: "create" | "edit" | "show";
  ChildComponent: React.FC<ChildComponentProps> | React.FC<ChildComponentWithChoices>;
  source: string;
  resource: string;
}

const useStyles = makeStyles((theme) => ({
  GroupInputsLabel: {
    ...labelStyles,
    marginBottom: 8,
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
    "&.first": {
      paddingLeft: 0,
      "& button": {
        padding: "4px 0",
      },
    },
  },
  DeleteButton: {
    "&.text": {
      marginTop: 5,
      padding: "4px 0",
    },
  },
  GroupInputWrapper: {
    "& .GroupInputsItem": {
      marginTop: 8,
    },
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
    ChildComponent,
    ...props
  }) => {
    const [show, setShow] = React.useState(!switchable || ["edit", "show"].includes(inputType));
    const classes = useStyles();
    const { values } = useFormState();
    const current = props.parentSource
      ? values[props.parentSource][props.index][props.standardSource]
      : values[source];

    return (
      <div className={classes.ArrayInputWrapper}>
        {label && (
          <span
            style={{ cursor: switchable ? "pointer" : "" }}
            onClick={() => (switchable ? setShow((p: boolean) => !p) : null)}
            className={classes.GroupInputsLabel}
          >
            <span>{label}</span>
            {switchable && <Switch checked={show} />}
          </span>
        )}
        {helperText && <p className={classes.GroupHelperText}>{helperText}</p>}
        {show && (
          <ArrayInputRA {...props} source={source} resource={resource} label="">
            <FieldArray name={source}>
              {(fieldProps) => {
                console.log(fieldProps);
                return (
                  <>
                    {fieldProps.fields.map((item, index) => {
                      return (
                        <React.Fragment key={item + index}>
                          {groupInputs ? (
                            <GroupInputs
                              className={classes.GroupInputWrapper}
                              resource={resource}
                              source={source}
                              key={index}
                              inputType={inputType}
                              index={index.toString()}
                              onlyCreateView
                            >
                              <ChildComponent
                                resource={resource}
                                inputType={inputType}
                                parenSource={source}
                                index={index}
                                source={source}
                                parentSourceWithIndex={`${source}[${index}]`}
                                choices={props.choices ?? undefined}
                              />
                              <StandardButton
                                startIcon={<DeleteIcon />}
                                type="button"
                                variant="text"
                                buttonType="additional-red"
                                className={classes.DeleteButton}
                                onClick={() => fieldProps.fields.remove(index)}
                                text="Delete"
                              />
                            </GroupInputs>
                          ) : (
                            <>
                              <ChildComponent
                                resource={resource}
                                index={index}
                                source={source}
                                inputType={inputType}
                                parenSource={source}
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
                                buttonType="secondary"
                                startIcon={<PlusIcon />}
                                onClick={() => fieldProps.fields.push(undefined)}
                                text="Add another one"
                              />
                            </div>
                          )}
                        </React.Fragment>
                      );
                    })}
                    {!current || current.length === 0 ? (
                      <div className={cn(classes.ArrayInputButtonsWrapper, "first")}>
                        <StandardButton
                          type="button"
                          variant="text"
                          buttonType="secondary"
                          startIcon={<PlusIcon />}
                          onClick={() => fieldProps.fields.push(initialPushObject ?? undefined)}
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
