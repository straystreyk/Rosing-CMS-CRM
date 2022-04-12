import * as React from "react";
import { ChoicesFilter } from "../../components/CustomListFilters/ChoicesFilter";
import {
  DOWNLOADABLE_CHOICES,
  EXTRA_VIDEO_CHOICES,
} from "../../components/CustomListFilters/constants";
import { SelectInputOrigin } from "../../components/Inputs/StandatdInputs/SelectInput/select-input";
import { searchChoices } from "../../constants/list-constants";
import { SearchInput } from "../../components/Inputs/search-input";

export const customFilters = [
  <ChoicesFilter
    choices={EXTRA_VIDEO_CHOICES}
    defaultActive
    label="Extra videos"
    source="extraVideo"
  />,
  <ChoicesFilter choices={DOWNLOADABLE_CHOICES} label="Downloadable" source="downloadable" />,
];

export const filtersRA = (selectClass: string) => [
  <SelectInputOrigin
    source="searchRule"
    initialValue="contains"
    className={selectClass}
    choices={searchChoices}
    label=""
    alwaysOn
  />,
  <SearchInput placeholder="ID, slug or movie name" label="" source="q" alwaysOn />,
];
