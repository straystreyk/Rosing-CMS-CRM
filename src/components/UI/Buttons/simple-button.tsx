import * as React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

interface SimpleButton {
  startIcon?: React.ReactElement;
  endIcon?: React.ReactElement;
  text?: string;
  className?: string;
  onClick?: () => void;
  color?: string;
}

const useStyles = makeStyles({
  ButtonSimple: {
    color: '#00A991',
    padding: '4px 8px',
    fontSize: '14px',
    maxHeight: 36,
    textTransform: 'none',
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
      color: '#00A991',
      background: 'transparent',
    },
    '&:focus': {
      outline: '2px solid #7FC5FF',
      outlineOffset: '2px',
    },
  },
});

export const ButtonSimple: React.FC<SimpleButton> = ({ startIcon, className, text, endIcon, color, ...props }) => {
  const classes = useStyles();

  return (
    <Button
      startIcon={startIcon}
      endIcon={endIcon}
      className={className ? classes.ButtonSimple + ' ' + className : classes.ButtonSimple}
      {...props}
    >
      <span className='text-custom-btn' style={{ color: color }}>{text}</span>
    </Button>
  );
};