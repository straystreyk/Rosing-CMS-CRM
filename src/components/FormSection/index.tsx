import * as React from "react";
import { Collapse, makeStyles } from "@material-ui/core";
import { ArrayInputItemArrow } from "../../constants/icons";

interface SectionProps {
  text?: string | any[];
  title?: string;
  formType: string;
  id?: string;
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
    "& .icon": {
      marginLeft: 11,
      width: 8,
      display: "inline-block",
    },
  },
  TitleSection: {
    fontWeight: 600,
    fontSize: 18,
    lineHeight: "22px",
    color: theme.palette.secondary.main,
    marginBottom: 8,
    display: "inline-block",
    cursor: "pointer",
    "& .icon": {
      width: 8,
      verticalAlign: "middle",
      marginLeft: 11,
    },
  },
  TextSection: {
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--primary-text-default)",
    marginBottom: 8,
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
      <span>
        <ArrayInputItemArrow className="icon" />
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
        {title && (
          <div className={classes.TitleSection} onClick={() => setShowSection((p) => !p)}>
            {title}
            <ArrayInputItemArrow className="icon" />
          </div>
        )}
        <Collapse in={showSection} timeout="auto">
          {["create", "edit"].includes(formType) && text && (
            <>
              <ShowDescriptionButton
                setShowDescription={setShowDescription}
                showDescription={showDescription}
              />

              <Collapse in={showDescription} timeout="auto">
                <div className={classes.TextSection}>
                  {text && typeof text !== "string"
                    ? text.map((string, index) => (
                        <React.Fragment key={index}>{string}</React.Fragment>
                      ))
                    : text}
                </div>
              </Collapse>
            </>
          )}
          {children}
        </Collapse>
      </div>
    );
  }
);
