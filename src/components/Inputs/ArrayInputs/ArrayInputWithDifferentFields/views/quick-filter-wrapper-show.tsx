import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { ComponentArrayInputType } from "../../../input-types";
import { useForm } from "react-final-form";
import { GroupInputsOrigin } from "../../../../GroupInputs";
import { SelectInput } from "../../../StandatdInputs/SelectInput/select-input";

const useStyles = makeStyles({
  GroupWrapper: {
    width: "100%",
    marginBottom: 0,
  },
});

export const QuickFilterWrapperShow: React.FC<{
  source: string;
  resource: string;
  component: React.FC<ComponentArrayInputType>;
  label?: string;
}> = React.memo(({ source, resource, component: Component, label }) => {
  const form = useForm();
  const classes = useStyles();

  return (
    <>
      {form.getState().values[source] && form.getState().values[source].length ? (
        <GroupInputsOrigin wrapperClassName={classes.GroupWrapper} label={label} inputType="show">
          <SelectInput
            offFastEdit
            resource={resource}
            inputType="show"
            label={`${label} aggregation`}
            source={source + "Aggregation"}
          />
          {form
            .getState()
            .values[source].map((el: Record<string, string | string[] | number>, index: number) => (
              <GroupInputsOrigin label="Filter" inputType="show">
                <Component
                  source={source}
                  parentSource={source}
                  inputType="show"
                  index={index}
                  parentSourceWithIndex={`${source}[${index}]`}
                  resource={resource}
                />
              </GroupInputsOrigin>
            ))}
        </GroupInputsOrigin>
      ) : (
        <GroupInputsOrigin wrapperClassName={classes.GroupWrapper} label={label} inputType="show">
          <SelectInput
            offFastEdit
            resource={resource}
            inputType="show"
            label={`${label} aggregation`}
            source={source + "Aggregation"}
          />
        </GroupInputsOrigin>
      )}
    </>
  );
});
