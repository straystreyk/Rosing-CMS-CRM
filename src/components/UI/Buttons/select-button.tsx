import * as React from "react";
import cn from "classnames";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import { authClient } from "../../Providers/AuthProvider/client";
import { DocumentNode, useQuery } from "@apollo/client";
import { MainLoader } from "../../MainLoader";
import { ImageProps } from "../../ImageUploader/types";
import { outlineStyles } from "../../Themes/main-styles";
import { ButtonTypes, StandardButton } from "./StandardButton/standard-button";
import { PlusIcon } from "../../../constants/icons";

const useStyles = makeStyles({
  SelectButtonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  PushButton: {
    transition: "0.35s color ease, 0.35s background-color ease",
    padding: "6px 16px",
    "& svg path": {
      transition: "0.35s fill ease",
    },
    "&:focus": {
      outline: outlineStyles,
    },
    "&:hover": {
      color: "var(--accent-color-hover)",
      backgroundColor: "transparent",
    },
  },
  Icon: {
    width: 20,
  },
});

export interface ImageTypesProps {
  kind: string;
  prettyName: string;
}

export const SelectButton: React.FC<{
  query: DocumentNode;
  pushResource: (kind: string, prettyName: string) => void;
  label: string;
  icon?: React.ReactElement;
  buttonClassName?: string;
  images?: ImageProps[];
  setServerImages?: any;
  name?: string;
  value?: string;
  variables?: {};
  buttonType?: ButtonTypes;
}> = React.memo(
  ({
    query,
    pushResource,
    label,
    icon,
    buttonClassName,
    images,
    name,
    value,
    variables,
    buttonType = "primary",
    ...props
  }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const classes = useStyles();
    const [resource, setResource] = React.useState<ImageTypesProps[]>([]);
    const { loading, data, error } = useQuery(query, {
      client: authClient,
      variables: variables ?? {},
    });

    React.useEffect(() => {
      if (!loading && data) {
        setResource(data.items);
      }
    }, [loading, data, images]);

    React.useEffect(() => {
      if (images && data) {
        images.forEach((image) => {
          setResource((p) => p.filter((el) => el.kind !== image.kind));
        });
      }
    }, [images, data]);

    if (loading) return <MainLoader component="span" size={30} flex centered />;
    if (error) return <div>Something went wrong</div>;
    if (!data) return null;

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(event.currentTarget);
    };

    const handleClose = (e: React.BaseSyntheticEvent) => {
      const value = e.target.getAttribute("value");
      if (value) {
        const prettyName = e.target.innerText;
        pushResource(value, prettyName);
      }
      setAnchorEl(null);
    };

    if (!resource.length) return null;

    return (
      <div className={classes.SelectButtonWrapper}>
        <StandardButton
          id="basic-button"
          className={cn(classes.PushButton, buttonClassName && buttonClassName)}
          variant="text"
          startIcon={icon ?? <PlusIcon className={classes.Icon} />}
          aria-controls={open ? "basic-menu" : undefined}
          aria-haspopup="true"
          aria-expanded={open ? "true" : undefined}
          buttonType={buttonType}
          onClick={handleClick}
          text={label}
        />
        <Menu
          id="select-basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          MenuListProps={{
            "aria-labelledby": "select-basic-button",
          }}
        >
          {resource.map((el: any, index) => (
            <MenuItem key={index} onClick={handleClose} value={value ? el[value] : el.kind}>
              {name
                ? el[name].charAt(0).toUpperCase() + el[name].slice(1)
                : el.prettyName.charAt(0).toUpperCase() + el.prettyName.slice(1)}
            </MenuItem>
          ))}
        </Menu>
      </div>
    );
  }
);
