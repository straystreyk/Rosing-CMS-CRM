import * as React from "react";
import { authClient } from "../../Providers/AuthProvider/client";
import { getGqlResource } from "../../Providers/DataProvider/get-gql-resource";
import { CHECK_SUBSCRIPTION, SET_REPORT_DOWNLOADED } from "../requests";
import { useNotify } from "ra-core";

export type ExportType = {
  status: "in_progress" | "ready" | "error" | "downloaded";
  progress: number;
  file: string;
  exportType: string;
  format: string;
  id: string;
};

export const useExportStatusWidget = (
  resource: string,
  data: { data: { exportTask: ExportType } }
) => {
  const notify = useNotify();
  const [subscription, setSubscription] = React.useState<ExportType | null>(null);

  const setReport = React.useCallback(async () => {
    if (subscription) {
      try {
        await authClient.mutate({
          mutation: SET_REPORT_DOWNLOADED,
          variables: { id: subscription.id },
        });
      } catch (e) {
        if (e instanceof Error) {
          notify(e.message, { type: "error" });
        }
      }
    }
  }, [notify, subscription]);

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
    setReport,
  };
};
