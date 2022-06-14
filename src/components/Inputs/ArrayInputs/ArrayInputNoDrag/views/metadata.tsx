import * as React from "react";
import { makeStyles } from "@material-ui/core";
import { GET_ONE_VIDEO_FILE } from "../../../../Providers/custom-requests";
import { authClient } from "../../../../Providers/AuthProvider/client";
import { UrlField } from "../../../../TableFields/url-field";

export type MetadataType = {
  key: string;
  value: string;
};

const useStyles = makeStyles({
  MetadataItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    marginBottom: 8,
    marginLeft: "12px",
    borderBottom: "1px solid #E7E9E9",
    flexWrap: "wrap",
    "& .metadataField": {
      width: "50%",
      color: "var(--primary-text-default)",
      "&.field": {
        width: "100%",
      },
      "& .title": {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: "20px",
        marginBottom: 4,
        color: "var(--secondary-color-main)",
      },
    },
  },
});

export const MetadataShow: React.FC<{ metaKey: string; value: string }> = ({ metaKey, value }) => {
  const classes = useStyles();
  return (
    <div className={classes.MetadataItem}>
      <div className="metadataField">
        <div className="title">Key</div>
        {metaKey}
      </div>
      <div className="metadataField">
        <div className="title">Value</div>
        {value}
      </div>
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
    <>
      <div className={classes.MetadataItem}>
        <div className="metadataField">
          <div className="title">Kind</div>
          {kind}
        </div>
      </div>
      <div className={classes.MetadataItem}>
        <div className="metadataField">
          <div className="title">Name</div>
          {name}
        </div>
      </div>
      <div className={classes.MetadataItem}>
        <div className="metadataField">
          <div className="title">Video file</div>
          <UrlField
            to={`/media_content/video/video_files/${videoFiles && videoFiles.id}/show`}
            name={videoFiles && videoFiles.name}
          />
        </div>
      </div>
    </>
  );
};
