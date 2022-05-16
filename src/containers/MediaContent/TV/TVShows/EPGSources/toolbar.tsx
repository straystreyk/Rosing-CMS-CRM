import * as React from "react";
import { authClient } from "../../../../../components/Providers";
import { GET_EPG_SOURCES_TYPES } from "./requests";
import { StandardButton } from "../../../../../components/UI/Buttons/standard-button";
import { ArrayInputItemArrow, PlusIcon } from "../../../../../constants/icons";
import { Menu, MenuItem } from "@material-ui/core";
import { Link } from "react-router-dom";
import { MainLoader } from "../../../../../components/MainLoader";

export const EPGSourceToolbar = React.memo(() => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [data, setData] = React.useState<{ href: string; type: string; name: string }[] | null>(
    null
  );

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
    <div>
      <StandardButton
        variant="contained"
        color="primary"
        onClick={handleClick}
        startIcon={<PlusIcon color="#fff" />}
        endIcon={<ArrayInputItemArrow color="#fff" />}
      >
        Create EPG source
      </StandardButton>
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