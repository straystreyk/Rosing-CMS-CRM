import * as React from "react";
import { Switch } from "../UI/MaterialUI/switch";
import { makeStyles } from "@material-ui/core";
import { CSSTransition } from "react-transition-group";
import cn from "classnames";

const useStyles = makeStyles({
  GroupInputWrapper: {
    paddingTop: 8,
    marginBottom: 8,
  },
  GroupInputs: {
    padding: "5px 24px",
    backgroundColor: "#F0F8FF",
    borderRadius: 4,
  },
  GroupInputsLabelWrapper: {
    fontSize: 14,
    fontFamily: "Gilroy, sans-serif",
    fontWeight: 500,
    lineHeight: "20px",
    display: "inline-block",
    marginBottom: 5,
    "& > span": {
      marginRight: 5,
    },
  },
  GroupHelperText: {
    fontFamily: "Gilroy, sans-serif",
    fontSize: 12,
    color: "#9FA5A8",
    marginTop: 3,
    lineHeight: "16px",
  },
});

interface GroupInputsProps {
  label?: string;
  initialView?: boolean;
  switchable?: boolean;
  groupHelperText?: string;
  className?: string;
}

export const GroupInputs: React.FC<GroupInputsProps> = ({
  label,
  children,
  initialView,
  switchable,
  className,
  groupHelperText,
}) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(initialView || false);
  const nodeRef = React.useRef<any>(null);

  return (
    <div className={cn(classes.GroupInputWrapper, className)}>
      {label && (
        <span
          style={{ cursor: switchable ? "pointer" : "" }}
          onClick={() => setShow((p) => !p)}
          className={classes.GroupInputsLabelWrapper}
        >
          <span>{label && label} </span>
          {switchable && <Switch checked={show} />}
          {groupHelperText && <p className={classes.GroupHelperText}>{groupHelperText}</p>}
        </span>
      )}
      {switchable ? (
        <CSSTransition
          nodeRef={nodeRef}
          unmountOnExit
          mountOnEnter
          timeout={200}
          in={show}
          classNames="fade"
        >
          <div ref={nodeRef} className={classes.GroupInputs}>
            {children}
          </div>
        </CSSTransition>
      ) : (
        <div ref={nodeRef} className={classes.GroupInputs}>
          {children}
        </div>
      )}
    </div>
  );
};
