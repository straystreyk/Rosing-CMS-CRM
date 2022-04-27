import * as React from "react";
import Icon from "@material-ui/icons/Lock";

import {
  ResourceCreate,
  ResourceEdit,
  ResourceList,
  ResourceShow,
} from "../../../../../components/ResourceView";
import { Form } from "./form";
import { TableView } from "./table-view";
import { providersSubTabs } from "../constants";
import { attributesTabs } from "../../constants";

const resource = "media_content/attributes/providers/right_holders";

export const Create: React.FC = (props) => (
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} type="create" />
  </ResourceCreate>
);
export const Edit: React.FC = (props) => (
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} type="edit" />
  </ResourceEdit>
);
export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" />
  </ResourceShow>
);
export const List: React.FC = (props) => (
  <ResourceList
    listSubTabs={providersSubTabs}
    listTabs={attributesTabs}
    {...props}
    resource={resource}
  >
    <TableView resource={resource} />
  </ResourceList>
);

export { Icon };
