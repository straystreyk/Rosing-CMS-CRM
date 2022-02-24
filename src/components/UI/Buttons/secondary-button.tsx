import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

interface ButtonSecondary {
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  text?: string;
  className?: string;
  onClick?: () => void;
}

const useStyles = makeStyles({
  SecondaryButton: {
    color: '#005AA3',
    padding: '8px 20px',
    fontSize: '14px',
    maxHeight: 36,
    textTransform: 'none',
    border: '1px solid #005AA3',
    transition: '0.35s color ease, 0.35s border ease',
    '& .text-custom-btn': {
      lineHeight: '20px',
    },
    '& .MuiButton-startIcon svg circle': {
      transition: '0.35s all ease',
    },
    '& .MuiButton-startIcon svg line': {
      transition: '0.35s all ease',
    },
    '& .MuiButton-label > .MuiButton-startIcon': {
      marginRight: 6,
    },
    '&:hover': {
      border: '1px solid #008DFF',
      color: '#008DFF',
      background: 'transparent',
      '& .MuiButton-startIcon svg circle': {
        stroke: '#008DFF',
      },
      '& .MuiButton-startIcon svg line': {
        stroke: '#008DFF',
      },
    },
    '&:focus': {
      outline: '2px solid #7FC5FF',
      outlineOffset: '2px',
    },
  },
});

export const SecondaryButton: React.FC<ButtonSecondary> = ({ startIcon, endIcon, text, className, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      color='secondary'
      variant='outlined'
      startIcon={startIcon}
      endIcon={endIcon}
      className={className ? classes.SecondaryButton + ' ' + className : classes.SecondaryButton}
      {...props}
    >
      <span className='text-custom-btn'>{text}</span>
    </Button>
  );
};