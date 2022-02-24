import React from 'react';
import { FilterList, FilterListItem } from 'react-admin';
import { FilterLiveSearch } from 'react-admin';
import PublishIcon from '@material-ui/icons/PublishOutlined';
import MarkersIcon from '@material-ui/icons/Bookmark';

const PublishedFilter = () => {
  return (
    <FilterList label={'resources.channels.filtersLabels.published'} icon={<PublishIcon />}>
      <FilterListItem label='No' value={{ published: false }} />
      <FilterListItem label='Yes' value={{ published: true }} />
    </FilterList>
  );
};

const MarkersFilter = () => {
  return (
    <FilterList label={'resources.channels.filtersLabels.markers'} icon={<MarkersIcon />}>
      <FilterListItem label='Popular' value={{ markers: ['popular'] }} />
      <FilterListItem label='Free' value={{ markers: ['free'] }} />
      <FilterListItem label='Featured' value={{ markers: ['featured'] }} />
    </FilterList>
  );
};

export const sideFilters = [
  <FilterLiveSearch source='name' />,
  <PublishedFilter />,
  <MarkersFilter />,
];