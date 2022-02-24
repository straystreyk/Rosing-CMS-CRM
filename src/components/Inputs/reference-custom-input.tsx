import * as React from "react";
import { useQuery } from "@apollo/client";
import { authClient } from "../Providers";
import { MainLoader } from "../MainLoader";
import { useFormState } from "react-final-form";

interface ReferenceCustomInputProps {
  component: any;
  query: any;
  source: string;
  idName: string;
}

export const ReferenceCustomInput: React.FC<ReferenceCustomInputProps> = (props) => {
  const { loading, data, error } = useQuery(props.query, {
    client: authClient,
  });

  const state = useFormState();

  if (error) return <div>error</div>;
  if (loading) return <MainLoader size={20} />;

  return (
    <props.component
      source={props.source}
      choices={data.items.map((el: { name: string; [key: string]: string }) => ({
        id: el[props.idName],
        name: el.name,
      }))}
    />
  );
};
