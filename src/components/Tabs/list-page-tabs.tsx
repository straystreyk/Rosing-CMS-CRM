import * as React from "react";
import cn from "classnames";
import { Box, makeStyles } from "@material-ui/core";
import { Link } from "ra-ui-materialui";
import { useHistory } from "react-router-dom";
import { scrollBarStyles } from "../Themes/main-styles";
import { StandardButton } from "../UI/Buttons/StandardButton/standard-button";

export interface ListTabProps {
  link: string;
  name: string;
}

interface ListPageTabsProps {
  tabs: ListTabProps[];
  isSubTabs?: boolean;
}

const useStyles = makeStyles((theme) => ({
  TabsList: {
    paddingLeft: 24,
    paddingRight: 20,
    display: "flex",
    overflow: "auto",
    ...scrollBarStyles,
  },
  TabListLink: {
    padding: "0px 0px 10px 0px",
    fontSize: 18,
    borderRadius: 0,
    marginRight: 24,
    transition: "0.35s all ease",
    minWidth: "unset",
    flexShrink: 0,
    borderBottom: `3px solid transparent`,
    "&:hover": {
      color: "var(--accent-color-hover)",
      borderColor: "var(--accent-color-hover)",
      backgroundColor: "transparent",
    },
    "&:focus": {
      outline: "none",
    },
    "& span.MuiButton-label": {
      fontWeight: 600,
    },
    "&:last-child": {
      marginRight: 0,
    },
  },
  TabListLinkActive: {
    borderBottom: `3px solid var(--accent-color)`,
  },
  SubTabsList: {
    display: "flex",
    flexWrap: "wrap",
    paddingLeft: 24,
    paddingRight: 20,
    marginTop: 13,
    borderBottom: `1px solid var(--secondary-color-disable)`,
    ...scrollBarStyles,
  },
  SubTabListLink: {
    color: "var(--secondary-color-default)",
    transition: "0.35s all ease",
    fontSize: 14,
    lineHeight: "20px",
    minWidth: "unset",
    borderBottom: `3px solid transparent`,
    marginRight: 12,
    borderRadius: 0,
    padding: "0 0 10px 0",
    flexShrink: 0,
    "&:hover": {
      color: "var(--secondary-color-main)",
      borderBottom: `3px solid var(--secondary-color-main)`,
      backgroundColor: "transparent",
    },
    "&:focus": {
      outline: "none",
    },
    "& span": {
      fontWeight: 500,
    },
    "&:last-child": {
      marginRight: 0,
    },
  },
  SubTabListLinkActive: {
    color: "var(--secondary-color-main)",
    borderBottom: `3px solid var(--secondary-color-main)`,
  },
}));

export const ListPageTabs: React.FC<ListPageTabsProps> = ({ tabs, isSubTabs }) => {
  const history = useHistory();
  const classes = useStyles();

  return (
    <Box sx={{ maxWidth: "100%" }} className={!isSubTabs ? classes.TabsList : classes.SubTabsList}>
      {tabs.map(({ link, name }: ListTabProps) => (
        <React.Fragment key={link + name}>
          <StandardButton
            component={Link}
            to={link}
            buttonType="primary"
            className={
              !isSubTabs
                ? cn(
                    classes.TabListLink,
                    history.location.pathname.includes(link) && classes.TabListLinkActive
                  )
                : cn(
                    classes.SubTabListLink,
                    history.location.pathname.includes(link) && classes.SubTabListLinkActive
                  )
            }
            text={name}
          />
        </React.Fragment>
      ))}
    </Box>
  );
};
