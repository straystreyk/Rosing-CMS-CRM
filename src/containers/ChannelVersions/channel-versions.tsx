import { FC } from 'react';
import Icon from '@material-ui/icons/CastConnected';

import { ResourceEdit, ResourceList, ResourceCreate } from '../../components/ResourceView';
import { Show } from './show';
import { Form } from './form';

const resource = 'channel_versions';

export const List: FC = (props) =>
  <ResourceList {...props} resource={resource}>
    <Show resource={resource} />
  </ResourceList>;

export const Edit: FC = (props) =>
  <ResourceEdit {...props} resource={resource}>
    <Form resource={resource} />
  </ResourceEdit>;

export const Create: FC = (props) =>
  <ResourceCreate {...props} resource={resource}>
    <Form resource={resource} />
  </ResourceCreate>;

export { Icon };



