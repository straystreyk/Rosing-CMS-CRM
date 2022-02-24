import React, { FC } from 'react';
import { useTranslate } from 'ra-core';
import {
  Datagrid,
  TextField,
  EditButton,
  CreateButton,
} from 'react-admin';
import { makeStyles } from '@material-ui/core/styles';
import { CircularProgress } from '@material-ui/core';
import { Error, ShowButton } from 'ra-ui-materialui';
import { GET_CURRENT_SEASONS } from './requests';
import { useQuery } from '@apollo/client';
import { authClient } from '../../components/Providers';

interface ShowInterface {
  resource: string;
  basePath?: string;
  data?: Object;
}

const useStyles = makeStyles({
  season: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  seasonTitle: {
    fontWeight: 600,
  },
  spinner: {
    display: 'flex',
    justifyContent: 'center',
    margin: '10px 0',
  },

});

const SeriesButtons = (props: any) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <EditButton to={`/series/${props.record.id}`} />
      <ShowButton to={`/series/${props.record.id}/show`} />
    </div>
  );
};

const SeriesPanel = (props: any) => {
  const classes = useStyles();
  const translate = useTranslate();

  const { loading, error, data } = useQuery(GET_CURRENT_SEASONS, {
    client: authClient,
    variables: { seriesId: props.record.id },
  });

  if (error) return <Error error={error} />;
  if (loading) return <div className={classes.spinner}><CircularProgress color='primary' /></div>;

  const { allSeasons } = data;
  const sortSeasons = [...allSeasons].sort((prev, next) => prev.number - next.number);

  if (!allSeasons.length) return (
    <div className={classes.season}>
      <span>{translate('resources.seasons.titles.empty')}</span>
      <CreateButton basePath='/seasons' />
    </div>
  );

  return (
    <>
      <span className={classes.seasonTitle}>Сезоны</span>
      {sortSeasons.map((el: any) => {
        return (
          <div className={classes.season} key={el.id}>
            <span>{el.name}</span>
            <div>
              <EditButton to={`/seasons/${el.id}`} />
              <ShowButton to={`/seasons/${el.id}/show`} />
            </div>
          </div>
        );
      })}
    </>
  );
};

export const Show: FC<ShowInterface> = (props) => {
  return (
    <Datagrid
      expand={<SeriesPanel />}
      rowClick='edit'
      optimized
      {...props}
    >
      <TextField source='name' />
      <SeriesButtons {...props} />
    </Datagrid>
  );
};