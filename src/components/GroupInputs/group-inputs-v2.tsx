import * as React from "react";
import { Collapse, makeStyles } from "@material-ui/core";
import { ArrayInputItemArrow } from "../../constants/icons";
import cn from "classnames";

export type GroupInputsV2Props = { title?: string; offCollapse?: boolean };

const useStyles = makeStyles({
  GroupInputTitle: {
    padding: "12px 24px",
    backgroundColor: "var(--primary-bg)",
    textAlign: "left",
    marginTop: 12,
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
    "& span": {
      fontWeight: 500,
      color: "var(--secondary-color-main)",
      fontSize: 14,
      "& .icon": {
        width: 8,
        marginLeft: 8,
      },
    },
    "&.hide": {
      borderRadius: 4,
    },
  },
  ChildrenWrapper: {
    padding: "4px 24px",
    backgroundColor: "var(--primary-bg-3)",
  },
  GroupInputsV2: {
    position: "relative",
  },
});

export const GroupInputsV2: React.FC<GroupInputsV2Props> = ({ title, offCollapse, children }) => {
  const classes = useStyles();
  const [show, setShow] = React.useState(true);

  const showInputs = (e: React.MouseEvent) => {
    e.preventDefault();
    setShow((p) => !p);
  };

  return (
    <div className={classes.GroupInputsV2}>
      {title && (
        <div className={cn(classes.GroupInputTitle, !show && "hide")}>
          <button onClick={showInputs}>
            <span>
              {title} {!offCollapse && <ArrayInputItemArrow className="icon" />}
            </span>
          </button>
          {}
        </div>
      )}
      <Collapse in={show}>
        <div className={classes.ChildrenWrapper}>{children}</div>
      </Collapse>
    </div>
  );
};
