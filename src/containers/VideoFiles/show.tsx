import * as React from 'react';
import { Datagrid, TextField, ReferenceField } from 'react-admin';


export const Show: React.FC = (props) => {
  return (
    <Datagrid
      {...props}
      optimized
      rowClick='edit'
    >
      <TextField source='name' />
      <TextField source='streamingUid' />
      <ReferenceField
        label='Datacenter'
        source='datacenterId'
        reference='datacenters'
      >
        <TextField
          source='name'
          fullWidth
        />
      </ReferenceField>
    </Datagrid>
  );
};