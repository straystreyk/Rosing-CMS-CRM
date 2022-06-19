import { ToolbarProps } from "./types";
import * as React from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../types";
import { useHistory } from "react-router-dom";
import { Toolbar as ToolbarRA } from "ra-ui-materialui/lib/form";
import cn from "classnames";
import { SecondaryButton } from "../../UI/Buttons";
import { AcceptFilterIcon, CancelFilterIcon, PlusIcon } from "../../../constants/icons";
import { SaveButton } from "../../UI/RA/save-button";
import { makeStyles, useMediaQuery } from "@material-ui/core";
import { FormToolBarStyles } from "./styles";
import { MEDIA_QUERIES_BREAKPOINTS } from "../../../constants/style-constants";
import { StandardButton } from "../../UI/Buttons/StandardButton/standard-button";

const useStyles = makeStyles(FormToolBarStyles);

const useToolBar = () => {
  const [mounted, setMounted] = React.useState(false);
  const toolbar = React.useRef(null);
  const currentExist = !!toolbar.current;
  const history = useHistory();

  const cancel = React.useCallback(() => {
    history.goBack();
  }, [history]);

  React.useEffect(() => {
    if (currentExist) {
      setMounted(true);
    }
  }, [toolbar, currentExist]);

  return {
    toolbar,
    mounted,
    cancel,
  };
};

export const Toolbar = (props: ToolbarProps) => {
  const classes = useStyles();
  const open = useSelector((state: AppState) => state.admin.ui.sidebarOpen);
  const { toolbar, cancel, mounted } = useToolBar();

  return (
    <div ref={toolbar}>
      <ToolbarRA
        record={props.record}
        basePath={props.basePath}
        invalid={props.invalid}
        handleSubmit={props.handleSubmit}
        handleSubmitWithRedirect={props.handleSubmitWithRedirect}
        saving={props.saving}
        resource={props.resource}
        className={cn(
          classes.FixedToolBar,
          !open && classes.FixedToolBarClosed,
          mounted && classes.Transition
        )}
      >
        <StandardButton
          startIcon={<CancelFilterIcon />}
          variant="outlined"
          text="Cancel"
          onClick={cancel}
          buttonType="secondary"
          onMobileView
        />
        <SaveButton
          icon={<AcceptFilterIcon />}
          label="Save"
          onSuccess={props.onSuccess}
          onFailure={props.onFailure}
        />
        {props.formType !== "edit" && !props.offRedirectButton ? (
          <SaveButton
            label={props.redirectButtonLabel ?? `Save and add another one`}
            icon={props.redirectButtonIcon ?? <PlusIcon />}
            onSuccess={props.onSuccessWithRedirect ?? props.onSuccess}
            onFailure={props.onFailure}
          />
        ) : null}
      </ToolbarRA>
    </div>
  );
};
