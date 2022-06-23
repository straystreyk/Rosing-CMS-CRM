import * as React from "react";
import { ALL_RATING_SYSTEMS } from "../../Providers/custom-requests";
import { ChildComponentProps } from "../../Inputs/ArrayInputs/ArrayInputNoDrag/array-input-no-drag";
import { ReferenceDependencyInputV2 } from "../../Inputs/ReferenceInputs/reference-dependency-input-v2";
import { AutocompleteInputOrigin } from "../../Inputs/AutocompleteInput";

export const RatingSystems: React.FC<ChildComponentProps> = React.memo(
  ({ parentSource, parentSourceWithIndex, index, inputType, helperText, resource, ...props }) => (
    <>
      <ReferenceDependencyInputV2
        resource={resource}
        query={ALL_RATING_SYSTEMS}
        inputType={inputType}
        component={AutocompleteInputOrigin}
        helperText="The age rating of the film in accordance with the legislation of the country in which the application is used"
        source={`${parentSourceWithIndex}.system`}
        label="Rating system"
        optionText="system"
        optionValue="system"
        dependencySource={`${parentSourceWithIndex}.tag`}
        dependencyFindField="tags"
        findField="system"
        dependencyLabel="Tag"
      />
    </>
  )
);
