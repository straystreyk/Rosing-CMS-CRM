import * as React from "react";
import { FunctionField, TextField, useMutation, useRefresh } from "react-admin";
import { EmptyTablePage } from "../../components/EmptyTablePage";
import { Resource } from "../../components/Inputs/StandatdInputs/SelectInput/show-view";
import { GET_ONE_EXTERNAL_CATALOG } from "../../components/Providers/custom-requests";
import {
  AllowDownload,
  ArrowIconDown,
  ArrowIconUp,
  ProhibitDownload,
  PublishedIcons,
  PublishIcon,
  UnPublishedIcons,
  UnPublishIcon,
} from "../../constants/icons";
import { MoreActionsButton } from "../../components/UI/Buttons/MoreActionsButton";
import { makeStyles } from "@material-ui/core";
import { EditButton } from "../../components/UI/RA/edit-button";
import { DeleteButton } from "../../components/UI/RA/delete-button";
import { StandardButton } from "../../components/UI/Buttons/standard-button";
import { useNotify } from "ra-core";
import { DatagridList } from "../../components/DatagridList";

const useStyles = makeStyles({
  MoreInfo: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MoreActionsButtonWrapper": {
      marginLeft: 15,
    },
  },
  DataGridWrapper: {
    position: "relative",
    "& .LoaderWrapper": {
      backgroundColor: "rgba(0, 0, 0, 0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      position: "absolute",
      width: "100%",
      height: "100%",
      zIndex: 200,
      top: 0,
      left: 0,
    },
  },
  NameField: {
    textDecoration: "underline",
    fontSize: 14,
    lineHeight: "20px",
  },
  Empty: {
    color: "var(--secondary-color-default)",
  },
});

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
      id: string,
      updateOpts: Record<string, string | boolean | number | string[]>,
      required: Record<string, string | boolean>
    ) => {
      await mutate({
        type: "update",
        resource: props.resource,
        payload: { id, data: { ...required, ...updateOpts } },
      });
    },
    []
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
  }, [data, error]);

  return (
    <DatagridList empty={<EmptyTablePage />} {...props} optimized>
      <TextField label="Name" source="name" style={{ textDecoration: "underline" }} />
      <FunctionField
        label="Position"
        source="position"
        render={({ position }: { position: number }) => position ?? "Not filled in"}
      />
      <TextField label="Slug" source="slug" />
      <FunctionField
        label="External catalog"
        source="External catalog"
        render={({ externalCatalogId }: { externalCatalogId: string }) =>
          externalCatalogId ? (
            <Resource
              loaderOptions={{ flex: true, size: 10 }}
              resourceId={externalCatalogId}
              query={GET_ONE_EXTERNAL_CATALOG}
            />
          ) : (
            <span className={classes.Empty}>Not filled in</span>
          )
        }
      />
      <FunctionField
        label=""
        render={(record: {
          id: string;
          published: boolean;
          position: number;
          name: string;
          streamSourceIds: string[];
        }) => {
          return (
            <div className={classes.MoreInfo}>
              {record.published ? <PublishedIcons /> : <UnPublishedIcons />}
              <MoreActionsButton>
                <StandardButton
                  onClick={() =>
                    approve(
                      record.id,
                      {
                        ...record,
                        published: true,
                      },
                      { name: record.name }
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
                    approve(record.id, { ...record, published: false }, { name: record.name })
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
                    approve(record.id, { ...record, downloadable: true }, { name: record.name })
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
                    approve(record.id, { ...record, downloadable: false }, { name: record.name })
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
                    approve(record.id, { ...record, position: 1 }, { name: record.name })
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
                      record.id,
                      { ...record, position: props.total ?? 0 },
                      { name: record.name }
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
