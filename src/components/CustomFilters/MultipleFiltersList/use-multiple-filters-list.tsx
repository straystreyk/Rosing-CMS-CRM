import * as React from "react";
import * as _ from "lodash";
import { useNotify } from "ra-core";
import { TypedDocumentNode } from "@apollo/client";

import { ChoicesItem } from "../custom-filters-types";
import { useListContext } from "react-admin";
import { authClient } from "../../Providers";

interface UseMultipleFiltersListProps {
  setChoices: React.Dispatch<React.SetStateAction<ChoicesItem[]>>;
  setFilteredFilters: React.Dispatch<React.SetStateAction<ChoicesItem[]>>;
  setActiveFilters: React.Dispatch<React.SetStateAction<ChoicesItem[]>>;
  activeFilters: ChoicesItem[];
  choices: ChoicesItem[];
  source: string;
  query: TypedDocumentNode<any, {}>;
}

export const useMultipleFiltersList = ({
  setChoices,
  setFilteredFilters,
  setActiveFilters,
  activeFilters,
  choices,
  query,
  source,
}: UseMultipleFiltersListProps) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { filterValues, displayedFilters, setFilters } = useListContext();
  const notify = useNotify();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteFilter = React.useCallback(() => {
    setFilters(_.omit(filterValues, [source]), displayedFilters);
  }, [source, filterValues, setFilters]);

  const handleMenuItemClick = React.useCallback(
    (e: React.MouseEvent, index: number, filter: ChoicesItem) => {
      if (activeFilters.includes(filter)) {
        setFilters(
          {
            ...filterValues,
            [source]: filterValues[source].filter((el: unknown) => el !== filter.value),
          },
          displayedFilters
        );
        setActiveFilters((prev: ChoicesItem[]) => prev.filter((el) => el !== filter));
      } else {
        setActiveFilters((prev: ChoicesItem[]) => [...prev, filter]);
        if (filterValues[source] && filterValues[source].length) {
          setFilters(
            { ...filterValues, [source]: [...filterValues[source], filter.value] },
            displayedFilters
          );
        } else {
          setFilters({ ...filterValues, [source]: [filter.value] }, displayedFilters);
        }
      }
    },
    [activeFilters, filterValues, source]
  );

  React.useEffect(() => {
    if (choices.length || !query) return;

    let unmounted = false;

    try {
      const getChoices = async () => {
        const res = await authClient.query({
          query,
          variables: {},
        });

        const data: ChoicesItem[] = res.data.items;
        if (!unmounted) {
          setChoices(data);
          setFilteredFilters(data);
        }
      };

      getChoices();
    } catch (e) {
      if (e instanceof Error) {
        notify(e.message);
      }
    }

    return () => {
      unmounted = true;
    };
  }, []);

  React.useEffect(() => {
    choices.map((filter) => {
      if (filterValues[source] && filterValues[source].includes(filter.value)) {
        setActiveFilters((prev: ChoicesItem[] | []) => [...prev, filter]);
      }
    });
  }, [choices, filterValues, source]);

  return {
    handleClick,
    handleClose,
    deleteFilter,
    anchorEl,
    handleMenuItemClick,
  };
};