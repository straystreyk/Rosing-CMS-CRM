import { TableFieldsStyles } from "../../../../../components/TableFields/styles";

export const EPGTableStyles = {
  ...TableFieldsStyles,
  DatagridTVPrograms: {
    "& tbody tr th:first-child": {
      paddingLeft: 24,
    },
    "& thead tr th:first-child": {
      paddingLeft: 24,
    },
  },
  TvProgramExist: {
    color: "var(--additional-green-default)",
  },
  EmptyTvProgram: {
    color: "var(--additional-red-default)",
  },
};
