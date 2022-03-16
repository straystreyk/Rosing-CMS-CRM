import * as React from "react";
import { ArrayInputProps } from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core";
import { useFormState } from "react-final-form";

import { EditInputComponent } from "../../edit-input-component";
import { ArrayInputNoDragOrigin } from "./array-input-no-drag";
import { labelStyles } from "../../styles";
import { useQuery } from "@apollo/client";
import { authClient } from "../../../Providers";
import { ALL_VIDEO_FILES, GET_ONE_VIDEO_FILE } from "../../../Providers/custom-requests";
import { MainLoader } from "../../../MainLoader";
import { divide } from "lodash";

interface ArrayInputShowProps {
  system?: string;
  tag?: string;
  key?: string;
  value?: string;
  kind?: string;
  name?: string;
  streamSourceId?: string;
}

const useStyles = makeStyles((theme) => ({
  RatingShowWrapper: {
    width: "100%",
    fontSize: 14,
    "& label": { ...labelStyles, marginBottom: 8, display: "inline-block" },
    "& .empty": {
      color: "#9FA5A8",
      borderBottom: "1px solid #E7E9E9",
      paddingBottom: 8,
    },
  },
  MetadataItem: {
    display: "flex",
    justifyContent: "space-between",
    padding: "8px 0",
    marginBottom: 8,
    marginLeft: "24px",
    borderBottom: "1px solid #E7E9E9",
    flexWrap: "wrap",
    "& .metadataField": {
      width: "50%",
      color: "#023864",
      "&.field": {
        width: "100%",
      },
      "& .title": {
        fontSize: 14,
        fontWeight: 500,
        lineHeight: "20px",
        marginBottom: 4,
        color: "#0F1F26",
      },
    },
  },
  RatingItem: {
    "& .name": {
      borderBottom: "1px solid #E7E9E9",
      color: "#023864",
      paddingBottom: 10,
      paddingTop: 10,
    },
    "& .value": {
      borderBottom: "1px solid #E7E9E9",
      color: "#023864",
      paddingBottom: 10,
      paddingTop: 10,
    },
    "&:last-child .value": {
      borderBottom: "none",
    },
    "&:nth-child(2) .name": {
      paddingTop: 8,
    },
  },
}));

const ExtraVideos: React.FC<ArrayInputShowProps> = ({ kind, name, streamSourceId }) => {
  const classes = useStyles();
  const { loading, data, error } = useQuery(GET_ONE_VIDEO_FILE, {
    client: authClient,
    variables: { id: streamSourceId },
  });

  if (loading) return <MainLoader size={20} />;
  if (error) return <span>error</span>;

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
          {data.item.name}
        </div>
      </div>
    </>
  );
};

const ShowView: React.FC<ArrayInputProps> = ({ source, label, choices, ...props }) => {
  const { values } = useFormState();
  const classes = useStyles();

  const getValue = (source: string) => {
    switch (source) {
      case "extraVideos":
        return values[source] && values[source].length ? (
          values[source].map((el: ArrayInputShowProps, index: number) => {
            return (
              <React.Fragment key={index}>
                <ExtraVideos kind={el.kind} streamSourceId={el.streamSourceId} name={el.name} />
              </React.Fragment>
            );
          })
        ) : (
          <div className="empty">Not filled in</div>
        );
      case "metadata":
        return values[source] && values[source].length ? (
          values[source].map((el: ArrayInputShowProps, index: number) => {
            return (
              <div className={classes.MetadataItem} key={index}>
                <div className="metadataField">
                  <div className="title">Key</div>
                  {el.key}
                </div>
                <div className="metadataField">
                  <div className="title">Value</div>
                  {el.value}
                </div>
              </div>
            );
          })
        ) : (
          <div className="empty">Not filled in</div>
        );
      default:
        return values[source] && values[source].length ? (
          values[source].map((el: ArrayInputShowProps, index: number) => {
            return (
              <div className={classes.RatingItem} key={index}>
                <div className="name">{el.system}</div>
                <div className="value">{el.tag}</div>
              </div>
            );
          })
        ) : (
          <div className="empty">Not filled in</div>
        );
    }
  };

  return (
    <div className={classes.RatingShowWrapper}>
      <label>{label}</label>
      {getValue(source)}
    </div>
  );
};

export const ArrayInputNoDragShow: React.FC<ArrayInputProps> = (props) => {
  return (
    <EditInputComponent
      ComponentInput={ArrayInputNoDragOrigin}
      ComponentShow={ShowView}
      borderOff
      {...props}
    />
  );
};
