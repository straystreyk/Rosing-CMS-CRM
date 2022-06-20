import React from "react";
import { Link } from "react-router-dom";
import { useFormState } from "react-final-form";

import { TitleActionButtonsType } from "../../../../components/ResourceView/ResourceTitle/types";
import { StandardButton } from "../../../../components/UI/Buttons/StandardButton/standard-button";
import { ResourceCountEpisodesIcon } from "../../../../constants/icons";

export const ShowTitleActionButtons: TitleActionButtonsType = React.memo((props) => {
  const { values } = useFormState();

  return (
    <>
      <StandardButton
        component={Link}
        startIcon={<ResourceCountEpisodesIcon />}
        variant="text"
        buttonType="primary"
        text={
          values.episodes && values.episodes.length
            ? `Episodes (${values.episodes.length})`
            : "Add episodes"
        }
        to={
          values.episodes && values.episodes.length
            ? `/media_content/video/seasons/${props.id}/episodes`
            : `/media_content/video/seasons/${props.id}/episodes/create`
        }
      />
    </>
  );
});
