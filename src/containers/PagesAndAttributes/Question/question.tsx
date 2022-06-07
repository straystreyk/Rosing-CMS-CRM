import * as React from "react";
import { CreateProps, ListProps } from "ra-ui-materialui";

import {
  ResourceCreate,
  ResourceEdit,
  ResourceList,
  ResourceShow,
} from "../../../components/ResourceView";
import { Form } from "./form";
import { TableView } from "./table-view";
import { pagesAndAttributesListTabs } from "../constants";

const resource = "pages_and_attributes/questions";
const initialSort = { field: "position", order: "ASC" };

export const Create: React.FC<CreateProps> = (props) => {
  return (
    <ResourceCreate {...props} resource={resource}>
      <Form resource={resource} type="create" {...props} />
    </ResourceCreate>
  );
};
export const Edit: React.FC = (props) => (
  <ResourceEdit {...props} redirect="list" resource={resource}>
    <Form resource={resource} type="edit" {...props} />
  </ResourceEdit>
);
export const List: React.FC<ListProps> = (props) => {
  return (
    <ResourceList
      listTabs={pagesAndAttributesListTabs}
      sort={initialSort}
      resource={resource}
      {...props}
    >
      <TableView resource={resource} />
    </ResourceList>
  );
};

export const Show: React.FC = (props) => (
  <ResourceShow {...props} resource={resource}>
    <Form resource={resource} type="show" />
  </ResourceShow>
);
