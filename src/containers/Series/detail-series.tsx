import { useQuery } from "@apollo/client";
import { CircularProgress, Grid } from "@material-ui/core";
import {
  CreateButton,
  EditButton,
  Error,
  Loading,
  ShowButton,
} from "ra-ui-materialui";
import { makeStyles } from "@material-ui/core/styles";

import { authClient } from "../../components/Providers";
import { GET_CURRENT_SEASONS, GET_CURRENT_SERIES } from "./requests";
import { styles } from "./detail-styles";
import { detailInfoFormatter } from "../../helpers/detail-page";

const useStyles = makeStyles(styles);

const Seasons = ({ seriesId }: { seriesId: string }) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_CURRENT_SEASONS, {
    client: authClient,
    variables: { seriesId: seriesId },
  });

  if (loading) {
    return (
      <div>
        <CircularProgress />
      </div>
    );
  }

  if (error) return <Error error={error} />;

  const { allSeasons } = data;
  if (!allSeasons.length)
    return (
      <>
        <span className={classes.seasonsTitle}>Сезонов пока нет</span>
        <CreateButton
          label="create episode"
          variant="outlined"
          to={"/seasons/create"}
        />
      </>
    );

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <span className={classes.seasonsTitle}>Сезоны</span>
        <CreateButton
          label="create season"
          variant="outlined"
          to={"/seasons/create"}
        />
      </Grid>
      <Grid item lg={8} xs={12}>
        {allSeasons.map((el: any) => {
          return (
            <div className={classes.subItem} key={el.name}>
              <span>{el.name}</span>
              <div>
                <EditButton to={`/seasons/${el.id}`} />
                <ShowButton to={`/seasons/${el.id}/show`} />
              </div>
            </div>
          );
        })}
      </Grid>
    </Grid>
  );
};

export const DetailSeries = (props: any) => {
  const classes = useStyles();
  const { loading, error, data } = useQuery(GET_CURRENT_SERIES, {
    client: authClient,
    variables: { id: props.match.params.id },
  });

  if (loading) return <Loading />;
  if (error) return <Error error={error} />;

  const { name, description, id } = data.Series;
  const detail = detailInfoFormatter(data.Series);

  return (
    <>
      <Grid container spacing={2} className={classes.mainSection}>
        <Grid item md={4} xs={12}>
          <div className={classes.mainImage}></div>
        </Grid>
        <Grid item md={8} xs={12}>
          <div className={classes.mainNameWrapper}>
            <span className={classes.mainName}>{name}</span>
            <CreateButton
              className={classes.mainBtn}
              label="create series"
              variant="outlined"
              to={"/series/create"}
            />
            <EditButton
              className={classes.mainBtn}
              label="edit series"
              variant="outlined"
              to={`/series/${id}`}
            />
          </div>
          {description ? (
            <div className={classes.description}>
              <div className={classes.subtitle}>Описание:</div>
              <span>{description}</span>
            </div>
          ) : (
            "empty"
          )}
        </Grid>
      </Grid>
      <Grid className={classes.section} container spacing={2}>
        <Grid item xs={12}>
          <span className={classes.subtitle}>Детальная информация:</span>
        </Grid>
        <Grid item lg={8} xs={12}>
          {detail.map(
            (el: { key: string; value: string } | undefined, index: number) => {
              if (el) {
                return (
                  <div className={classes.detailInfo} key={index}>
                    <span className={classes.infoName}>{el.key}</span>
                    <span className={classes.infoValue}>{el.value}</span>
                  </div>
                );
              }
              return false;
            }
          )}
        </Grid>
      </Grid>
      <Grid className={classes.section} container spacing={2}>
        <Grid item xs={12}>
          <Seasons seriesId={props.match.params.id} />
        </Grid>
      </Grid>
    </>
  );
};
