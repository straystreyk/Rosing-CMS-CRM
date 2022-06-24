import * as React from "react";
import { Menu, MenuItem } from "@material-ui/core";
import { StandardButton, StandardButtonProps } from "../UI/Buttons/StandardButton/standard-button";
import { InputProps } from "./input-types";
import { useForm } from "react-final-form";
import { ArrayInputItemArrow, PlusIcon } from "../../constants/icons";

interface SelectStaticButtonProps extends StandardButtonProps {
  items: InputProps[];
  selectValue: string;
  buttonText: string;
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
                  <MenuItem onClick={handleClose} key={index} value={el[selectValue]}>
                    {el[selectItemName]}
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
}

export const SelectModelsInput: React.FC<SelectModelsInputProps> = ({
  resource,
  inputType,
  label,
  initialItems,
}) => {
  const form = useForm();
  const [items, setItems] = React.useState(initialItems);
  const [activeItems, setActiveItems] = React.useState<InputProps[]>([]);

  const handleClose = React.useCallback(
    (value: string) => {
      setActiveItems((p) => [...p, items.find((el) => el.source === value) as InputProps]);
      setItems((p) => p.filter((el) => el.source !== value));
    },
    [items]
  );

  React.useEffect(() => {
    if (inputType === "create") return;
    Object.keys(form.getState().values).forEach((source) => {
      items.forEach((item) => {
        if (
          item.props.source === source &&
          form.getState().values[item.props.source] &&
          form.getState().values[item.props.source].length
        )
          setActiveItems((p) => [...p, item]);
      });
    });
  }, []);

  return (
    <>
      {label}
      {activeItems.map(({ component: Component, ...rest }, index) => {
        return (
          <React.Fragment key={index}>
            <div>
              <Component {...rest} />
            </div>
            {activeItems.length > 1 && index === 0 && (
              <SelectStaticButton
                selectValue="source"
                buttonType="primary"
                variant="text"
                buttonText="jopa"
                selectItemName="label"
                items={items}
                handleCloseFunc={handleClose}
              />
            )}
          </React.Fragment>
        );
      })}
      {activeItems.length <= 1 && (
        <SelectStaticButton
          selectValue="source"
          buttonType="primary"
          variant="text"
          buttonText="jopa"
          selectItemName="label"
          items={items}
          handleCloseFunc={handleClose}
        />
      )}
    </>
  );
};
