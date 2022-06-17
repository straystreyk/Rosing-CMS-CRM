import * as React from "react";
import { ReferenceCustomInput } from "../../Inputs/ReferenceInputs/reference-custom-input";
import { SelectInputOrigin } from "../../Inputs/StandatdInputs/SelectInput/select-input";
import { ALL_RATING_SYSTEMS } from "../../Providers/custom-requests";
import { ChildComponentProps } from "../../Inputs/ArrayInputs/ArrayInputNoDrag/array-input-no-drag";

export const RatingSystems: React.FC<ChildComponentProps> = React.memo(
  ({ parentSource, parentSourceWithIndex, index, inputType, helperText, ...props }) => (
    <ReferenceCustomInput
      component={SelectInputOrigin}
      query={ALL_RATING_SYSTEMS}
      parentSource={parentSource}
      source={`${parentSourceWithIndex}.system`}
      idName="system"
      name="system"
      label="Rating system"
      helperText={helperText}
      index={index.toString()}
      inputType={inputType}
      resource={props.resource}
      dependencyInput
      dependencyLabel="Tag"
      dependencySource={`${parentSourceWithIndex}.tag`}
      dependencyName="tags"
      dependencyIdName="tags"
    />
  )
);
