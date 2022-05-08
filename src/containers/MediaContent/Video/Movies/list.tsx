import * as React from "react";
import { FunctionField, TextField, useMutation, useRefresh } from "react-admin";
import { EmptyTablePage } from "../../../../components/EmptyTablePage";
import {
  AllowDownload,
  ArrowIconDown,
  ArrowIconUp,
  ProhibitDownload,
  PublishedIcons,
  PublishIcon,
  UnPublishedIcons,
  UnPublishIcon,
} from "../../../../constants/icons";
import { MoreActionsButton } from "../../../../components/UI/Buttons/MoreActionsButton";
import { makeStyles } from "@material-ui/core";
import { EditButton } from "../../../../components/UI/RA/edit-button";
import { DeleteButton } from "../../../../components/UI/RA/delete-button";
import { StandardButton } from "../../../../components/UI/Buttons/standard-button";
import { Identifier, Record as RecordRA, useNotify } from "ra-core";
import { DatagridList } from "../../../../components/DatagridList";
import { movieFilters } from "./movie-filters";
import { ReferenceField } from "../../../../components/TableFields/reference-field";
import { Link } from "react-router-dom";
import { TableFieldsStyles } from "../../../../components/TableFields/styles";

const useStyles = makeStyles(TableFieldsStyles);

interface ShowProps {
  resource: string;
  basePath?: string;
  total?: number;
}

export const List: React.FC<ShowProps> = (props) => {
  const classes = useStyles();
  const [mutate, { data, error, loading }] = useMutation();
  const refresh = useRefresh();
  const notify = useNotify();

  const approve = React.useCallback(
    async (
      id?: Identifier,
      updateOpts?: Record<string, string | boolean | number | string[]>,
      required?: Record<string, string | boolean>
    ) => {
      if (!id || !updateOpts || !required) return;

      await mutate({
        type: "update",
        resource: props.resource,
        payload: { id, data: { ...required, ...updateOpts } },
      });
    },
    [mutate, props.resource]
  );

  React.useEffect(() => {
    if (data && !error) {
      notify(`resources.${props.resource}.mutations.list.success`, {
        type: "success",
        messageArgs: { name: data.name },
      });
      refresh();
    }
    if (error) {
      notify(`resources.${props.resource}.mutations.list.error`, {
        type: "error",
        messageArgs: { error },
      });
    }
  }, [notify, props.resource, refresh, data, error]);

  return (
    <DatagridList
      {...props}
      draggable
      filters={movieFilters}
      listText="A list of pages available for publication on clients. The client has the ability to display an individual list of pages in the menu in accordance with the rule associated with it. Select a client from the list to see its list of pages."
      empty={<EmptyTablePage />}
      basePath={props.basePath}
    >
      <FunctionField
        label="Name"
        source="name"
        render={(record?: RecordRA) => (
          <Link className={classes.NameField} to={`/${props.resource}/${record?.id}/show`}>
            {record?.name}
          </Link>
        )}
      />
      <FunctionField
        label="Position"
        source="position"
        render={(record?: RecordRA) => record?.position ?? "Not filled in"}
      />
      <TextField label="Slug" source="slug" />
      <ReferenceField
        label="External catalog"
        source="externalCatalogId"
        reference="media_content/attributes/providers/content_providers"
        emptyText={<span className={classes.Empty}>Empty</span>}
      >
        <TextField source="name" fullWidth />
      </ReferenceField>
      <FunctionField
        label=""
        render={(record?: RecordRA) => {
          return (
            <div className={classes.MoreActions}>
              {record?.published ? (
                <button>
                  <PublishedIcons />
                </button>
              ) : (
                <button>
                  <UnPublishedIcons />
                </button>
              )}
              <MoreActionsButton>
                <StandardButton
                  onClick={() =>
                    approve(
                      record?.id,
                      {
                        ...record,
                        published: true,
                      },
                      { name: record?.name }
                    )
                  }
                  disabled={loading}
                  color="secondary"
                  variant="textWithBg"
                  startIcon={<PublishIcon />}
                >
                  Publish
                </StandardButton>
                <StandardButton
                  onClick={() =>
                    approve(record?.id, { ...record, published: false }, { name: record?.name })
                  }
                  disabled={loading}
                  color="secondary"
                  variant="textWithBg"
                  startIcon={<UnPublishIcon />}
                >
                  Unpublish
                </StandardButton>
                <StandardButton
                  onClick={() =>
                    approve(record?.id, { ...record, downloadable: true }, { name: record?.name })
                  }
                  disabled={loading}
                  color="secondary"
                  variant="textWithBg"
                  startIcon={<AllowDownload />}
                >
                  Allow downloading
                </StandardButton>
                <StandardButton
                  onClick={() =>
                    approve(record?.id, { ...record, downloadable: false }, { name: record?.name })
                  }
                  disabled={loading}
                  color="secondary"
                  variant="textWithBg"
                  startIcon={<ProhibitDownload />}
                >
                  Prohibit downloading
                </StandardButton>
                <StandardButton
                  onClick={() =>
                    approve(record?.id, { ...record, position: 1 }, { name: record?.name })
                  }
                  disabled={loading}
                  color="secondary"
                  variant="textWithBg"
                  startIcon={<ArrowIconUp />}
                >
                  To the top of the list
                </StandardButton>
                <StandardButton
                  onClick={() =>
                    approve(
                      record?.id,
                      { ...record, position: props.total ?? 0 },
                      { name: record?.name }
                    )
                  }
                  startIcon={<ArrowIconDown />}
                  disabled={loading}
                  variant="textWithBg"
                  color="secondary"
                >
                  To the bottom of the list
                </StandardButton>
                <EditButton color="secondary" record={record} basePath={props.basePath} />
                <DeleteButton record={record} basePath={props.basePath} />
              </MoreActionsButton>
            </div>
          );
        }}
      />
    </DatagridList>
  );
};
