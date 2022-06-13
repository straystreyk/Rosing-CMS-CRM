import * as React from "react";
import cn from "classnames";
import { InputProps } from "ra-core";
import { makeStyles } from "@material-ui/core";
import { useFormState } from "react-final-form";

import { EditInputComponent } from "../../edit-input-component";
import { TextInputStyles } from "./styles";
import { TextInputOrigin } from "./text-input";
import { formatTimeInput } from "../../index";
import { EmptyInput, TextInputShowValue } from "../../styles";

const useStyles = makeStyles({
  TextInputStyles,
  TextInputShowValue: {
    ...TextInputShowValue,
    "& > p": {
      display: "-webkit-box",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": 3,
      overflow: "hidden",
    },
    "&.active > p": {
      display: "block",
    },
    "& img": {
      width: "100%",
    },
  },
  IDField: {
    "& p": {
      wordBreak: "break-all",
    },
  },
  ShowMoreButton: {
    position: "absolute",
    bottom: 1,
    fontSize: 14,
    right: 0,
    zIndex: 1,
    color: "var(--primary-button-default)",
    textDecoration: "underline",
    backgroundColor: "#fff",
    "&::before": {
      position: "absolute",
      content: "'...'",
      top: 0,
      left: 0,
      height: "100%",
      transform: "translateX(-100%)",
      backgroundColor: "#fff",
      zIndex: 1,
    },
    "&::after": {
      position: "absolute",
      content: "''",
      top: 0,
      width: 20,
      left: 0,
      height: "100%",
      transform: "translateX(-100%)",
      backgroundColor: "#fff",
      filter: "blur(2px)",
    },
  },
});

const ShowView: React.FC<InputProps> = (props) => {
  const { values } = useFormState();
  const [isBigText, setIsBigText] = React.useState(false);
  const [activeText, setActiveText] = React.useState(false);
  const ref = React.useRef<HTMLParagraphElement>(null);
  const classes = useStyles();

  const showText = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setActiveText(true);
  };

  const getValue: (source: string) => JSX.Element = React.useCallback(
    (source) => {
      switch (source) {
        case "searchKeywords":
          return values[props.source] && values[props.source].length ? (
            values[props.source].join(", ")
          ) : (
            <EmptyInput emptyText="Empty" />
          );
        case "duration":
          return values[props.source] ? (
            formatTimeInput(values[props.source])
          ) : (
            <EmptyInput emptyText="Empty" />
          );
        default:
          return values[props.source] ? (
            <span dangerouslySetInnerHTML={{ __html: values[props.source] }} />
          ) : (
            <EmptyInput emptyText="Empty" />
          );
      }
    },
    [values, props.source]
  );

  React.useEffect(() => {
    if (ref.current && ref.current.scrollHeight >= 60) {
      setIsBigText(true);
    }
  }, [ref, getValue]);

  return (
    <div className={classes.TextInputStyles}>
      <label>{props.label}</label>
      <div
        className={cn(
          classes.TextInputShowValue,
          props.source.includes("Id") || props.source === "id" ? classes.IDField : "",
          activeText && "active"
        )}
      >
        <p ref={ref}>{getValue(props.source)}</p>
        {isBigText && !activeText && (
          <button onClick={showText} className={classes.ShowMoreButton}>
            Show more
          </button>
        )}
      </div>
    </div>
  );
};

export const TextInputShow: React.FC<InputProps> = (props) => {
  return (
    <EditInputComponent
      ComponentInput={props.ComponentInput ?? TextInputOrigin}
      ComponentShow={ShowView}
      {...props}
    />
  );
};
