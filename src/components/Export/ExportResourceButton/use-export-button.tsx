import * as React from "react";
import { useListContext } from "react-admin";
import { useNotify } from "ra-core";
import { getGqlResource } from "../../Providers/DataProvider/get-gql-resource";
import { gql } from "@apollo/client";
import { authClient } from "../../Providers/AuthProvider/client";
import { ExportType } from "../ExportStatusWidget/use-export-status-widget";

export const useExportButton = (resource: string, data: { data: { exportTask: ExportType } }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const { filterValues, currentSort } = useListContext();
  const open = Boolean(anchorEl);
  const notify = useNotify();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    if (data && data.data.exportTask.progress === 100) {
      setIsLoading(false);
    }
    if (data && data.data.exportTask.progress !== 100) {
      setIsLoading(true);
    }
  }, [data]);

  const handleItem = React.useCallback(async () => {
    const currentResource = getGqlResource(resource);

    const query = gql`
      query export${currentResource}( 
        $filter: ${currentResource}Filter
        $sortField: String 
        $sortOrder: String
      ) {
        export${currentResource}(
          filter: $filter 
          sortField: $sortField
          sortOrder: $sortOrder
        ) {
            __typename
        }
      }
    `;

    try {
      setIsLoading(true);
      await authClient.query({
        query,
        variables: {
          filter: filterValues,
          sortField: currentSort.field,
          sortOrder: currentSort.order,
        },
      });
    } catch (e) {
      if (e instanceof Error) {
        notify(e.message, { type: "error" });
      }
      setIsLoading(false);
    } finally {
      handleClose();
    }
  }, [currentSort, filterValues, notify, resource]);

  return {
    handleClick,
    handleItem,
    handleClose,
    isLoading,
    open,
    anchorEl,
  };
};
