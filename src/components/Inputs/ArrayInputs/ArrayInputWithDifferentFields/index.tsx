import * as React from "react";
import { FieldArray } from "react-final-form-arrays";
import { StandardButton } from "../../../UI/Buttons/StandardButton/standard-button";
import { DeleteIcon, PlusIcon } from "../../../../constants/icons";
import { ComponentArrayInputType, InputProps } from "../../input-types";
import { TextInput } from "../../StandatdInputs/TextInput/text-input";
import { SelectStaticButton } from "../../select-models-input";

interface NewArrayInputProps {
  source: string;
  // component: React.FC<ComponentArrayInputType>;
  buttonText: string;
  resource: string;
}

export const ArrayInputWithDifferentFields: React.FC<NewArrayInputProps> = ({
  source,
  // component: Component,
  buttonText,
  resource,
}) => {
  const [initialFields, setInitialFields] = React.useState<InputProps[]>([
    { component: TextInput, source: "jopa", label: "jopa", inputType: "create", resource },
  ]);
  const [activeFields, setActiveFields] = React.useState<InputProps[]>([]);

  return (
    <FieldArray name={source}>
      {({ fields }) => (
        <div>
          {fields.map((name, index) => {
            return (
              <React.Fragment key={index}>
                <div key={name + index}>
                  {/*<Component*/}
                  {/*  parentSourceWithIndex={name}*/}
                  {/*  parentSource={source}*/}
                  {/*  index={index}*/}
                  {/*  resource={resource}*/}
                  {/*/>*/}
                  {activeFields.map(({ component: Component, source, ...rest }) => {
                    return index === rest.index ? (
                      <Component {...rest} source={`${name}.${source}`} />
                    ) : null;
                  })}
                  <SelectStaticButton
                    items={initialFields}
                    selectValue="source"
                    selectItemName="label"
                    buttonText="Add"
                    buttonType="additional-red"
                    handleCloseFunc={(value: string) => {
                      setActiveFields((p) => [
                        ...p,
                        {
                          ...initialFields.find((el) => el.source === value),
                          index: index,
                        } as InputProps,
                      ]);
                    }}
                  />
                  <StandardButton
                    buttonType="additional-red"
                    variant="text"
                    startIcon={<DeleteIcon />}
                    text="Delete"
                    onClick={() => fields.remove(index)}
                  />
                </div>
                {fields.length && fields.length >= 2 && index === 0 && (
                  <div>
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
            <StandardButton
              buttonType="primary"
              variant="text"
              startIcon={<PlusIcon />}
              text={buttonText}
              onClick={() => fields.push(undefined)}
            />
          )}
        </div>
      )}
    </FieldArray>
  );
};

// export const ArrayInputWithDifferentFields = () => (
//   <FieldArray name="customers">
//     {({ fields }) => (
//       <div>
//         {fields.map((name, index) => (
//           <div key={name}>
//             <div>
//               <label>First Name</label>
//               <Field name={`${name}.firstName`} component="input" />
//             </div>
//             <div>
//               <label>Last Name</label>
//               <Field name={`${name}.lastName`} component="input" />
//             </div>
//             <button type="button" onClick={() => fields.remove(index)}>
//               Remove
//             </button>
//           </div>
//         ))}
//         <button type="button" onClick={() => fields.push({ firstName: "", lastName: "" })}>
//           Add
//         </button>
//       </div>
//     )}
//   </FieldArray>
// );
