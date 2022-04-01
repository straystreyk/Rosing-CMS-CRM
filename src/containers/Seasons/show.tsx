import React from "react";
import { Datagrid, TextField, FunctionField } from "react-admin";
import { useHistory } from "react-router-dom";

import { EmptyTablePage } from "../../components/EmptyTablePage";
import { StandardButton } from "../../components/UI/Buttons/standard-button";
import { ResourceAddIcon, ResourceCountEpisodesIcon } from "../../constants/icons";
import { MoreActionsButton } from "../../components/UI/Buttons/MoreActionsButton";
import { DeleteButton } from "../../components/UI/RA/delete-button";
import { EditButton } from "../../components/UI/RA/edit-button";

interface ShowInterface {
  resource: string;
  basePath?: string;
}

interface Record {
  id: string;
  episodes: {
    id: string;
  }[];
}

export const Show: React.FC<ShowInterface> = (props) => {
  const history = useHistory();

  return (
    <Datagrid size="medium" className="popaConasd" empty={<EmptyTablePage />} {...props} optimized>
      <TextField source="name" />
      <FunctionField
        label="Episodes"
        render={(record: Record) => (
          <>
            <StandardButton
              startIcon={
                record.episodes.length ? (
                  <ResourceCountEpisodesIcon color="var(--accent-color)" />
                ) : (
                  <ResourceAddIcon color="var(--accent-color)" />
                )
              }
              variant="text"
              customColor="var(--accent-color)"
              onClick={() =>
                history.push(
                  record.episodes.length
                    ? `/media_content/video/seasons/${record.id}/episodes`
                    : `/media_content/video/seasons/${record.id}/episodes/create`
                )
              }
            >
              {record.episodes.length ? `Episodes (${record.episodes.length})` : "Add episodes"}
            </StandardButton>
          </>
        )}
      />
      <FunctionField
        label=""
        render={(record: Record) => (
          <MoreActionsButton>
            <EditButton color="secondary" record={record} basePath={history.location.pathname} />
            <DeleteButton record={record} basePath={history.location.pathname} />
          </MoreActionsButton>
        )}
      />
    </Datagrid>
  );
};
