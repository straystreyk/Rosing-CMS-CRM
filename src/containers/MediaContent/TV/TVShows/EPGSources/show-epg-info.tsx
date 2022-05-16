import * as React from "react";
import { useFormState } from "react-final-form";
import { makeStyles } from "@material-ui/core";
import { GroupInputsOrigin } from "../../../../../components/GroupInputs";
import { labelStyles } from "../../../../../components/Inputs/styles";

const useStyles = makeStyles({
  Label: {
    ...labelStyles,
  },
  Input: {
    marginBottom: 8,
    paddingTop: 8,
    paddingBottom: 8,
    borderBottom: "1px solid var(--secondary-color-disable)",
    "& .value": {
      color: "var(--primary-text-default)",
      marginTop: 4,
    },
  },
});

const ShowInput: React.FC<{ label: string; value: string }> = ({ label, value }) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.Input}>
        <label className={classes.Label}>{label}</label>
        <div className="value">
          <p>{value}</p>
        </div>
      </div>
    </div>
  );
};

export const ShowEpgInfo: React.FC<{ inputType: "create" | "edit" | "show" }> = ({ inputType }) => {
  const { values } = useFormState();
  const classes = useStyles();

  if (inputType !== "show") return null;

  return (
    <>
      <GroupInputsOrigin label="Result of the last import" inputType="show">
        <ShowInput label="Import status" value={values.importStatus} />
        <ShowInput
          label="Events in the TV program"
          value={`For the week: ${values.countCurrentWeekProgramEvents}/ Total: 
              ${values.countProgramEvents}`}
        />
        <ShowInput
          label="Serialized events"
          value={`For the week: ${values.countCurrentWeekSerializedProgramEvents}/ Total: 
              ${values.countSerializedProgramEvents}`}
        />
      </GroupInputsOrigin>
    </>
  );
};
