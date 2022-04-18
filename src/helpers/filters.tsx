import * as React from "react";
import { FilterTemplate } from "../components/CustomFilters/custom-filters-types";

export const getJsxElements: (tmp: FilterTemplate[]) => React.ReactElement<FilterTemplate>[] = (
  tmp
) => tmp.map(({ component: Component, ...rest }: FilterTemplate) => <Component {...rest} />);
