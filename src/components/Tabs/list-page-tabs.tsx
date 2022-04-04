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
}

const useStyles = makeStyles((theme) => ({
  TabsList: {
    paddingTop: 14,
    paddingLeft: 24,
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
    borderBottom: `3px solid ${theme.palette.primary.main}`,
  },
}));

export const ListPageTabs: React.FC<ListPageTabsProps> = ({ tabs }) => {
  const history = useHistory();
  const classes = useStyles();
  return (
    <Box sx={{ maxWidth: "100%" }} className={classes.TabsList}>
      {tabs.map(({ link, name }: ListTabProps) => (
        <Link
          key={link + name}
          className={cn(
            classes.TabListLink,
            history.location.pathname.includes(link) && classes.TabListLinkActive
          )}
          to={link}
        >
          {name}
        </Link>
      ))}
    </Box>
  );
};
