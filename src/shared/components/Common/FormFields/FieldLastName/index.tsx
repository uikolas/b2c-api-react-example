import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

import {IFieldFirstNameProps} from "src/shared/components/Common/FormFields/FieldFirstName/types";
import {fieldStyles} from "src/shared/components/Common/FormFields/fieldStyles";

const firstNameLabel = "First Name";

export const FieldFirstNameBase: React.SFC<IFieldFirstNameProps> = (props): JSX.Element => {
  const {classes, value, formName, onChangeHandler}  = props;

  return (
    <TextField
      required
      id={`${formName}-first-name`}
      label={firstNameLabel}
      name="firstName"
      type="text"
      value={value}
      className={classes.textField}
      margin="normal"
      onChange={onChangeHandler}
      fullWidth
      InputLabelProps={{
        shrink: true,
      }}
      InputProps={{
        className: classes.input,
      }}
    />
  );
};

export const FieldFirstName = withStyles(fieldStyles)(FieldFirstNameBase);

