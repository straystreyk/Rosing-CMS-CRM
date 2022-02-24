import React, { FC } from 'react';
import { CreateButton, Datagrid, EditButton, TextField } from 'react-admin';
import { ShowButton } from 'ra-ui-materialui';
import { makeStyles } from '@material-ui/core/styles';

interface ShowInterface {
  resource: string;
}

const useStyles = makeStyles({
  episode: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 5,
  },
  episodeTitle: {
    fontWeight: 600,
  },
});

const Expand = (props: any) => {
  const episodes = props.record.episodes;
  const classes = useStyles();

  if (!episodes.length) return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span>No episodes yet</span>
      <CreateButton basePath='/episodes' />
    </div>
  );

  return (
    <>
      <span className={classes.episodeTitle}>Эпизоды</span>
      {episodes.map((el: any) => {
        return (
          <div key={el.id} className={classes.episode}>
            <span>{el.name}</span>
            <div>
              <EditButton to={`/episodes/${el.id}`} />
              <ShowButton to={`/episodes/${el.id}/show`} />
            </div>
          </div>
        );
      })}
    </>
  );
};

const Buttons = ({ record }: { record: any }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <EditButton record={record} />
      <ShowButton to={`seasons/${record.id}/show`} record={record} />
    </div>
  );
};

export const Show: FC<ShowInterface> = (props) => {
  return (
    <Datagrid
      {...props}
      rowClick='edit'
      optimized
      expand={<Expand />}
    >
      <TextField source='name' />
      <TextField source='series.name' label='Series' />
      <Buttons record={props} />
    </Datagrid>
  );
};