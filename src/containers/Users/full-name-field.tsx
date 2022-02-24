import * as React from 'react';
import { FC, memo } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { FieldProps, User } from '../../types';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
  },
  avatar: {
    marginRight: theme.spacing(1),
    marginTop: -theme.spacing(0.5),
    marginBottom: -theme.spacing(0.5),
  },
}));

interface Props extends FieldProps<User> {
  size?: string;
}

const FullNameField: FC<Props> = ({ record, size }) => {
  const classes = useStyles();
  return record ? (
    <span className={classes.root}>
            {record.firstName} {record.lastName}
        </span>
  ) : null;
};

FullNameField.defaultProps = {
  source: 'last_name',
  label: 'resources.users.fields.name',
};

export default memo<Props>(FullNameField);
