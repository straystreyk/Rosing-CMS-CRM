import * as React from "react";
import { authClient } from "../../Providers/AuthProvider/client";
import { getGqlResource } from "../../Providers/DataProvider/get-gql-resource";
import { CHECK_SUBSCRIPTION } from "../requests";

type ExportType = { status: "in_progress" | "ready" | "error"; progress: number; file: string };

export const useExportStatusWidget = (
  resource: string,
  data: { data: { exportTask: ExportType } }
) => {
  const [subscription, setSubscription] = React.useState<ExportType>();

  React.useEffect(() => {
    if (data) setSubscription(data.data.exportTask);
  }, [data]);

  React.useEffect(() => {
    let unmounted = false;

    if (!unmounted) {
      try {
        const checkSubscription = async () => {
          const res = await authClient.query({
            query: CHECK_SUBSCRIPTION,
            variables: { type: getGqlResource(resource) },
          });
          const data = res.data.data;
          console.log(data);
          if (data) {
            setSubscription(data);
          }
        };

        checkSubscription();
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    }

    return () => {
      unmounted = true;
    };
  }, []);

  return {
    subscription,
  };
};
