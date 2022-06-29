import * as React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { StandardButton, StandardButtonProps } from "../UI/Buttons/StandardButton/standard-button";
import { InputProps } from "./input-types";
import { useForm } from "react-final-form";
import { ArrayInputItemArrow, DeleteIcon, PlusIcon } from "../../constants/icons";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles({
  Centered: {
    display: "flex",
    justifyContent: "center",
  },
  ActiveModelsWrapper: {
    position: "relative",
  },
  Button: {
    position: "absolute",
    top: 8,
    right: 24,
  },
});

interface SelectStaticButtonProps extends StandardButtonProps {
  items: InputProps[];
  selectValue: string;
  buttonText?: string;
  selectItemName?: string;
  handleClickFunc?: () => void;
  handleCloseFunc?: (value: string) => void;
}

export const SelectStaticButton: React.FC<SelectStaticButtonProps> = React.memo(
  ({
    selectItemName = "name",
    selectValue,
    buttonType,
    variant,
    buttonText,
    handleCloseFunc,
    handleClickFunc,
    items,
    ...rest
  }) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      setAnchorEl(e.currentTarget);
      if (handleClickFunc) handleClickFunc();
    };

    const modalClose = () => {
      setAnchorEl(null);
    };

    const handleClose = (e: React.BaseSyntheticEvent) => {
      const value = e.target.getAttribute("value");
      if (handleCloseFunc) handleCloseFunc(value);
      setAnchorEl(null);
    };

    return (
      <>
        {items.length !== 0 && (
          <>
            <StandardButton
              onClick={handleClick}
              buttonType={buttonType}
              startIcon={<PlusIcon />}
              endIcon={<ArrayInputItemArrow />}
              variant={variant}
              text={buttonText}
            />
            <Menu
              id="select-static-menu"
              anchorEl={anchorEl}
              open={!!anchorEl}
              onClose={modalClose}
              MenuListProps={{
                "aria-labelledby": "select-static-menu",
              }}
            >
              {items.map((el, index: number) => {
                return (
                  <MenuItem onClick={handleClose} key={index} value={el && el[selectValue]}>
                    {el && el[selectItemName]}
                  </MenuItem>
                );
              })}
            </Menu>
          </>
        )}
      </>
    );
  }
);

interface SelectModelsInputProps extends Omit<InputProps, "source"> {
  initialItems: InputProps[];
  buttonText?: string;
}

export const SelectModelsInput: React.FC<SelectModelsInputProps> = React.memo(
  ({ resource, label, inputType, initialItems, buttonText }) => {
    const form = useForm();
    const classes = useStyles();
    const [items, setItems] = React.useState(initialItems);
    const [activeItems, setActiveItems] = React.useState<InputProps[]>([]);

    const handleClose = React.useCallback(
      (value: string) => {
        setActiveItems((p) => [...p, items.find((el) => el.source === value) as InputProps]);
        setItems((p) => p.filter((el) => el.source !== value));
      },
      [items]
    );

    const deleteItem = React.useCallback((item: InputProps) => {
      form.change(item.source, []);
      setActiveItems((p) => p.filter((el) => el.source !== item.source));
      setItems((p) => [...p, item]);
    }, []);

    React.useEffect(() => {
      if (inputType === "create") return;
      Object.keys(form.getState().values).forEach((source) => {
        items.forEach((item) => {
          if (item.source === source && form.getState().values[`${item.source}Aggregation`]) {
            setActiveItems((p) => [...p, item]);
            setItems((p) => p.filter((item) => item.source !== source));
          }
        });
      });
    }, []);

    return (
      <>
        {activeItems.map(({ component: Component, ...rest }, index) => {
          return (
            <React.Fragment key={index}>
              <div className={classes.ActiveModelsWrapper}>
                <Component {...rest} />
                <StandardButton
                  buttonType="additional-red"
                  text="Delete"
                  startIcon={<DeleteIcon />}
                  variant="text"
                  className={classes.Button}
                  onClick={() => deleteItem({ component: Component, ...rest })}
                  onMobileView
                />
              </div>
              {activeItems.length > 1 && index === 0 && (
                <div className={classes.Centered}>
                  <SelectStaticButton
                    selectValue="source"
                    buttonType="primary"
                    variant="text"
                    buttonText={buttonText}
                    selectItemName="label"
                    items={items}
                    handleCloseFunc={handleClose}
                  />
                </div>
              )}
            </React.Fragment>
          );
        })}
        {activeItems.length <= 1 && (
          <div className={classes.Centered}>
            <SelectStaticButton
              selectValue="source"
              buttonType="primary"
              variant="text"
              buttonText={buttonText}
              selectItemName="label"
              items={items}
              handleCloseFunc={handleClose}
            />
          </div>
        )}
      </>
    );
  }
);
