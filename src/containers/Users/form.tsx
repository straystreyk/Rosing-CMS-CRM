import { Grid } from "@material-ui/core";
import { FC } from "react";

import { emailValidate, requiredValidate, TextInput } from "../../components/Inputs";
import { FormProps } from "../../types";

export const Form: FC<FormProps> = (props) => {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item sm={4} xs={12}>
          <TextInput
            source="email"
            resource={props.resource}
            validate={requiredValidate}
            fullWidth
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <TextInput
            source="firstName"
            validate={requiredValidate}
            resource={props.resource}
            fullWidth
          />
        </Grid>
        <Grid item sm={4} xs={12}>
          <TextInput
            source="lastName"
            resource={props.resource}
            validate={requiredValidate}
            fullWidth
          />
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item sm={6} xs={12}>
          <TextInput fullWidth type="phone" source="phone" resource={props.resource} />
        </Grid>
        <Grid item sm={6} xs={12}>
          <TextInput
            type="email"
            source="contactEmail"
            resource="users"
            validate={emailValidate}
            fullWidth
          />
        </Grid>
      </Grid>
    </>
  );
};
