import * as React from "react";
import { Box, makeStyles } from "@material-ui/core";
import { Link } from "ra-ui-materialui";
import cn from "classnames";
import { useHistory } from "react-router-dom";

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
    paddingTop: 14,
    paddingLeft: 24,
    paddingRight: 20,
    display: "flex",
  },
  TabListLink: {
    paddingBottom: 10,
    fontSize: 18,
    fontWeight: 600,
    marginRight: 24,
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
  },
  SubTabListLink: {
    color: "var(--secondary-color-main)",
    fontSize: 14,
    lineHeight: "20px",
    fontWeight: 500,
    marginRight: 12,
    paddingBottom: 4,
  },
  SubTabListLinkActive: {
    borderBottom: `3px solid var(--secondary-color-main)`,
  },
}));

export const ListPageTabs: React.FC<ListPageTabsProps> = ({ tabs, isSubTabs }) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Box sx={{ maxWidth: "100%" }} className={!isSubTabs ? classes.TabsList : classes.SubTabsList}>
      {tabs.map(({ link, name }: ListTabProps) => (
        <Link
          key={link + name}
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
          to={link}
        >
          {name}
        </Link>
      ))}
    </Box>
  );
};
