import { FC } from 'react';
import { Datagrid, TextField } from 'react-admin';

import { ShowProps } from '../../types';

export const Show: FC<ShowProps> = (props) =>
  <Datagrid
    {...props}
    optimized
    rowClick='edit'
  >
    <TextField source='uid' />
    <TextField source='name' />
  </Datagrid>;
