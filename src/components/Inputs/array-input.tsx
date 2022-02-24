import * as React from "react";
import { ArrayInput as ArrayInputRA } from "react-admin";
import { Switch } from "../UI/MaterialUI/switch";
import { Button, makeStyles } from "@material-ui/core";
import { FieldArray } from "react-final-form-arrays";
import { Draggable, DragDropContext, Droppable } from "react-beautiful-dnd";

import { ArrayInputIconDown, ArrayInputIconUp, DeleteIcon } from "../../constants/icons";
import { useForm, useFormState } from "react-final-form";
import { CreateIcon } from "../../constants/forms-constants";

interface ArrayInputProps {
  source: string;
  resource: string;
  label?: string;
  helperText?: string;
  switchable?: boolean;
  children?: any;
  getItemLabel?: () => string;
  formType?: string;
  addReorder?: boolean;
  draggable?: boolean;
  itemClass?: string;
  childcomponent: any;
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
  ItemHeader: {
    display: "flex",
    justifyContent: "space-between",
    "& button": {
      cursor: "pointer",
    },
  },
  ReorderIcons: {
    position: "absolute",
    right: 27,
  },
  ArrayInputWrapper: {
    margin: 0,
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

export const ArrayInput: React.FC<ArrayInputProps> = React.memo(
  ({
    children,
    source,
    resource,
    label,
    helperText,
    switchable,
    getItemLabel,
    formType,
    addReorder,
    draggable,
    itemClass,
    ...props
  }) => {
    const [show, setShow] = React.useState(!switchable || formType === "edit");
    const classes = useStyles();
    const { values } = useFormState();
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
      <>
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
          <ArrayInputRA
            {...props}
            source={source}
            className={classes.ArrayInputWrapper}
            resource={resource}
            label=""
          >
            <FieldArray name={source}>
              {(fieldProps) => {
                return (
                  <DragDropContext onDragEnd={onDragEnd}>
                    <Droppable droppableId={`droppable-${source}`} type={source}>
                      {(provided, snapshot) => (
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
                                        resource={resource}
                                        parentSource={`${source}[${index}]`}
                                      />
                                    </div>
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
                                        onClick={() =>
                                          fieldProps.fields.push(
                                            addReorder && draggable
                                              ? { position: index + 1 }
                                              : undefined
                                          )
                                        }
                                        color="secondary"
                                      >
                                        Add another one
                                      </Button>
                                    </div>
                                  </div>
                                )}
                              </Draggable>
                            );
                          })}
                          {!values[source] || values[source].length === 0 ? (
                            <div className={classes.ArrayInputButtonsWrapper}>
                              <Button
                                type="button"
                                startIcon={<CreateIcon color="#005AA3" />}
                                onClick={() =>
                                  fieldProps.fields.push(
                                    addReorder && draggable ? { position: 0 } : undefined
                                  )
                                }
                                color="secondary"
                              >
                                Add another one
                              </Button>
                            </div>
                          ) : null}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>
                  </DragDropContext>
                );
              }}
            </FieldArray>
          </ArrayInputRA>
        )}
      </>
    );
  }
);
