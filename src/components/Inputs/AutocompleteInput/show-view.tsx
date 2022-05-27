import * as React from "react";
import { EditInputComponent } from "../edit-input-component";
import { AutocompleteInputProps as AutocompleteInputPropsRA } from "ra-ui-materialui/lib/input/AutocompleteInput";
import { AutocompleteInput } from "./index";
import { useFormState } from "react-final-form";
import { InputProps } from "ra-core";
import { makeStyles } from "@material-ui/core";
import { labelStyles } from "../styles";
import {
  GET_ONE_CHANNEL_VERSION,
  GET_ONE_EXTERNAL_CATALOG,
  GET_ONE_LANGUAGE,
  GET_ONE_RIGHT_HOLDER,
  GET_ONE_VIDEO_FILE,
} from "../../Providers/custom-requests";
import { Resource } from "../StandatdInputs/SelectInput/show-view";
import { Link } from "react-router-dom";
import { GET_ONE_EPG_SOURCE } from "../../../containers/MediaContent/TV/TVShows/EPGSources/requests";

const useStyles = makeStyles({
  label: labelStyles,
  AutoCompleteShowValue: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--primary-text-default)",
    "& .empty": {
      color: "var(--secondary-color-default)",
    },
  },
});

const ShowView: React.FC<InputProps> = (props: InputProps) => {
  const { values } = useFormState();
  const classes = useStyles();

  const getValue = (source: string) => {
    switch (source) {
      case "languageId":
        return values[props.source] ? (
          <Resource query={GET_ONE_LANGUAGE} resourceId={values[props.source]} />
        ) : (
          <div className="empty">Not filled in</div>
        );
      case "streamSourceId":
        return values[props.source] ? (
          <Resource
            query={GET_ONE_VIDEO_FILE}
            component={Link}
            to={`/media_content/video/video_files/${values[props.source]}/show`}
            resourceId={values[props.source]}
          />
        ) : (
          <div className="empty">Not filled in</div>
        );
      case "externalCatalogId":
        return values[props.source] ? (
          <Resource query={GET_ONE_EXTERNAL_CATALOG} resourceId={values[props.source]} />
        ) : (
          <div className="empty">Not filled in</div>
        );
      case "epgSourceId":
        return values[props.source] ? (
          <Resource query={GET_ONE_EPG_SOURCE} resourceId={values[props.source]} />
        ) : (
          <div className="empty">Not filled in</div>
        );
      case "channelVersionId":
        return values[props.source] ? (
          <Resource query={GET_ONE_CHANNEL_VERSION} resourceId={values[props.source]} />
        ) : (
          <div className="empty">Not filled in</div>
        );
      case "rightHolderId":
        return values[props.source] ? (
          <Resource query={GET_ONE_RIGHT_HOLDER} resourceId={values[props.source]} />
        ) : (
          <div className="empty">Not filled in</div>
        );
      default:
        return values[props.source] ? (
          values[props.source]
        ) : (
          <div className="empty">Not filled in</div>
        );
    }
  };

  return (
    <div>
      <label className={classes.label}>{props.label}</label>
      <div className={classes.AutoCompleteShowValue}>{getValue(props.source)}</div>
    </div>
  );
};

export const AutocompleteShow: React.FC<AutocompleteInputPropsRA> = (props) => {
  return (
    <EditInputComponent ComponentInput={AutocompleteInput} ComponentShow={ShowView} {...props} />
  );
};
