import * as React from 'react';
import { ExportButton as ExportButtonRA, ExportButtonProps } from 'ra-ui-materialui';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  ExportButton: {
    '& .MuiButton-startIcon': {
      marginLeft: 0,
      marginRight: 6,
    },
    '& .MuiButton-label span': {
      paddingLeft: 0,
    },
    '&:focus': {
      outline: '2px solid #7FC5FF',
      outlineOffset: '2px',
    },
  },
});

export const ExportButton: React.FC<ExportButtonProps> = ({ startIcon, label, basePath, endIcon }) => {
  const classes = useStyles();

  return (
    <ExportButtonRA
      className={classes.ExportButton}
      endIcon={endIcon}
      startIcon={startIcon}
      basePath={basePath}
      label={label}
      icon={<></>}
    />
  );
};