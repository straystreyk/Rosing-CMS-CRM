import * as React from "react";
import { ArrayInput as ArrayInputRA } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { FieldArray } from "react-final-form-arrays";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

import {
  ArrayInputIconDown,
  ArrayInputIconUp,
  DeleteIcon,
  HideIcon,
} from "../../../../constants/icons";
import { useForm, useFormState } from "react-final-form";
import { SelectButton } from "../../../UI/Buttons/select-button";
import { ALL_ROLES } from "../../../Providers/custom-requests";
import { StandardButton } from "../../../UI/Buttons/standard-button";
import { ArrayInputShow } from "./show-view";
import { CastMembers } from "../../../Models/CastMembers/cast-members";

export interface ArrayInputProps {
  source: string;
  resource: string;
  label?: string;
  helperText?: string;
  children?: any;
  getItemLabel?: () => string;
  inputType: string;
  addReorder?: boolean;
  draggable?: boolean;
  itemClass?: string;
  childcomponent: any;
  resettable?: boolean;
}

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
    color: "#D21C1C",
  },
  ArrayInputTopButtons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  ArrayInputButtonsWrapper: {
    display: "flex",
    alignItems: "center",
    marginTop: 10,
    "& button": {
      marginRight: 10,
    },
  },
  ItemHeader: {
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      cursor: "pointer",
    },
    "& .dragHandle": {
      position: "absolute",
      top: 0,
      right: 0,
    },
  },
  ReorderIcons: {
    position: "absolute",
    right: 27,
  },
  ArrayInputItem: {
    marginTop: 16,
    "&:first-child": {
      marginTop: 0,
    },
  },
}));

const ArrayInputHeader: React.FC<{
  index: number;
  fieldProps: any;
  addReorder: boolean;
  source: string;
  reorder: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    fieldProps: any,
    index: number,
    reorderIndex: number,
    source: string
  ) => void;
}> = ({ addReorder, fieldProps, index, source, reorder }) => {
  const classes = useStyles();
  return (
    <>
      <div className={classes.ItemHeader}>
        {addReorder && (
          <div className={classes.ReorderIcons}>
            {index !== 0 && (
              <button onClick={(e) => reorder(e, fieldProps, index, index - 1, source)}>
                <ArrayInputIconUp />
              </button>
            )}
            {fieldProps.fields.length && index !== fieldProps.fields.length - 1 && (
              <button onClick={(e) => reorder(e, fieldProps, index, index + 1, source)}>
                <ArrayInputIconDown />
              </button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export const ArrayInputOrigin: React.FC<ArrayInputProps> = React.memo(
  ({
    children,
    source,
    resource,
    label,
    helperText,
    getItemLabel,
    inputType,
    addReorder,
    draggable,
    itemClass,
    resettable,
    ...props
  }) => {
    const classes = useStyles();
    const { values } = useFormState();
    const [show, setShow] = React.useState(inputType === "create");
    const form = useForm();

    const onDragEnd = React.useCallback(
      (result: any, provided: unknown) => {
        const item = values[source][result.source.index];
        const newArray = values[source].filter(
          (el: unknown, index: number) => index !== result.source.index
        );
        newArray.splice(result.destination.index, 0, item);
        form.change(
          source,
          newArray.map((el: { position: number }, index: number) => ({ ...el, position: index }))
        );
      },
      [form, source, values]
    );

    const reorder = React.useCallback(
      (
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
        fieldProps: any,
        index: number,
        reorderIndex: number,
        source: string
      ) => {
        e.preventDefault();
        fieldProps.fields.swap(index, reorderIndex);
        form.change(
          source,
          form.getState().values[source].map((el: { position: number }, index: number) => ({
            ...el,
            position: index,
          }))
        );
      },
      [form]
    );

    return (
      <div>
        {label && (
          <span className={classes.GroupInputsLabel}>
            <span>{label}</span>
          </span>
        )}
        {helperText && <p className={classes.GroupHelperText}>{helperText}</p>}
        {values[source] && values[source].length ? (
          <div className={classes.ArrayInputTopButtons}>
            <StandardButton
              type="button"
              color="secondary"
              variant="text"
              startIcon={<HideIcon color="#005AA3" />}
              onClick={() => setShow((p) => !p)}
            >
              {show ? "Hide all" : "Show all"}
            </StandardButton>
          </div>
        ) : null}
        <ArrayInputRA {...props} source={source} resource={resource} label="">
          <FieldArray name={source}>
            {(fieldProps) => {
              const pushResource = (value: string, name: string) => {
                fieldProps.fields.push(
                  addReorder || draggable
                    ? { position: values[source] ? values[source].length : 0, role: value }
                    : undefined
                );
              };
              return (
                <DragDropContext onDragEnd={onDragEnd}>
                  <Droppable droppableId={`droppable-${source}`} type={source}>
                    {(provided, snapshot) => (
                      <>
                        <div ref={provided.innerRef} {...provided.droppableProps}>
                          {fieldProps.fields.map((item, index) => {
                            return (
                              <Draggable key={item} draggableId={item} index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    key={index}
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    className={classes.ArrayInputItem}
                                  >
                                    <div
                                      key={index}
                                      className={itemClass}
                                      {...(draggable && provided.dragHandleProps)}
                                    >
                                      <ArrayInputHeader
                                        index={index}
                                        fieldProps={fieldProps}
                                        addReorder={addReorder ?? false}
                                        reorder={reorder}
                                        source={source}
                                      />
                                      <props.childcomponent
                                        parentSourceWithIndex={`${source}[${index}]`}
                                        parentSource={`${source}`}
                                        resource={resource}
                                        inputType={inputType}
                                        show={show}
                                        index={index.toString()}
                                      />
                                    </div>
                                    <div className={classes.ArrayInputButtonsWrapper}>
                                      <StandardButton
                                        type="button"
                                        variant="text"
                                        startIcon={<DeleteIcon color={"#D21C1C"} />}
                                        onClick={() => fieldProps.fields.remove(index)}
                                        customColor="#D21C1C"
                                      >
                                        Delete
                                      </StandardButton>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                          <SelectButton
                            query={ALL_ROLES}
                            name="roleName"
                            value="roleName"
                            pushResource={pushResource}
                            label="Add another role"
                          />
                        </div>
                      </>
                    )}
                  </Droppable>
                </DragDropContext>
              );
            }}
          </FieldArray>
        </ArrayInputRA>
      </div>
    );
  }
);

export const ArrayInput: React.FC<ArrayInputProps> = ({ inputType, ...props }) => {
  return inputType === "show" ? (
    <ArrayInputShow
      source={props.source}
      resource={props.resource}
      inputType={inputType}
      childcomponent={props.childcomponent}
      itemClass={props.itemClass}
      draggable
    />
  ) : (
    <ArrayInputOrigin inputType={inputType} {...props} />
  );
};
