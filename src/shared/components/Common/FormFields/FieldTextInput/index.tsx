import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';

import {fieldStyles} from "src/shared/components/Common/FormFields/fieldStyles";
import {IFieldTextInputProps} from "src/shared/components/Common/FormFields/FieldTextInput/types";

export const FieldTextInputBase: React.SFC<IFieldTextInputProps> = (props): JSX.Element => {
  const {
    classes,
    value,
    formName,
    inputName,
    onChangeHandler,
    label,
    isError,
    handleBlur
  }  = props;

  return (
    <TextField
      required
      id={`${formName}-${inputName}`}
      label={label ? label : null}
      name={inputName}
      error={isError}
      InputProps={{
        disableUnderline: true,
        classes: {input: classes.input, error: classes.error},
      }}
      InputLabelProps={{
        shrink: true,
        FormLabelClasses: {
          root: classes.label
        }
      }}
      type="text"
      value={value}
      className={classes.textField}
      margin="normal"
      onChange={onChangeHandler}
      onBlur={handleBlur}
      fullWidth
    />
  );
};

export const FieldTextInput = withStyles(fieldStyles)(FieldTextInputBase);

