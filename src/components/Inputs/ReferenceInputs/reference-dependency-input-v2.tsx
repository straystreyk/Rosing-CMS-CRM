import * as React from "react";
import {
  ReferenceCustomInputV2Props,
  useReferenceCustomInputV2,
} from "./reference-custom-input-v2";
import { AutocompleteInput } from "../input-types";
import { MainLoader } from "../../MainLoader";
import { useFormState } from "react-final-form";
import _ from "lodash";

interface ReferenceDependencyInputV2Props extends ReferenceCustomInputV2Props {
  dependencyComponent?: React.FC<AutocompleteInput>;
  dependencyOptionValue?: string;
  dependencyOptionText?: string;
  dependencySource: string;
  dependencyLabel: string;
  dependencyFindField: string;
  findField: string;
}

const LOADER_SIZE = 20;

const useReferenceDependencyInputV2 = ({
  query,
  variables,
  currentField,
  dependencyFindField,
  findField,
  source,
}: Omit<ReferenceDependencyInputV2Props, "component">) => {
  const { data, isLoading } = useReferenceCustomInputV2({ query, variables, currentField });
  const [filteredData, setFilteredData] = React.useState([]);
  const { values } = useFormState();

  const changeParentInput = React.useCallback(
    (value: string) => {
      if (!data || !data.length) return;
      const current = data.find((elem) => elem[findField] === value);
      setFilteredData(!!current ? current[dependencyFindField] : []);
    },
    [data, dependencyFindField, findField]
  );

  if (data && data.length && !filteredData.length) {
    const parentFieldValue = _.get(values, source);
    if (parentFieldValue) {
      changeParentInput(parentFieldValue);
    }
  }

  return {
    data,
    isLoading,
    filteredData,
    changeParentInput,
  };
};

export const ReferenceDependencyInputV2: React.FC<ReferenceDependencyInputV2Props> = ({
  component: Component,
  source,
  resource,
  inputType,
  query,
  variables,
  optionText,
  optionValue,
  currentField,
  dependencyOptionText,
  dependencyOptionValue,
  dependencyLabel,
  dependencySource,
  dependencyComponent,
  dependencyFindField,
  findField,
  ...rest
}) => {
  const { data, isLoading, filteredData, changeParentInput } = useReferenceDependencyInputV2({
    query,
    variables,
    currentField,
    dependencyFindField,
    findField,
    source,
  });

  return (
    <>
      <Component
        {...rest}
        inputType={inputType}
        source={source}
        resource={resource}
        onChange={changeParentInput}
        optionText="name"
        optionValue="value"
        choices={
          data && data.length
            ? data.map((item: Record<string, string>, index) => ({
                id: index,
                name: item[optionText],
                value: item[optionValue],
              }))
            : []
        }
        options={{
          InputProps: {
            endAdornment:
              (!data || !data.length) && isLoading ? <MainLoader size={LOADER_SIZE} /> : null,
          },
        }}
      />
      <Component
        {...rest}
        label={dependencyLabel}
        inputType={inputType}
        source={dependencySource}
        resource={resource}
        optionText="name"
        optionValue="value"
        disabled={!filteredData.length}
        choices={
          filteredData && filteredData.length
            ? (filteredData.map((item: Record<string, string>, index) => ({
                id: index,
                name: dependencyOptionText ? item[dependencyOptionText] : item,
                value: dependencyOptionValue ? item[dependencyOptionValue] : item,
              })) as any)
            : []
        }
        options={{
          InputProps: {
            endAdornment:
              (!data || !data.length) && isLoading ? <MainLoader size={LOADER_SIZE} /> : null,
          },
        }}
      />
    </>
  );
};
