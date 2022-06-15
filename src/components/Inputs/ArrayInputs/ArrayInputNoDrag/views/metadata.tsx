import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { GET_ONE_VIDEO_FILE } from "../../../../Providers/custom-requests";
import { authClient } from "../../../../Providers/AuthProvider/client";
import { UrlField } from "../../../../TableFields/url-field";
import { StandardInputShowView } from "../../../StandatdInputs/standard-input-show-view";
import cn from "classnames";

export type MetadataType = {
  key: string;
  value: string;
};

const useStyles = makeStyles({
  ArrayInputShowWrapperItem: {
    paddingLeft: 12,
    "& .StandardShowWrapper": {
      borderBottom: "1px solid var(--secondary-color-disable)",
      paddingBottom: 12,
      marginBottom: 6,
      paddingTop: 6,
    },
    "&.ArrayInputShowWrapperItem:first-child": {
      "& .StandardShowWrapper:first-child": {
        paddingTop: 0,
      },
    },
    "&.ArrayInputShowWrapperItem:last-child": {
      "& .StandardShowWrapper:last-child": {
        borderBottom: "none",
        marginBottom: 0,
      },
      borderBottom: "1px solid var(--secondary-color-disable)",
    },
  },
});

export const MetadataShow: React.FC<{ metaKey: string; value: string }> = ({ metaKey, value }) => {
  const classes = useStyles();
  return (
    <div className={cn(classes.ArrayInputShowWrapperItem, "ArrayInputShowWrapperItem")}>
      <StandardInputShowView label="Key-Value">
        {metaKey}={value}
      </StandardInputShowView>
    </div>
  );
};

export type ExtraVideoType = {
  kind: string;
  name: string;
  streamSourceId: string;
};

export const ExtraVideos: React.FC<ExtraVideoType> = ({ kind, name, streamSourceId }) => {
  const classes = useStyles();
  const [videoFiles, setVideoFiles] = React.useState<{ id: string; name: string }>();

  React.useEffect(() => {
    let unmounted = false;

    if (!unmounted && streamSourceId) {
      const getData = async () => {
        try {
          const res = await authClient.query({
            query: GET_ONE_VIDEO_FILE,
            variables: { id: streamSourceId },
          });
          const data = res.data.item;
          setVideoFiles(data);
        } catch (e) {
          if (e instanceof Error) {
            console.log(e.message);
          }
        }
      };

      getData();
    }

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div className={cn(classes.ArrayInputShowWrapperItem, "ArrayInputShowWrapperItem")}>
      <StandardInputShowView label={kind.charAt(0).toUpperCase() + kind.slice(1)}>
        <UrlField
          to={`/media_content/video/video_files/${videoFiles && videoFiles.id}/show`}
          name={videoFiles && videoFiles.name}
        />
      </StandardInputShowView>
    </div>
  );
};
