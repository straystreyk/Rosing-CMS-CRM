import * as React from "react";
import { makeStyles } from "@material-ui/core";
import cn from "classnames";

interface SectionProps {
  text: string | any[];
  title: string;
  formType?: string;
  id: string;
}

const useStyles = makeStyles((theme) => ({
  Section: {
    marginTop: 24,
    marginBottom: 32,
    "& > button.descriptionButton": {
      fontSize: 14,
      lineHeight: "20px",
      color: "#005AA3",
      fontWeight: 500,
      cursor: "pointer",
      marginBottom: 4,
      "& svg": {
        marginLeft: 11,
        verticalAlign: "middle",
      },
    },
  },
  TitleSection: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: "22px",
    color: theme.palette.secondary.main,
    marginBottom: 8,
    cursor: "pointer",
    "& > svg": {
      marginLeft: 8,
      verticalAlign: "middle",
    },
  },
  TextSection: {
    fontSize: 14,
    lineHeight: "20px",
    color: "#023864",
    marginBottom: 8,
  },
  ActiveSvg: {
    transform: "rotate(180deg)",
  },
}));

export const FormSection: React.FC<SectionProps> = React.forwardRef(
  ({ text, title, formType, children, id }, ref) => {
    const [showDescription, setShowDescription] = React.useState(formType === "create");
    const [showSection, setShowSection] = React.useState(true);
    const classes = useStyles();

    const descHandler = React.useCallback((e) => {
      e.preventDefault();
      setShowDescription((p) => !p);
    }, []);

    return (
      <div className={classes.Section} id={id}>
        <div className={classes.TitleSection} onClick={() => setShowSection((p) => !p)}>
          {title}
          <svg
            className={cn(!showSection && classes.ActiveSvg)}
            width="8"
            height="5"
            viewBox="0 0 8 5"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.61621 0.691425L3.99992 3.30772L1.38379 0.691406"
              stroke="#005AA3"
              strokeWidth="1.3"
              strokeLinecap="round"
            />
          </svg>
        </div>
        {showSection && (
          <button className="descriptionButton" onClick={descHandler}>
            {showDescription ? "Hide description" : "Show description"}
            <svg
              className={cn(!showDescription && classes.ActiveSvg)}
              width="8"
              height="5"
              viewBox="0 0 8 5"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.61621 0.691425L3.99992 3.30772L1.38379 0.691406"
                stroke="#005AA3"
                strokeWidth="1.3"
                strokeLinecap="round"
              />
            </svg>
          </button>
        )}
        {showSection && showDescription && (
          <div className={classes.TextSection}>{text && text}</div>
        )}
        <div style={{ height: !showSection ? 0 : "auto", overflow: !showSection ? "hidden" : "" }}>
          {children}
        </div>
      </div>
    );
  }
);
