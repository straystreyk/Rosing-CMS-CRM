import * as React from "react";
import { type DocumentNode } from "graphql";
import { authClient } from "../../Providers/AuthProvider/client";
import type { AutocompleteInput, InputProps } from "../input-types";
import { MainLoader } from "../../MainLoader";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles({
  Loader: {
    marginLeft: 10,
  },
});

interface ReferenceCustomInputV2Props extends InputProps {
  component: React.FC<AutocompleteInput>;
  query: DocumentNode;
  variables?: Record<string, string>;
  currentField?: string;
  optionText: string;
  optionValue: string;
}

const useReferenceCustomInputV2 = ({
  query,
  variables,
  currentField,
}: Omit<ReferenceCustomInputV2Props, "component">) => {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const getData = async () => {
      const data: any = await authClient.query({ query: query, variables: variables });
      setData(currentField ? data.data.items[currentField] : data.items);
    };

    getData();
  }, []);

  return {
    data,
  };
};

export const ReferenceCustomInputV2: React.FC<ReferenceCustomInputV2Props> = ({
  component: Component,
  query,
  variables,
  currentField,
  optionText,
  optionValue,
  ...rest
}) => {
  const classes = useStyles();
  const { data } = useReferenceCustomInputV2({ query, variables, currentField });

  return (
    <>
      <Component
        {...rest}
        optionText="name"
        optionValue="value"
        choices={
          data && data.length
            ? data.map((item: any, index) => ({
                id: index,
                name: item[optionText],
                value: item[optionValue],
              }))
            : []
        }
        options={{
          InputProps: {
            endAdornment:
              !data || !data.length ? <MainLoader className={classes.Loader} size={20} /> : null,
          },
        }}
      />
    </>
  );
};
