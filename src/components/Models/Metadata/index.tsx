import * as React from "react";
import { TextInputOrigin } from "../../Inputs/StandatdInputs/TextInput/text-input";
import { requiredValidate } from "../../Inputs";

export const MetaData: React.FC<{ parentSourceWithIndex: string; inputType: string }> = React.memo(
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
