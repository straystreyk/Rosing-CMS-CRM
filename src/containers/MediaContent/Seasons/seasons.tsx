import React from "react";
import { CreateProps, EditProps, ListProps } from "ra-ui-materialui";
import Icon from "@material-ui/icons/ImageAspectRatioOutlined";
import { useParams } from "react-router-dom";

import { ResourceList, ResourceCreate, ResourceEdit } from "../../../components/ResourceView";
import { Show } from "./show";
import { Form } from "./form";
import { sanitizeId } from "../../../helpers/form";
import { ExportButton } from "../../../components/UI/RA/export-button";
import { CreateButton } from "../../../components/UI/RA/create-button";
import { ExportButtonIcon, ResourceAddIcon } from "../../../constants/icons";
import { FilterButton } from "../../../components/UI/RA/filter-button";

export const resource = "media_content/video/series/:seriesId/seasons";

export const Toolbar: React.FC<{ basePath: string; buttonLabel: string }> = ({
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
  const { seriesId } = useParams<{ seriesId: string }>();

  return (
    <ResourceList
      {...props}
      toolbar={Toolbar}
      basePath={sanitizeId(props.basePath!, /:seriesId/g, seriesId)}
      permanentFilter={{ seriesId: sanitizeId(seriesId) }}
      resource={resource}
      breadCrumbsOn
    >
      <Show resource={resource} basePath={props.basePath} />
    </ResourceList>
  );
};
export const Create: React.FC<CreateProps> = (props) => {
  const { seriesId } = useParams<{ seriesId: string }>();

  return (
    <ResourceCreate
      {...props}
      offRedirectButton
      basePath={sanitizeId(props.basePath!, /:seriesId/g, seriesId)}
      resource={resource}
    >
      <Form resource={resource} type="create" {...props} />
    </ResourceCreate>
  );
};
export const Edit: React.FC<EditProps> = (props) => {
  const { seriesId } = useParams<{ seriesId: string }>();

  return (
    <ResourceEdit
      {...props}
      resource={resource}
      basePath={sanitizeId(props.basePath!, /:seriesId/g, seriesId)}
    >
      <Form resource={resource} type="edit" />
    </ResourceEdit>
  );
};

export { Icon };
