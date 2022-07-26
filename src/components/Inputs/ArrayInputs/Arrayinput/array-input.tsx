import * as React from "react";
import { ArrayInput as ArrayInputRA } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { FieldArray } from "react-final-form-arrays";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

import {
  ArrowIconDown,
  ArrowIconUp,
  DeleteIcon,
  HideIcon,
  PlusIcon,
} from "../../../../constants/icons";
import { useForm } from "react-final-form";
import { SelectButton } from "../../../UI/Buttons/select-button";
import { StandardButton } from "../../../UI/Buttons/StandardButton/standard-button";
import { ArrayInputShow } from "./show-view";
import { InputProps } from "../../input-types";
import { DocumentNode } from "graphql";
import cn from "classnames";

export interface ArrayInputProps extends InputProps {
  children?: any;
  getItemLabel?: () => string;
  addReorder?: boolean;
  draggable?: boolean;
  itemClass?: string;
  inputClass?: string;
  ChildComponent: any;
  resettable?: boolean;
  query?: DocumentNode;
  initialPushObject?: {};
}

const useStyles = makeStyles((theme) => ({
  GroupInputsLabel: {
    fontSize: 14,
    fontFamily: "var(--font-family)",
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
    fontFamily: "var(--font-family)",
    fontSize: 12,
    color: "var(--secondary-color-default)",
    lineHeight: "16px",
  },
  DeleteButton: {
    color: "#D21C1C",
  },
  ArrayInputTopButtons: {
    display: "flex",
    justifyContent: "flex-end",
    "& + div": {
      width: "100%",
    },
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
  AddButtonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  ArrayInput: {
    "& .MuiFormControl-root": {
      width: "100%",
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
                <ArrowIconUp />
              </button>
            )}
            {fieldProps.fields.length && index !== fieldProps.fields.length - 1 && (
              <button onClick={(e) => reorder(e, fieldProps, index, index + 1, source)}>
                <ArrowIconDown />
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
    initialPushObject,
    inputClass,
    query,
    ChildComponent,
    ...props
  }) => {
    const classes = useStyles();
    const [show, setShow] = React.useState(inputType === "create");
    const form = useForm();

    const onDragEnd = React.useCallback(
      (result: any, provided: unknown) => {
        const item = form.getState().values[source][result.source.index];
        const newArray = form
          .getState()
          .values[source].filter((el: unknown, index: number) => index !== result.source.index);
        newArray.splice(result.destination.index, 0, item);
        form.change(
          source,
          newArray.map((el: { position: number }, index: number) => ({ ...el, position: index }))
        );
      },
      [form, source]
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
      <div className={cn(classes.ArrayInput, inputClass && inputClass)}>
        {label && (
          <span className={classes.GroupInputsLabel}>
            <span>{label}</span>
          </span>
        )}
        {helperText && <p className={classes.GroupHelperText}>{helperText}</p>}
        {form.getState().values[source] && form.getState().values[source].length ? (
          <div className={classes.ArrayInputTopButtons}>
            <StandardButton
              type="button"
              variant="text"
              buttonType="secondary"
              startIcon={<HideIcon />}
              onClick={() => setShow((p) => !p)}
              text={show ? "Hide all" : "Show all"}
            />
          </div>
        ) : null}
        <ArrayInputRA {...props} source={source} resource={resource} label="">
          <FieldArray name={source}>
            {(fieldProps) => {
              const pushResource = (value?: string, name?: string) => {
                const initial = initialPushObject ?? undefined;
                fieldProps.fields.push(
                  addReorder || draggable
                    ? {
                        position: form.getState().values[source]
                          ? form.getState().values[source].length
                          : 0,
                        role: value,
                      }
                    : initial
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
                                    {/* this one only needs in dev mode
                                      remove the react dnd err
                                    */}
                                    <div
                                      {...(!draggable && provided.dragHandleProps)}
                                      style={{ display: "none" }}
                                    ></div>
                                    {/* */}
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
                                      <ChildComponent
                                        parentSourceWithIndex={`${source}[${index}]`}
                                        parentSource={source}
                                        resource={resource}
                                        inputType={inputType}
                                        show={show}
                                        index={index.toString()}
                                      />
                                    </div>
                                    <div className={classes.ArrayInputButtonsWrapper}>
                                      <StandardButton
                                        type="button"
                                        variant="icon"
                                        buttonType="additional-red"
                                        startIcon={<DeleteIcon />}
                                        onClick={() => fieldProps.fields.remove(index)}
                                        text="Delete"
                                      />
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {provided.placeholder}
                          <div className={classes.AddButtonWrapper}>
                            {query ? (
                              <SelectButton
                                query={query}
                                name="roleName"
                                value="roleName"
                                pushResource={pushResource}
                                label="Add another role"
                              />
                            ) : (
                              <StandardButton
                                startIcon={<PlusIcon />}
                                type="button"
                                onClick={(e) => pushResource()}
                                variant="text"
                                buttonType="primary"
                                text="Add another one"
                              />
                            )}
                          </div>
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

export const ArrayInput: React.FC<ArrayInputProps> = React.memo(({ inputType, ...props }) => {
  return inputType === "show" ? (
    <ArrayInputShow
      source={props.source}
      resource={props.resource}
      inputType={inputType}
      ChildComponent={props.ChildComponent}
      itemClass={props.itemClass}
      query={props.query}
      draggable
    />
  ) : (
    <ArrayInputOrigin inputType={inputType} {...props} />
  );
});
