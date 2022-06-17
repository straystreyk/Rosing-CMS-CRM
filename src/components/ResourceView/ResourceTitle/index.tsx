import React from "react";
import { useTranslate } from "react-admin";
import { makeStyles } from "@material-ui/core";
import { useFormState } from "react-final-form";
import { EditIcon, InformationIcon, TimeIcon } from "../../../constants/icons";
import { Breadcrumbs } from "../../Breadcrumbs/breadcrumbs";
import { DeleteButton } from "../../UI/RA/delete-button";
import { StandardButton } from "../../UI/Buttons/StandardButton/standard-button";
import { Link } from "react-router-dom";
import { ExportStatusWidget } from "../../Export/ExportStatusWidget";
import { ResourceTitleStyles } from "./styles";
import { TitleProps } from "./types";

const useStyles = makeStyles(ResourceTitleStyles);

export const ResourceTitle: React.FC<TitleProps> = ({
  name,
  form,
  breadCrumbsOn,
  children,
  actionButtons: ActionButtons,
  ...props
}) => {
  const classes = useStyles();
  const translate = useTranslate();
  const { values } = useFormState();
  const date = values.updatedAt ? new Date(values.updatedAt).toLocaleDateString() : "";
  const time = values.updatedAt ? new Date(values.updatedAt).toLocaleTimeString() : "";
  const [title] = React.useState<string>(
    (values.name || values.fullName || values.questionTemplate) ?? ""
  );

  return (
    <>
      <ExportStatusWidget resource={name} />
      <div className={classes.titleWrapper}>
        <div>
          {form === "show" && date && time && (
            <div className={classes.topTitleWrapper}>
              <span className="time">
                {(date || time) && <TimeIcon color="#005AA3" />}
                {date && `${date}`}
                {time && `, ${time}`}
              </span>
              <span className={classes.help}>
                <InformationIcon color="var(--accent-color)" />
                Reference
              </span>
            </div>
          )}
          <div className={classes.bottomTitleWrapper}>
            <span className={classes.title}>
              {form && !["show", "edit"].includes(form) ? (
                <>
                  <span>{translate(["resources", name, "titles", form].join("."))}</span>
                  <span className={classes.help}>
                    <InformationIcon color="var(--accent-color)" />
                    Reference
                  </span>
                </>
              ) : (
                <>
                  {title ?? translate(["resources", name, "titles", form].join("."))}
                  {form === "show" && (
                    <div className={classes.ButtonsShow}>
                      {ActionButtons && <ActionButtons />}
                      <StandardButton
                        variant="text"
                        component={Link}
                        buttonType="secondary"
                        startIcon={<EditIcon />}
                        to={props.basePath + `/${props.record.id}`}
                        text="Edit"
                      />
                      <DeleteButton
                        variant="text"
                        redirect={props.basePath}
                        record={props.record}
                      />
                    </div>
                  )}
                </>
              )}
            </span>
          </div>
        </div>
        {form !== "list" || breadCrumbsOn ? <Breadcrumbs resource={name} /> : null}
      </div>
    </>
  );
};
