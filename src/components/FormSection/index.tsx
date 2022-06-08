import * as React from "react";
import { Collapse, makeStyles } from "@material-ui/core";
import cn from "classnames";
import { ArrowFilterIcon } from "../CustomFilters/constants";

interface SectionProps {
  text: string | any[];
  title: string;
  formType: string;
  id: string;
}

const useStyles = makeStyles((theme) => ({
  Section: {
    marginTop: 24,
    marginBottom: 32,
  },
  DescriptionButton: {
    fontSize: 14,
    lineHeight: "20px",
    color: "#005AA3",
    fontWeight: 500,
    cursor: "pointer",
    marginBottom: 4,
    "& span": {
      marginLeft: 11,
      display: "inline-block",
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
    color: "var(--primary-text-default)",
    marginBottom: 8,
  },
  ActiveSvg: {
    transform: "rotate(180deg)",
  },
}));

export const ShowDescriptionButton: React.FC<{
  showDescription: boolean;
  setShowDescription: React.Dispatch<React.SetStateAction<boolean>>;
}> = ({ setShowDescription, showDescription }) => {
  const classes = useStyles();
  const descHandler = React.useCallback(
    (e) => {
      e.preventDefault();
      setShowDescription((p) => !p);
    },
    [setShowDescription]
  );

  return (
    <button className={classes.DescriptionButton} onClick={descHandler}>
      {showDescription ? "Hide description" : "Show description"}
      <span className={cn(!showDescription && classes.ActiveSvg)}>
        <ArrowFilterIcon color="#005AA3" />
      </span>
    </button>
  );
};

export const FormSection: React.FC<SectionProps> = React.forwardRef(
  ({ text, title, formType, children, id }, ref) => {
    const [showDescription, setShowDescription] = React.useState<boolean>(formType === "create");
    const [showSection, setShowSection] = React.useState(true);
    const classes = useStyles();

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
        <Collapse in={showSection} timeout="auto">
          <ShowDescriptionButton
            setShowDescription={setShowDescription}
            showDescription={showDescription}
          />
          <Collapse in={showDescription} timeout="auto">
            <div className={classes.TextSection}>
              {text && typeof text !== "string"
                ? text.map((string, index) => <React.Fragment key={index}>{string}</React.Fragment>)
                : text}
            </div>
          </Collapse>
          {children}
        </Collapse>
      </div>
    );
  }
);
