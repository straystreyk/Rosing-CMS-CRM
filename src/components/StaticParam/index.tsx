import * as React from "react";
import { useQuery } from "@apollo/client";
import { authClient } from "../Providers";
import { MainLoader } from "../MainLoader";

export const StaticParam: React.FC<{ query: any; variables: {} }> = ({ query, variables }) => {
  const { loading, data, error } = useQuery(query, {
    client: authClient,
    variables,
  });

  if (loading) return <MainLoader centered size={20} />;
  if (error) {
    return <span>error</span>;
  }

  return <span>{data.items.value}</span>;
};
