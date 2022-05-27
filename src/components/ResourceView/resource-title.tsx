import React from "react";
import { useTranslate } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { useFormState } from "react-final-form";
import { EditIcon, TimeIcon } from "../../constants/icons";
import { Breadcrumbs } from "../Breadcrumbs/breadcrumbs";
import { DeleteButton } from "../UI/RA/delete-button";
import { StandardButton } from "../UI/Buttons/standard-button";
import { Link } from "react-router-dom";

export type TitleProps = {
  name: string;
  form?: string;
  id?: string;
  record?: any;
  breadCrumbsOn?: boolean;
  basePath?: string;
};

const useStyles = makeStyles((theme) => ({
  titleWrapper: {
    backgroundColor: "var(--primary-bg-3)",
    padding: "16px 24px",
  },
  ButtonsShow: {
    flexShrink: 0,
    "& button": {
      marginLeft: 10,
    },
  },
  title: {
    fontSize: 24,
    fontWeight: 600,
    display: "flex",
    lineHeight: "32px",
    justifyContent: "space-between",
  },
  topTitleWrapper: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 15,
    "& .time": {
      color: theme.palette.secondary.main,
      fontSize: 14,
      fontWeight: 500,
      "& svg": {
        verticalAlign: "middle",
        marginRight: 4,
      },
    },
  },
  bottomTitleWrapper: {},
  help: {
    lineHeight: 1,
    color: "var(--accent-color)",
    fontSize: 14,
    fontWeight: 500,
    display: "flex",
    alignItems: "center",
    "& svg": {
      marginRight: 5,
    },
  },
  backIcon: {
    marginRight: 10,
    cursor: "pointer",
  },
}));

export const ResourceTitle: React.FC<TitleProps> = ({
  name,
  form,
  breadCrumbsOn,
  children,
  ...props
}) => {
  const { values } = useFormState();
  const [title] = React.useState<string>((values.name || values.fullName) ?? "");
  const date = values.updatedAt ? new Date(values.updatedAt).toLocaleDateString() : "";
  const time = values.updatedAt ? new Date(values.updatedAt).toLocaleTimeString() : "";

  const translate = useTranslate();
  const classes = useStyles();

  return (
    <div className={classes.titleWrapper}>
      <div>
        {form === "show" && (
          <div className={classes.topTitleWrapper}>
            <span className="time">
              {(date || time) && <TimeIcon color="#005AA3" />}
              {date && `${date}`}
              {time && `, ${time}`}
            </span>
            <span className={classes.help}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.1139 6.51537C11.1139 5.9402 10.6107 5.43692 10.0355 5.43692C9.46032 5.43692 8.95705 5.9402 8.95705 6.51537C8.95705 7.09054 9.38842 7.59382 10.0355 7.59382C10.6826 7.59382 11.1139 7.09054 11.1139 6.51537ZM8.81794 14.5611H11.5832C11.998 14.5611 12.2745 14.3654 12.2745 13.9739C12.2745 13.5824 11.998 13.3214 11.5832 13.3214H11.0301C10.961 13.3214 10.8919 13.2562 10.8919 13.1909V10.059C10.8919 9.34131 10.2697 8.75408 9.50925 8.75408H8.81794C8.40315 8.75408 8.12662 9.01507 8.12662 9.40656C8.12662 9.79804 8.40315 10.059 8.81794 10.059H9.37099C9.44012 10.059 9.50925 10.1243 9.50925 10.1895V13.1257C9.50925 13.1909 9.44012 13.2562 9.37099 13.2562H8.81794C8.40315 13.2562 8.12662 13.5171 8.12662 13.9086C8.12662 14.3001 8.40315 14.5611 8.81794 14.5611ZM1.99951 10C1.99951 5.59817 5.59811 1.99957 9.99994 1.99957C14.4018 1.99957 18.0004 5.59817 18.0004 10C18.0004 14.4018 14.4018 18.0004 9.99994 18.0004C5.59811 18.0004 1.99951 14.4018 1.99951 10ZM9.99994 3.39957C6.3713 3.39957 3.39951 6.37136 3.39951 10C3.39951 13.6286 6.3713 16.6004 9.99994 16.6004C13.6286 16.6004 16.6004 13.6286 16.6004 10C16.6004 6.37136 13.6286 3.39957 9.99994 3.39957Z"
                  fill="var(--accent-color)"
                />
              </svg>
              Reference
            </span>
          </div>
        )}
        <div className={classes.bottomTitleWrapper}>
          <span className={classes.title}>
            {form && !["show", "edit"].includes(form) ? (
              <>
                {translate(["resources", name, "titles", form].join("."))}{" "}
                <span className={classes.help}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M11.1139 6.51537C11.1139 5.9402 10.6107 5.43692 10.0355 5.43692C9.46032 5.43692 8.95705 5.9402 8.95705 6.51537C8.95705 7.09054 9.38842 7.59382 10.0355 7.59382C10.6826 7.59382 11.1139 7.09054 11.1139 6.51537ZM8.81794 14.5611H11.5832C11.998 14.5611 12.2745 14.3654 12.2745 13.9739C12.2745 13.5824 11.998 13.3214 11.5832 13.3214H11.0301C10.961 13.3214 10.8919 13.2562 10.8919 13.1909V10.059C10.8919 9.34131 10.2697 8.75408 9.50925 8.75408H8.81794C8.40315 8.75408 8.12662 9.01507 8.12662 9.40656C8.12662 9.79804 8.40315 10.059 8.81794 10.059H9.37099C9.44012 10.059 9.50925 10.1243 9.50925 10.1895V13.1257C9.50925 13.1909 9.44012 13.2562 9.37099 13.2562H8.81794C8.40315 13.2562 8.12662 13.5171 8.12662 13.9086C8.12662 14.3001 8.40315 14.5611 8.81794 14.5611ZM1.99951 10C1.99951 5.59817 5.59811 1.99957 9.99994 1.99957C14.4018 1.99957 18.0004 5.59817 18.0004 10C18.0004 14.4018 14.4018 18.0004 9.99994 18.0004C5.59811 18.0004 1.99951 14.4018 1.99951 10ZM9.99994 3.39957C6.3713 3.39957 3.39951 6.37136 3.39951 10C3.39951 13.6286 6.3713 16.6004 9.99994 16.6004C13.6286 16.6004 16.6004 13.6286 16.6004 10C16.6004 6.37136 13.6286 3.39957 9.99994 3.39957Z"
                      fill="var(--accent-color)"
                    />
                  </svg>
                  Reference
                </span>
              </>
            ) : (
              <>
                {title ? title : translate(["resources", name, "titles", form].join("."))}
                {form === "show" && (
                  <div className={classes.ButtonsShow}>
                    <StandardButton
                      variant="textWithBg"
                      component={Link}
                      customColor="var(--primary-button-default)"
                      startIcon={<EditIcon color="var(--primary-button-default)" />}
                      to={props.basePath + `/${props.record.id}`}
                      text="Edit"
                    />
                    <DeleteButton redirect={props.basePath} record={props.record} />
                  </div>
                )}
              </>
            )}
          </span>
        </div>
      </div>
      {form !== "list" || breadCrumbsOn ? <Breadcrumbs resource={name} /> : null}
    </div>
  );
};
