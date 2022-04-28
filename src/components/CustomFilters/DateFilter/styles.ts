import { TextInputStyles } from "../../Inputs/StandatdInputs/TextInput/styles";

export const DateFilterStyles: any = {
  DateWrapper: {
    display: "flex",
    justifyContent: "space-between",
  },
  DateInput: {
    ...TextInputStyles,
    width: "48%",
  },
  ButtonsWrapper: {
    marginTop: 10,
    textAlign: "right",
  },
};
