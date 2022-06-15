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
import { StandardInputShowView } from "../../StandatdInputs/standard-input-show-view";

const useStyles = makeStyles({
  ArrayInputShowWrapper: {
    width: "100%",
    paddingTop: 6,
    marginBottom: 6,
    "& .empty": {
      color: "var(--secondary-color-default)",
      borderBottom: "1px solid #E7E9E9",
      paddingBottom: 12,
    },
    "& .label": {
      cursor: "pointer",
      marginBottom: 8,
      "& svg": {
        marginLeft: 9,
      },
    },
  },
  OffWrapper: {
    padding: 0,
    margin: 0,
    "&.active": {
      paddingBottom: 12,
    },
  },
});

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
          <EmptyInput emptyText="Empty" tag="div" />
        );
    }
  };

  return (
    <div className={classes.ArrayInputShowWrapper}>
      <StandardInputShowView
        label={label}
        options={{
          label: {
            onClick: () => setOpen((p) => !p),
            icon: <ArrayInputItemArrow color="var(--secondary-color-main)" />,
            className: "label",
          },
        }}
      >
        <Collapse in={open} timeout="auto">
          {getValue(source)}
        </Collapse>
      </StandardInputShowView>
    </div>
  );
};

export const ArrayInputNoDragShow: React.FC<ArrayInputProps> = (props) => {
  const classes = useStyles();
  return (
    <EditInputComponent
      ComponentInput={ArrayInputNoDragOrigin}
      ComponentShow={ShowView}
      showWrapperClassName={classes.OffWrapper}
      borderOff
      {...props}
    />
  );
};
