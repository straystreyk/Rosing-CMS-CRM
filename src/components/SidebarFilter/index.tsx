import React from 'react';
import * as lodash from 'lodash';
import { Card as MuiCard, CardContent, withStyles } from '@material-ui/core';


const Card = withStyles(theme => ({
  root: {
    [theme.breakpoints.up('md')]: {
      order: 1, // display on the left rather than on the right of the list
      maxWidth: '15em',
      marginLeft: '1em',
    },
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}))(MuiCard);

export const FilterSidebar = (props: any) => {
  if (!props.sideFilters) return null;
  const filters: [] = lodash.cloneDeep(props.sideFilters);
  return (
    <Card>
      <CardContent>
        {filters.map((filter: any, index: number) => {
          filter.key = index;
          return filter;
        })}
      </CardContent>
    </Card>
  );
};