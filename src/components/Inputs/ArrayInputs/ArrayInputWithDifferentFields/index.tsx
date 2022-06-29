import * as React from "react";
import { FieldArray } from "react-final-form-arrays";
import { StandardButton } from "../../../UI/Buttons/StandardButton/standard-button";
import { ArrayInputItemArrow, DeleteIcon, PlusIcon } from "../../../../constants/icons";
import { ComponentArrayInputType, InputProps } from "../../input-types";
import { Collapse, makeStyles } from "@material-ui/core";
import { GroupInputsV2Props } from "../../../GroupInputs/group-inputs-v2";

interface ArrayInputWithDifferentFieldsProps extends InputProps {
  buttonText: string;
  component: React.FC<ComponentArrayInputType>;
  notArrayField?: React.FC<InputProps>;
  componentWrapper?: React.FC<GroupInputsV2Props>;
  componentWrapperTitle?: string;
  headerTitle: string;
}

const useStyles = makeStyles({
  ArrayInputWithDifferentFields: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    border: "1px dashed var(--secondary-color-default)",
    borderRadius: 4,
    padding: "12px 24px",
    margin: "8px 0",
  },
  ArrayInputHeader: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    "& .title": {
      fontSize: 16,
      color: "car(--secondary-color-main)",
      fontWeight: 600,
    },
    "& .icon": {
      width: 8,
      marginLeft: 8,
      verticalAlign: "middle",
    },
  },
  Item: {
    width: "100%",
    position: "relative",
  },
  Centered: {
    display: "flex",
    justifyContent: "center",
    width: "100%",
    margin: "8px 0",
  },
  DeleteButton: {
    position: "absolute",
    top: 8,
    right: 24,
  },
});

const ArrayInputHeader: React.FC<{ title: string; onClick?: (e: React.MouseEvent) => void }> = ({
  title,
  onClick,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.ArrayInputHeader}>
      <button onClick={onClick} className="title">
        {title} <ArrayInputItemArrow className="icon" />
      </button>
    </div>
  );
};

export const ArrayInputWithDifferentFields: React.FC<ArrayInputWithDifferentFieldsProps> = ({
  source,
  buttonText,
  resource,
  headerTitle,
  componentWrapperTitle,
  component: Component,
  inputType,
  notArrayField: NotArrayField,
  componentWrapper: ComponentWrapper,
}) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(true);

  const showChildren = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow((p) => !p);
  };

  return (
    <FieldArray name={source}>
      {({ fields }) => (
        <div className={classes.ArrayInputWithDifferentFields}>
          <ArrayInputHeader title={headerTitle} onClick={showChildren} />
          <Collapse style={{ width: "100%" }} in={show} timeout="auto">
            {NotArrayField && (
              <NotArrayField resource={resource} inputType={inputType} source={source} />
            )}
            {fields.map((name, index) => {
              return (
                <React.Fragment key={index}>
                  <div className={classes.Item} key={name + index}>
                    {ComponentWrapper ? (
                      <ComponentWrapper title={componentWrapperTitle}>
                        <Component
                          parentSourceWithIndex={name}
                          parentSource={source}
                          index={index}
                          resource={resource}
                          inputType={inputType}
                          source={source}
                        />
                      </ComponentWrapper>
                    ) : (
                      <Component
                        parentSourceWithIndex={name}
                        parentSource={source}
                        index={index}
                        resource={resource}
                        inputType={inputType}
                        source={source}
                      />
                    )}
                    <StandardButton
                      buttonType="additional-red"
                      variant="text"
                      startIcon={<DeleteIcon />}
                      text="Delete"
                      className={classes.DeleteButton}
                      onClick={() => {
                        fields.remove(index);
                      }}
                    />
                  </div>
                  {fields.length && fields.length >= 2 && index === 0 && (
                    <div className={classes.Centered}>
                      <StandardButton
                        buttonType="primary"
                        variant="text"
                        startIcon={<PlusIcon />}
                        text={buttonText}
                        onClick={() => fields.push(undefined)}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
            {fields.length && fields.length > 1 ? null : (
              <div className={classes.Centered}>
                <StandardButton
                  buttonType="primary"
                  variant="text"
                  startIcon={<PlusIcon />}
                  text={buttonText}
                  onClick={() => fields.push(undefined)}
                />
              </div>
            )}
          </Collapse>
        </div>
      )}
    </FieldArray>
  );
};
