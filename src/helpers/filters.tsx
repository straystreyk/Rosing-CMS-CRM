import * as React from "react";
import { FilterTemplate } from "../components/CustomFilters/custom-filters-types";

export const renderJsxElements: (tmp: FilterTemplate[]) => Array<{
  Component: React.ComponentType<Omit<FilterTemplate, "component">>;
  props: Omit<FilterTemplate, "component">;
}> = (tmp) =>
  tmp.map(({ component: Component, ...rest }: FilterTemplate) => ({ Component, props: rest }));
