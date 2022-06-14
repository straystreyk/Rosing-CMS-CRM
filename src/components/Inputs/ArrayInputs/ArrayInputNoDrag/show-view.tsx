import * as React from "react";
import { Collapse, makeStyles, Tooltip } from "@material-ui/core";
import { useFormState } from "react-final-form";

import { EditInputComponent } from "../../edit-input-component";
import { ArrayInputNoDragOrigin } from "./array-input-no-drag";
import { EmptyInput, labelStyles } from "../../styles";
import { ArrayInputProps } from "../Arrayinput/array-input";
import { ExtraVideos, ExtraVideoType, MetadataShow, MetadataType } from "./views/metadata";
import { AgeRating, RatingShow } from "./views/rating";
import { ArrayInputItemArrow } from "../../../../constants/icons";

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
  ArrayInputShowWrapper: {
    width: "100%",
    fontSize: 14,
    "& label": {
      ...labelStyles,
      marginBottom: 8,
      cursor: "pointer",
      "& svg": {
        marginLeft: 4,
      },
    },
    "& .empty": {
      color: "var(--secondary-color-default)",
      borderBottom: "1px solid #E7E9E9",
      paddingBottom: 8,
    },
  },
}));

const ShowView: React.FC<ArrayInputProps> = ({ source, label, ...props }) => {
  const { values } = useFormState();
  const [open, setOpen] = React.useState(true);
  const classes = useStyles();

  const getValue = (source: string) => {
    switch (source) {
      case "extraVideos":
        return values[source] && values[source].length ? (
          values[source].map((el: ExtraVideoType, index: number) => {
            return (
              <ExtraVideos
                kind={el.kind}
                streamSourceId={el.streamSourceId}
                name={el.name}
                key={index.toString()}
              />
            );
          })
        ) : (
          <EmptyInput emptyText="Empty" tag="div" />
        );
      case "metadata":
        return values[source] && values[source].length ? (
          values[source].map((el: MetadataType, index: number) => (
            <MetadataShow metaKey={el.key} value={el.value} key={index.toString()} />
          ))
        ) : (
          <EmptyInput tag="div" emptyText="Empty" />
        );
      default:
        return values[source] && values[source].length ? (
          values[source].map((el: AgeRating, index: number) => {
            return <RatingShow system={el.system} tag={el.tag} key={index.toString()} />;
          })
        ) : (
          <EmptyInput emptyText="Empty" />
        );
    }
  };

  return (
    <div className={classes.ArrayInputShowWrapper}>
      <label onClick={() => setOpen((p) => !p)}>
        {label} <ArrayInputItemArrow color="var(--secondary-color-main)" />
      </label>
      <Collapse in={open} timeout="auto">
        {getValue(source)}
      </Collapse>
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
