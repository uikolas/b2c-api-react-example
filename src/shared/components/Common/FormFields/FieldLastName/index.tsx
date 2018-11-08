import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

import {fieldStyles} from "src/shared/components/Common/FormFields/fieldStyles";
import {IFieldLastNameProps} from "src/shared/components/Common/FormFields/FieldLastName/types";

const lastNameLabel = "Last Name";

export const FieldLastNameBase: React.SFC<IFieldLastNameProps> = (props): JSX.Element => {
  const {classes, value, formName, onChangeHandler}  = props;

  return (
    <TextField
      required
      id={`${formName}-last-name`}
      label={lastNameLabel}
      name="lastName"
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

export const FieldLastName = withStyles(fieldStyles)(FieldLastNameBase);

