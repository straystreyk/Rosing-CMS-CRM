import * as React from "react";
import cn from "classnames";
import { InputProps } from "ra-core";
import { makeStyles } from "@material-ui/core";
import { useFormState } from "react-final-form";

import { EditInputComponent } from "../../edit-input-component";
import { TextInputStyles } from "./styles";
import { TextInputOrigin } from "./text-input";
import { formatTimeInput } from "../../index";

const useStyles = makeStyles({
  TextInputStyles,
  TextInputShowValue: {
    marginTop: 4,
    position: "relative",
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--primary-text-default)",
    "& span.empty": {
      color: "var(--secondary-color-default)",
    },
    "& > p": {
      display: "-webkit-box",
      "-webkit-box-orient": "vertical",
      "-webkit-line-clamp": 6,
      overflow: "hidden",
    },
    "&.active > p": {
      display: "block",
    },
    "& img": {
      width: "100%",
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

const Empty = () => <span className="empty">Not filled in</span>;

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

  const getValue = (source: string) => {
    switch (source) {
      case "searchKeywords":
        return values[props.source].length ? values[props.source].join(", ") : <Empty />;
      case "duration":
        return values[props.source] ? formatTimeInput(values[props.source]) : <Empty />;
      default:
        return values[props.source] ? (
          <span dangerouslySetInnerHTML={{ __html: values[props.source] }} />
        ) : (
          <Empty />
        );
    }
  };

  React.useEffect(() => {
    if (ref.current && ref.current.scrollHeight > 120) {
      setIsBigText(true);
    }
  }, [ref, getValue]);

  return (
    <div className={classes.TextInputStyles}>
      <label>{props.label}</label>
      <div className={cn(classes.TextInputShowValue, activeText && "active")}>
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
