import * as React from "react";
import { makeStyles, Menu, MenuItem } from "@material-ui/core";
import { authClient } from "../../Providers";
import { useQuery } from "@apollo/client";
import { ButtonPrimary } from "./primary-button";
import { CreateIcon } from "../../../constants/forms-constants";
import { MainLoader } from "../../MainLoader";
import cn from "classnames";

const useStyles = makeStyles((theme) => ({
  SelectButtonWrapper: {
    display: "flex",
    justifyContent: "center",
  },
  PushButton: {
    backgroundColor: "transparent",
    color: theme.palette.primary.main,
    transition: "0.35s color ease",
    padding: "6px 8px",
    "& svg path": {
      transition: "0.35s fill ease",
    },
    "&:focus": {
      outline: "none",
    },
    "&:hover": {
      color: "#00D6B5",
      backgroundColor: "transparent",
      "& svg path": {
        fill: "#00D6B5",
      },
    },
  },
}));

export const SelectButton: React.FC<{
  query: any;
  pushResource: (kind: string, prettyName: string) => void;
  label: string;
  icon?: React.ReactElement;
  buttonClassName?: string;
}> = ({ query, pushResource, label, icon, buttonClassName, ...props }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const classes = useStyles();
  const { loading, data, error } = useQuery(query, {
    client: authClient,
  });
  const [resource, setResource] = React.useState([]);

  React.useEffect(() => {
    if (!loading && data) {
      setResource(data[Object.keys(data)[0]]);
    }
  }, [loading, data]);

  if (loading) return <MainLoader size={30} centered />;
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

  return (
    <div className={classes.SelectButtonWrapper}>
      <ButtonPrimary
        id="basic-button"
        className={cn(classes.PushButton, buttonClassName && buttonClassName)}
        variant="text"
        startIcon={icon ?? <CreateIcon color="#00A991" />}
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        {label}
      </ButtonPrimary>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {resource.map((el: any, index) => (
          <MenuItem key={index} onClick={handleClose} value={el.kind}>
            {el.prettyName}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
