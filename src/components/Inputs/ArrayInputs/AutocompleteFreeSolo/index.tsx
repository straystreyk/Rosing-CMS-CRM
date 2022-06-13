import * as React from "react";
import { Autocomplete, createFilterOptions } from "@material-ui/lab";
import { Chip, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Field } from "react-final-form";
import { AutoCompleteInputStyles } from "../AutoCompliteArrayInput/styles";
import { ChipStyles } from "../styles";
import { AutocompleteInput, ChoiceInputType } from "../../input-types";
import { AutocompleteArrayFreeSoloShow } from "./show-view";

const useStyles = makeStyles({
  Chip: {
    ...ChipStyles,
    "& svg": {
      color: "var(--accent-color)",
    },
  },
  AutoCompleteInput: {
    ...AutoCompleteInputStyles,
    margin: "8px 0",
    "& .MuiInputBase-root": {
      border: "1px solid var(--secondary-color-default)",
      borderRadius: 4,
      "& .MuiChip-root": ChipStyles,
    },
    "& div.MuiFormControl-root": {
      padding: "0 !important",
    },
  },
  Popper: {},
});

const filter = createFilterOptions<ChoiceInputType>();

export const AutocompleteArrayFreeSoloOrigin: React.FC<Omit<AutocompleteInput, "inputType">> = ({
  source,
  choices,
  label,
}) => {
  const classes = useStyles();

  return (
    <Field type="text" name={source}>
      {({ input: { onChange, value }, ...rest }) => {
        return (
          <>
            <Autocomplete
              multiple
              freeSolo
              filterSelectedOptions
              className={classes.AutoCompleteInput}
              classes={{ popper: classes.Popper }}
              id="tags-filled"
              onChange={(event, option) => {
                return onChange(option.map((el) => (typeof el === "string" ? el : el.id)));
              }}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);
                if (params.inputValue !== "") {
                  filtered.push({
                    id: params.inputValue,
                    name: `Add "${params.inputValue}"`,
                  });
                }

                return filtered;
              }}
              value={value || []}
              getOptionLabel={(option) => option.name}
              options={choices || []}
              renderTags={(value: any, getTagProps) => {
                return value.map((option: { id: string; name: string } | string, index: number) => (
                  <Chip
                    variant="outlined"
                    label={(option as { id: string; name: string }).name ?? option}
                    classes={{ root: classes.Chip }}
                    {...getTagProps({ index })}
                  />
                ));
              }}
              renderInput={(params) => <TextField {...params} variant="filled" label={label} />}
            />
          </>
        );
      }}
    </Field>
  );
};

export const AutocompleteArrayFreeSolo: React.FC<AutocompleteInput> = ({ inputType, ...rest }) => {
  return inputType === "show" ? (
    <AutocompleteArrayFreeSoloShow inputType={inputType} {...rest} />
  ) : (
    <AutocompleteArrayFreeSoloOrigin {...rest} />
  );
};
