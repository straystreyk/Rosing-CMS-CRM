import * as React from "react";
import { makeStyles, Tooltip } from "@material-ui/core";
import { ArrayInputOrigin, ArrayInputProps } from "./array-input";
import { EditInputComponent } from "../../edit-input-component";
import { useFormState } from "react-final-form";
import { IMDBIcon, KinopoiskIcon } from "../../../../constants/icons";
import avatar from "../../../../images/avatar_empty.jpg";

const useStyles = makeStyles({
  CastMembersShowWrapper: {
    width: "100%",
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    paddingTop: 20,
  },
  EmptyShow: {
    color: "var(--secondary-color-default)",
    textAlign: "center",
    fontSize: 20,
    padding: "40px 20px",
    flex: 1,
    marginTop: 20,
    "& h4": {
      fontSize: 18,
      color: "#7FC5FF",
      lineHeight: "22px",
      marginBottom: 4,
    },
  },
  CastMembersShowItem: {
    backgroundColor: "var(--primary-bg)",
    padding: 16,
    display: "flex",
    width: "calc(33.3333% - 60px)",
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
});

export const EmptyShow: React.FC = () => {
  const classes = useStyles();
  return (
    <div className={classes.EmptyShow}>
      <h4>This section is not filled in yet</h4>
      <p>
        You can switch to media content editing mode or click the quick edit button in the current
        section to fill it in.
      </p>
    </div>
  );
};

const ShowView: React.FC<ArrayInputProps> = ({ source }) => {
  const { values } = useFormState();
  const classes = useStyles();

  return (
    <>
      {values[source] && values[source].length ? (
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
                      <Tooltip
                        title={el.person && el.person.kinopoiskId ? el.person.kinopoiskId : ""}
                        arrow
                      >
                        <span>{el.person && el.person.kinopoiskId ? <KinopoiskIcon /> : null}</span>
                      </Tooltip>
                      <Tooltip title={el.person && el.person.imdbId ? el.person.imdbId : ""} arrow>
                        <span>{el.person && el.person.imdbId ? <IMDBIcon /> : ""}</span>
                      </Tooltip>
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
  return (
    <EditInputComponent
      ComponentInput={ArrayInputOrigin}
      ComponentShow={ShowView}
      borderOff
      {...props}
    />
  );
});
