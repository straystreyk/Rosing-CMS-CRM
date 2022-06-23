import * as React from "react";
import { useQuery } from "@apollo/client";
import { authClient } from "../../Providers/AuthProvider/client";
import { MainLoader } from "../../MainLoader";
import { useFormState } from "react-final-form";
import { makeStyles } from "@material-ui/core/styles";
import { DocumentNode } from "graphql";

const useStyles = makeStyles({
  Loader: {
    margin: "8px 0",
  },
});

export interface ReferenceCustomInputProps {
  component: any;
  query: DocumentNode;
  source: string;
  idName: string;
  inputType: string;
  resource: string;
  label: string;
  initialData?: any[];
  dependencyInput?: boolean;
  name?: string;
  dependencySource?: string;
  dependencyName?: string;
  validate?: any;
  dependencyIdName?: string;
  dependencyLabel?: string;
  parentSource?: string;
  index?: number | string;
  helperText?: string | any[];
  fullWidth?: boolean;
  checkBoxLabel?: string;
  currentField?: string;
}

interface ReferenceCustomInputElementProps {
  name: string;
  [key: string]: string;
}

export const ReferenceCustomInput: React.FC<ReferenceCustomInputProps> = React.memo(
  ({
    idName,
    name,
    dependencyInput,
    dependencyLabel,
    dependencySource,
    dependencyName,
    dependencyIdName,
    helperText,
    parentSource,
    inputType,
    index,
    query,
    currentField,
    source,
    ...props
  }) => {
    const classes = useStyles();
    const { values } = useFormState();
    const { loading, data, error } = useQuery(query, {
      client: authClient,
    });

    const [filteredData, setFilteredData] = React.useState<any>([]);

    const filterData = React.useCallback(
      (e: React.ChangeEvent<HTMLSelectElement>) => {
        const filteredArray = data.items.filter(
          (el: ReferenceCustomInputElementProps) => el[idName] === e.target.value
        );
        setFilteredData(filteredArray);
      },
      [data, idName]
    );
    React.useEffect(() => {
      if (
        data &&
        ["show", "edit"].includes(inputType) &&
        parentSource &&
        index &&
        dependencyIdName &&
        values[parentSource][index]
      ) {
        setFilteredData(
          data.items.filter(
            (el: ReferenceCustomInputElementProps) =>
              el[idName] === values[parentSource][index][idName]
          )
        );
      }
    }, [data, idName, index, parentSource, dependencyIdName, values, inputType]);

    if (loading) return <MainLoader className={classes.Loader} size={20} />;
    if (error) return <span>error</span>;

    return (
      <>
        {dependencyInput ? (
          <>
            <props.component
              {...props}
              onChange={dependencyInput ? filterData : false}
              label={props.label}
              source={source}
              helperText={helperText ?? false}
              choices={
                data
                  ? data.items.map((el: ReferenceCustomInputElementProps) => ({
                      id: el[idName],
                      name: name ? el[name] : el.name,
                    }))
                  : []
              }
              resource={props.resource}
              inputType={inputType ?? ""}
            />
            <props.component
              {...props}
              label={dependencyLabel}
              source={dependencySource}
              choices={
                filteredData.length && dependencyIdName
                  ? (filteredData[0][dependencyIdName] as []).map((el) => ({
                      id: el,
                      name: el,
                    }))
                  : []
              }
              resource={props.resource}
              inputType={inputType ?? ""}
            />
          </>
        ) : (
          <props.component
            {...props}
            label={props.label}
            source={source}
            helperText={helperText ?? false}
            choices={
              data
                ? data.items.map((el: ReferenceCustomInputElementProps) => ({
                    id: el[idName],
                    name: name ? el[name] : el.name,
                  }))
                : []
            }
            resource={props.resource}
            inputType={inputType ?? ""}
          />
        )}
      </>
    );
  }
);
