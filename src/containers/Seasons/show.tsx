import React from "react";
import { Datagrid, TextField, FunctionField } from "react-admin";
import { useHistory } from "react-router-dom";

import { EmptyTablePage } from "../../components/EmptyTablePage";
import { StandardButton } from "../../components/UI/Buttons/standard-button";
import { EditIcon, ResourceCountEpisodesIcon } from "../../constants/icons";
import { MoreActionsButton } from "../../components/UI/Buttons/MoreActionsButton";
import { DeleteButton } from "../../components/UI/RA/delete-button";
import { EditButton } from "../../components/UI/RA/edit-button";

interface ShowInterface {
  resource: string;
  basePath?: string;
}

export const Show: React.FC<ShowInterface> = (props) => {
  const history = useHistory();

  return (
    <Datagrid empty={<EmptyTablePage />} {...props} optimized>
      <TextField source="name" />
      <FunctionField
        label="Episodes"
        render={(record: { id: string; episodes: { id: string }[] }) => (
          <StandardButton
            startIcon={<ResourceCountEpisodesIcon color="var(--accent-color)" />}
            variant="text"
            customColor="var(--accent-color)"
            onClick={() => history.push(`/media_content/video/seasons/${record.id}/episodes`)}
          >
            Episodes ({record.episodes.length})
          </StandardButton>
        )}
      />
      <FunctionField
        label=""
        render={(record: { id: string; episodes: { id: string }[] }) => (
          <MoreActionsButton>
            <EditButton color="secondary" record={record} basePath={history.location.pathname} />
            <DeleteButton record={record} basePath={history.location.pathname} />
          </MoreActionsButton>
        )}
      />
    </Datagrid>
  );
};
