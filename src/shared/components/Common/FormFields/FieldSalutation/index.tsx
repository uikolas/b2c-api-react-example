import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import {fieldStyles} from "src/shared/components/Common/FormFields/fieldStyles";
import {IFieldSalutationProps} from "src/shared/components/Common/FormFields/FieldSalutation/types";
import {salutationVariants} from "src/shared/constants/customer/index";
import {TSalutationVariant} from "src/shared/interfaces/customer/index";

const salutationLabel = "Salutation";

export const FieldSalutationBase: React.SFC<IFieldSalutationProps> = (props): JSX.Element => {
  const {classes, value, formName, onChangeHandler}  = props;

  return (
    <TextField
    required
    id={`${formName}-salutation`}
    select
    label={salutationLabel}
    name="salutation"
    className={classes.textField}
    value={value}
    onChange={onChangeHandler}
    fullWidth
    SelectProps={{
      MenuProps: {
        className: classes.menu,
      },
    }}
    margin="normal"
    InputLabelProps={{
      shrink: true,
      className: classes.label,
    }}
  >
    {salutationVariants.map((option: TSalutationVariant) => (
      <MenuItem
        key={option.value}
        value={option.value}
      >
        {option.label}
      </MenuItem>
    ))}
  </TextField>
  );
};

export const FieldSalutation = withStyles(fieldStyles)(FieldSalutationBase);

