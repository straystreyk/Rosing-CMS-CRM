import { required, email } from "react-admin";
import { range } from "lodash";

import { ReferenceInput } from "./ReferenceInputs/reference-input";
import { TextInput } from "./StandatdInputs/TextInput/text-input";
import { SelectInput } from "./StandatdInputs/SelectInput/select-input";
import { NumberInput } from "./StandatdInputs/NumberInput/numdber-input";
import { AutocompleteArrayInput } from "./ArrayInputs/AutoCompliteArrayInput/autocomplite-array-input";
import { RichTextInput } from "./RichTextInput/rich-text-input";
import { BooleanInput } from "./boolean-input";
import { SelectArrayInput } from "./ArrayInputs/select-array-input";
import { ArrayInput } from "./ArrayInputs/Arrayinput/array-input";
import { ArrayInputNoDrag } from "./ArrayInputs/ArrayInputNoDrag/array-input-no-drag";
import { DateTimeInput } from "./DateTimeInput/date-time-input";

export {
  ReferenceInput,
  TextInput,
  SelectInput,
  NumberInput,
  AutocompleteArrayInput,
  RichTextInput,
  BooleanInput,
  SelectArrayInput,
  ArrayInput,
  DateTimeInput,
  ArrayInputNoDrag,
};

export const requiredValidate = [required("validation.form.empty")];
export const emailValidate = [email("Email is not valid")];

export const parseTimeInput = (value: string) => {
  if (!value) return false;
  const timeArr = value.split(":");
  const seconds = +timeArr[0] * 60 * 60 + +timeArr[1] * 60;
  return seconds;
};

export function formatTimeInput(value: number) {
  if (!value) return "00:00";

  const hours = Math.floor(value / 60 / 60);
  const minutes = Math.floor(value / 60) - hours * 60;

  let validHours = hours.toString();
  let validMinutes = minutes.toString();

  if (hours < 10) validHours = "0" + validHours;
  if (minutes < 10) validMinutes = "0" + validMinutes;
  if (hours === 0) validHours = "00";
  if (minutes === 0) validMinutes = "00";

  const valid = validHours + ":" + validMinutes;
  return valid;
}

export const parseToArrayOfString = (value: string) => {
  return value.split(",");
};

export const formatFromArrayOfString = (value: string[]) => {
  if (!value) return "";
  return value.join(",");
};

export const isEmail = (email: string) => {
  const regex = /^([a-zA-Z0-9_.+-])+@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  return regex.test(email);
};

export const getYearsChoices = () =>
  range(new Date().getFullYear(), 1900, -1).map((year) => ({
    id: year.toString(),
    name: year.toString(),
  }));
