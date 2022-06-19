import * as React from "react";
import { authClient } from "../../../../../components/Providers/AuthProvider/client";
import { GET_EPG_SOURCES_TYPES } from "./requests";
import { StandardButton } from "../../../../../components/UI/Buttons/StandardButton/standard-button";
import { ArrayInputItemArrow, PlusIcon } from "../../../../../constants/icons";
import { Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MainLoader } from "../../../../../components/MainLoader";
import { TopToolBar } from "../../../../../constants/style-constants";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({ TopToolBar });

export const EPGSourceToolbar = React.memo(() => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [data, setData] = React.useState<{ href: string; type: string; name: string }[] | null>(
    null
  );
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  React.useEffect(() => {
    let unmounted = false;
    if (!unmounted) {
      try {
        const getTypes = async () => {
          const res = await authClient.query({
            query: GET_EPG_SOURCES_TYPES,
          });

          setData(res.data.items);
        };

        getTypes();
      } catch (e) {
        if (e instanceof Error) {
          console.log(e.message);
        }
      }
    }

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div className={classes.TopToolBar}>
      <StandardButton
        variant="contained"
        buttonType="primary"
        onClick={handleClick}
        startIcon={<PlusIcon />}
        endIcon={<ArrayInputItemArrow />}
        text="Create EPG source"
      />
      <Menu
        id="create-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        aria-haspopup="true"
        inputMode="text"
      >
        {data && data.length ? (
          data.map((link) => {
            return (
              <MenuItem
                key={link.href}
                component={Link}
                to={"/media_content/tv/tv_shows/epg_sources/" + link.href + "/create"}
              >
                {link.name}
              </MenuItem>
            );
          })
        ) : (
          <MainLoader size={10} />
        )}
      </Menu>
    </div>
  );
});
