import { useQuery } from '@apollo/client';
import { EditButton, Error, Loading, ShowButton } from 'ra-ui-materialui';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, CircularProgress } from '@material-ui/core';
import { CreateButton } from 'ra-ui-materialui';

import { authClient } from '../../components/Providers';
import { GET_CURRENT_SEASON, GET_CURRENT_EPISODES } from './requests';
import { styles } from './detail-styles';
import { detailInfoFormatter } from '../../helpers/detail-page';

const useStyles = makeStyles(styles);

const Episodes = ({ seasonId }: { seasonId: string }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_CURRENT_EPISODES, {
    client: authClient,
    variables: { seasonId: seasonId },
  });

  if (loading) return <div><CircularProgress /></div>;
  if (error) return <Error error={error} />;

  const { allEpisodes } = data;

  if (!allEpisodes.length) return (
    <>
      <span className={classes.episodesTitle}>Эпизодов пока нет</span>
      <CreateButton label='create episode' variant='outlined' to={'/episodes/create'} />
    </>
  );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <span className={classes.episodesTitle}>Эпизоды</span>
        <CreateButton
          label='create episode'
          variant='outlined'
          to={'/episodes/create'}
        />
      </Grid>
      <Grid item lg={8} xs={12}>
        {allEpisodes.map((el: any) => {
          return (
            <div className={classes.subItem} key={el.name}>
              <span>{el.name}</span>
              <div>
                <EditButton to={`/episodes/${el.id}`} />
                <ShowButton to={`/episodes/${el.id}/show`} />
              </div>
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
};


export const DetailSeason = (props: any) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_CURRENT_SEASON, {
    client: authClient,
    variables: { id: props.match.params.id },
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const {
    description,
    name,
    number,
    series,
    id,
  } = data.Season;

  const detail = detailInfoFormatter(data.Season);

  return (
    <>
      <Grid container spacing={2} className={classes.mainSection}>
        <Grid item md={4} xs={12}>
          <div className={classes.mainImage}>
          </div>
        </Grid>
        <Grid item md={8} xs={12}>
          <div className={classes.mainNameWrapper}>
            <span className={classes.mainName}>
                {name}
            </span>
            <CreateButton
              className={classes.mainBtn}
              label='create season'
              variant='outlined'
              to='/seasons/create'
            />
            <EditButton
              className={classes.mainBtn}
              label='edit season'
              variant='outlined'
              to={`/seasons/${id}`}
            />
          </div>
          <div className={classes.seriesName}> Сериал: {series.name}. Сезон: {number} </div>
          {
            description ?
              <div className={classes.description}>
                <div className={classes.subtitle}>Описание:</div>
                <span>{description}</span>
              </div>
              : 'empty'
          }
        </Grid>
      </Grid>
      <Grid className={classes.section} container spacing={2}>
        <Grid item xs={12}>
          <span className={classes.subtitle}>Детальная информация:</span>
        </Grid>
        <Grid item lg={8} xs={12}>
          {
            detail.map((el: { key: string, value: string } | undefined, index: number) => {
              if (el) {
                return (
                  <div className={classes.detailInfo} key={index}>
                    <span className={classes.infoName}>{el.key}</span>
                    <span className={classes.infoValue}>{el.value}</span>
                  </div>
                );
              }
              return false;
            })
          }
        </Grid>
      </Grid>
      <Grid className={classes.section} container spacing={2}>
        <Grid item xs={12}>
          <Episodes seasonId={props.match.params.id} />
        </Grid>
      </Grid>
    </>
  );
};