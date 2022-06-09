import React from "react";
import { Link } from "react-router-dom";
import { useFormState } from "react-final-form";

import { TitleActionButtonsType } from "../../../../components/ResourceView/ResourceTitle/types";
import { StandardButton } from "../../../../components/UI/Buttons/standard-button";
import { ResourceCountEpisodesIcon } from "../../../../constants/icons";

export const ShowTitleActionButtons: TitleActionButtonsType = React.memo((props) => {
  const { values } = useFormState();

  return (
    <>
      <StandardButton
        component={Link}
        startIcon={<ResourceCountEpisodesIcon color="var(--accent-color)" />}
        variant="text"
        customColor="var(--accent-color)"
        text={`Episodes (${values.episodes.length})`}
        to={`/media_content/video/seasons/${props.id}/episodes`}
      />
    </>
  );
});
