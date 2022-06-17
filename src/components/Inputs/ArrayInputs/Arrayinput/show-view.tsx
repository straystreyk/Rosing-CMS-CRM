import * as React from "react";
import { makeStyles, Tooltip } from "@material-ui/core";
import { ArrayInputOrigin, ArrayInputProps } from "./array-input";
import { EditInputComponent } from "../../FastEditInput";
import { useFormState } from "react-final-form";
import { IMDBIcon, KinopoiskIcon } from "../../../../constants/icons";
import avatar from "../../../../images/avatar_empty.jpg";
import { MEDIA_QUERIES_BREAKPOINTS } from "../../../../constants/style-constants";

const useStyles = makeStyles({
  CastMembersShowWrapper: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    justifyContent: "space-between",
    gap: 20,
    flexWrap: "wrap",
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.lg})`]: {
      gridTemplateColumns: "repeat(2, 1fr)",
    },
    [`@media (max-width: ${MEDIA_QUERIES_BREAKPOINTS.sm})`]: {
      gridTemplateColumns: "repeat(1, 1fr)",
    },
  },
  EmptyShow: {
    color: "var(--secondary-color-default)",
    textAlign: "center",
    fontSize: 20,
    padding: "40px 20px",
    flex: 1,
    marginTop: 20,
    "& span": {
      fontSize: 18,
      fontWeight: 600,
      color: "var(--primary-focus-2)",
      lineHeight: "22px",
      marginBottom: 4,
    },
  },
  CastMembersShowItem: {
    backgroundColor: "var(--primary-bg)",
    padding: 16,
    display: "flex",
    borderRadius: 4,
    "& .personInfo": {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      "& .cinemas": {
        display: "flex",
        "& span": {
          display: "flex",
          marginRight: 8,
        },
      },
    },
    "& .personName": {
      fontSize: 16,
      fontWeight: 600,
      lineHeight: "22px",
      "& .role": {
        fontSize: 12,
        lineHeight: "16px",
        fontWeight: 400,
      },
      "& .characterName": {
        fontSize: 14,
        fontWeight: 400,
        lineHeight: "20px",
        marginTop: 8,
        color: "var(--primary-text-default)",
        "& span": {
          color: "var(--secondary-color-default)",
        },
      },
    },
    "& .personImage": {
      width: 100,
      marginRight: 12,
      height: 100,
      "& img": {
        width: "100%",
        borderRadius: 4,
        objectFit: "cover",
        height: "100%",
      },
    },
  },
  ShowWrapper: {
    paddingTop: 32,
    "& .ShowEditButton": {
      top: -4,
    },
  },
});

export const EmptyShow: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.EmptyShow}>
      <span>This section is not filled in yet</span>
      <p>
        You can switch to editing mode or click the quick edit button in the current section to fill
        it in
      </p>
    </div>
  );
};

interface ShowViewProps extends ArrayInputProps {}

const ShowView: React.FC<ShowViewProps> = ({ source }) => {
  const { values } = useFormState();
  const data = values[source];
  const classes = useStyles();

  return (
    <>
      {data && data.length ? (
        <div className={classes.CastMembersShowWrapper}>
          {values[source].map((el: any, index: number) => {
            return (
              <React.Fragment key={index}>
                <div className={classes.CastMembersShowItem}>
                  <div className="personImage">
                    <img
                      src={
                        el.person && el.person.images && el.person.images.length
                          ? el.person.images[0].file
                          : avatar
                      }
                    />
                  </div>
                  <div className="personInfo">
                    <div className="personName">
                      {el.person && el.person.fullName}
                      {el.role && (
                        <div className="role">
                          {el.role.charAt(0).toUpperCase() + el.role.slice(1)}
                        </div>
                      )}
                      {el.role && el.role === "actor" && el.characterName ? (
                        <div className="characterName">
                          <span>Role:</span> {el.characterName}
                        </div>
                      ) : null}
                    </div>
                    <div className="cinemas">
                      {el.person && el.person.kinopoiskId && (
                        <Tooltip title={el.person.kinopoiskId} arrow>
                          <span>
                            <KinopoiskIcon />
                          </span>
                        </Tooltip>
                      )}
                      {el.person && el.person.imdbId && (
                        <Tooltip title={el.person.imdbId} arrow>
                          <span>
                            <IMDBIcon />
                          </span>
                        </Tooltip>
                      )}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      ) : (
        <EmptyShow />
      )}
    </>
  );
};

export const ArrayInputShow: React.FC<ArrayInputProps> = React.memo((props) => {
  const classes = useStyles();
  return (
    <EditInputComponent
      ComponentInput={ArrayInputOrigin}
      ComponentShow={ShowView}
      showWrapperClassName={classes.ShowWrapper}
      borderOff
      {...props}
    />
  );
});
