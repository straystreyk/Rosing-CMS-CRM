import * as React from 'react';
import { CreateButton as CreateButtonRA, CreateButtonProps } from 'ra-ui-materialui';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  CreateButton: {
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

export const CreateButton: React.FC<CreateButtonProps> = ({ basePath, endIcon, startIcon, label }) => {
  const classes = useStyles();

  return (
    <CreateButtonRA
      icon={<></>}
      endIcon={endIcon}
      className={classes.CreateButton}
      basePath={basePath}
      startIcon={startIcon}
      label={label}
    />
  );
};