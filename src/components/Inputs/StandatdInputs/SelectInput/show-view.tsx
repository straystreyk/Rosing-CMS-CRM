import * as React from "react";
import { InputProps } from "ra-core";
import { EditInputComponent } from "../../edit-input-component";
import { SelectInputOrigin } from "./select-input";
import { makeStyles } from "@material-ui/core";
import { labelStyles } from "../../styles";
import { useFormState } from "react-final-form";
import { useQuery } from "@apollo/client";
import { GET_ONE_DATA_CENTER, GET_ONE_VIDEO_FILE } from "../../../Providers/custom-requests";
import { authClient } from "../../../Providers";
import { MainLoader } from "../../../MainLoader";

const useStyles = makeStyles({
  label: labelStyles,
  SelectInputShowValue: {
    marginTop: 4,
    fontSize: 14,
    lineHeight: "20px",
    color: "var(--primary-text-default)",
    "& .empty": {
      color: "#9FA5A8",
    },
  },
});

const Datacenter: React.FC<{ datacenterId: string }> = ({ datacenterId }) => {
  const { loading, data, error } = useQuery(GET_ONE_DATA_CENTER, {
    client: authClient,
    variables: { id: datacenterId },
  });

  if (loading) return <MainLoader size={20} />;
  if (error) return <span>error</span>;

  return data.item.name;
};

const ShowView: React.FC<InputProps> = (props) => {
  const classes = useStyles();
  const { values } = useFormState();

  const getValue = (source: string) => {
    switch (source) {
      case "datacenterId":
        return values[props.source] ? (
          <Datacenter datacenterId={values[props.source]} />
        ) : (
          <div className="empty">Not filled in</div>
        );
      case "productionYear":
        return values[props.source] ? (
          values[props.source] + " year"
        ) : (
          <div className="empty">Not filled in</div>
        );
      default:
        return values[props.source] ? (
          values[props.source]
        ) : (
          <div className="empty">Not filled in</div>
        );
    }
  };

  return (
    <div>
      <label className={classes.label}>{props.label}</label>
      <div className={classes.SelectInputShowValue}>{getValue(props.source)}</div>
    </div>
  );
};

export const SelectInputShow: React.FC<InputProps> = (props) => {
  return (
    <EditInputComponent ComponentInput={SelectInputOrigin} ComponentShow={ShowView} {...props} />
  );
};
