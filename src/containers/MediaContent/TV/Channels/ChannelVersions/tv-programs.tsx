import * as React from "react";
import { Identifier, useNotify } from "ra-core";
import { authClient } from "../../../../../components/Providers/AuthProvider/client";
import { GET_ALL_TV_PROGRAMS } from "./requests";
import { StandardButton } from "../../../../../components/UI/Buttons/StandardButton/standard-button";
import { TVProgramsIcon } from "../../../../../constants/icons";
import { ModalMUI } from "../../../../../components/Modal";
import { MainLoader } from "../../../../../components/MainLoader";
import { makeStyles } from "@material-ui/core";
import { Link } from "react-router-dom";

const useStyles = makeStyles({
  TVProgram: {
    paddingBottom: 12,
    marginTop: 12,
    borderBottom: "1px solid var(--secondary-color-disable)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    flexWrap: "wrap",
    "& .Counter": {
      width: "30px",
      textAlign: "left",
      marginLeft: 5,
      display: "inline-block",
    },
  },
  Date: {
    "& .DateString": {
      fontSize: 14,
      fontWeight: 500,
      marginBottom: 4,
    },
    "& .DatOfTheWeek": {
      color: "var(--secondary-color-default)",
      fontSize: 12,
      lineHeight: "16px",
    },
  },
  EmptyPrograms: {
    display: "flex",
    justifyContent: "center",
    marginTop: 20,
    padding: "0 15px",
    color: "var(--secondary-color-default)",
    fontWeight: 500,
  },
});

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

export type EPG = {
  id: Identifier;
  day: string;
  countAll: number;
  epgSourceId: Identifier;
  channelVersionId: Identifier;
};

interface ModalTVProgramsProps {
  loading: boolean;
  open: boolean;
  handleClose: () => void;
  data: EPG[] | null;
  title?: string | React.ReactElement;
  description?: string | React.ReactElement;
}

export const useTVPrograms: () => {
  loading: boolean;
  data: EPG[] | null;
  getData: (channelVersionId: Identifier | undefined) => void;
  setData: React.Dispatch<React.SetStateAction<EPG[] | null>>;
} = () => {
  const [loading, setLoading] = React.useState(false);
  const [data, setData] = React.useState<EPG[] | null>(null);
  const notify = useNotify();

  const getData = async (channelVersionId: Identifier | undefined) => {
    if (channelVersionId) {
      try {
        setLoading(true);
        const res = await authClient.query({
          query: GET_ALL_TV_PROGRAMS,
          variables: { channelVersionId },
        });

        const tvPrograms = res.data.data;
        setData(tvPrograms);
      } catch (e) {
        if (e instanceof Error) {
          notify(e.message, { type: "error" });
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return {
    setData,
    getData,
    data,
    loading,
  };
};

const TVProgramItem: React.FC<{ program: EPG }> = ({ program }) => {
  const classes = useStyles();

  return (
    <div className={classes.TVProgram}>
      <div className={classes.Date}>
        <div className="DateString">{new Date(program.day).toLocaleDateString()}</div>
        <div className="DatOfTheWeek">{days[new Date(program.day).getDay()]}</div>
      </div>
      <StandardButton
        startIcon={<TVProgramsIcon color="var(--accent-color)" />}
        variant="text"
        customColor="var(--accent-color)"
        component={Link}
        to={`/media_content/tv/channels/channel_versions/${program.channelVersionId}/${program.epgSourceId}/${program.day}/program_events`}
      >
        TV program events <span className="Counter">({program.countAll})</span>
      </StandardButton>
    </div>
  );
};

export const ModalTVPrograms: React.FC<ModalTVProgramsProps> = ({
  loading,
  open,
  handleClose,
  data,
  title,
  description,
}) => {
  const classes = useStyles();
  return (
    <ModalMUI title={title} description={description} open={open} handleClose={handleClose}>
      {loading && (
        <div style={{ display: "flex" }}>
          <MainLoader centered size={50} />
        </div>
      )}
      {data?.length
        ? data.map((program, index) => {
            return <TVProgramItem key={index.toString()} program={program} />;
          })
        : null}
      {!loading && !data?.length && <div className={classes.EmptyPrograms}>No TV programs yet</div>}
    </ModalMUI>
  );
};
