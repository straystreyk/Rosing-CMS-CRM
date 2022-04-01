import * as React from "react";
import Icon from "@material-ui/icons/VideoCallRounded";

import { ResourceList, ResourceCreate, ResourceEdit } from "../../components/ResourceView";
import { Show } from "./show";
import { Form } from "./form";
import { SearchInput } from "../../components/Inputs/search-input";
import { useParams } from "react-router-dom";
import { sanytizeId } from "../../helpers/form";
import { ListProps } from "../../types";
import { CreateProps, EditProps } from "ra-ui-materialui";
import { CreateButton } from "../../components/UI/RA/create-button";
import { ExportButtonIcon, ResourceAddIcon } from "../../constants/icons";
import { ExportButton } from "../../components/UI/RA/export-button";
import { FilterButton } from "../../components/UI/RA/filter-button";

const resource = "media_content/video/seasons/:seasonId/episodes";
const filters = [<SearchInput source="name" alwaysOn />];

const Toolbar: React.FC<{ basePath: string; buttonLabel: string }> = ({
  basePath,
  buttonLabel,
}) => {
  return (
    <>
      <CreateButton
        label={buttonLabel}
        variant="text"
        customColor="var(--accent-color)"
        to={basePath + "/create"}
        icon={<ResourceAddIcon color="var(--accent-color)" />}
      />
      <ExportButton
        icon={<ExportButtonIcon color="var(--primary-button-default)" />}
        variant="text"
        color="secondary"
        label="Download"
      />
      <FilterButton variant="text" />
    </>
  );
};

export const List: React.FC<ListProps> = (props) => {
  const { seasonId } = useParams<{ seasonId: string }>();

  return (
    <ResourceList
      {...props}
      toolbar={Toolbar}
      filters={filters}
      basePath={sanytizeId(props.basePath!, /:seasonId/g, seasonId)}
      permanentFilter={{ seasonId: sanytizeId(seasonId) }}
      resource={resource}
    >
      <Show resource={resource} basePath={sanytizeId(props.basePath!, /:seasonId/g, seasonId)} />
    </ResourceList>
  );
};
export const Create: React.FC<CreateProps> = (props) => {
  const { seasonId } = useParams<{ seasonId: string }>();

  return (
    <ResourceCreate
      {...props}
      resource={resource}
      basePath={sanytizeId(props.basePath!, /:seasonId/g, seasonId)}
      offRedirectButton
    >
      <Form resource={resource} type="create" />
    </ResourceCreate>
  );
};
export const Edit: React.FC<EditProps> = (props) => {
  const { seasonId } = useParams<{ seasonId: string }>();

  return (
    <ResourceEdit
      {...props}
      resource={resource}
      basePath={sanytizeId(props.basePath!, /:seasonId/g, seasonId)}
    >
      <Form resource={resource} type="edit" />
    </ResourceEdit>
  );
};

export { Icon };
