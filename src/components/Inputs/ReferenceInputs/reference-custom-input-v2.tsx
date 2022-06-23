import * as React from "react";
import { type DocumentNode } from "graphql";
import { authClient } from "../../Providers/AuthProvider/client";
import type { AutocompleteInput, InputProps } from "../input-types";
import { MainLoader } from "../../MainLoader";

export interface ReferenceCustomInputV2Props extends InputProps {
  component: React.FC<AutocompleteInput>;
  query: DocumentNode;
  variables?: Record<string, string>;
  currentField?: string;
  optionText: string;
  optionValue: string;
}

export const useReferenceCustomInputV2 = ({
  query,
  variables,
  currentField,
}: Omit<ReferenceCustomInputV2Props, "component">) => {
  const [data, setData] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsLoading(true);
        const data: any = await authClient.query({ query: query, variables: variables });
        setData(currentField ? data.data.items[currentField] : data.data.items);
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    getData();
  }, []);

  return {
    data,
    isLoading,
  };
};

export const ReferenceCustomInputV2: React.FC<ReferenceCustomInputV2Props> = ({
  component: Component,
  query,
  variables,
  currentField,
  optionText,
  optionValue,
  resource,
  inputType,
  source,
  ...rest
}) => {
  const { data, isLoading } = useReferenceCustomInputV2({ query, variables, currentField });

  return (
    <>
      <Component
        {...rest}
        inputType={inputType}
        source={source}
        resource={resource}
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
            endAdornment: (!data || !data.length) && isLoading ? <MainLoader size={20} /> : null,
          },
        }}
      />
    </>
  );
};
