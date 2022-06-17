import * as React from "react";
import { TextInputOrigin } from "../../Inputs/StandatdInputs/TextInput/text-input";
import { requiredValidate } from "../../Inputs";
import { ChildComponentProps } from "../../Inputs/ArrayInputs/ArrayInputNoDrag/array-input-no-drag";

export const MetaData: React.FC<ChildComponentProps> = React.memo(
  ({ parentSourceWithIndex, inputType }) => {
    return (
      <>
        <TextInputOrigin
          label="Key"
          source={`${parentSourceWithIndex}.key`}
          fullWidth
          inputType={inputType}
          validate={requiredValidate}
        />
        <TextInputOrigin
          label="Value"
          source={`${parentSourceWithIndex}.value`}
          fullWidth
          inputType={inputType}
          validate={requiredValidate}
        />
      </>
    );
  }
);
