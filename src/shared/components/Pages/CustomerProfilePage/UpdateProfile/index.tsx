import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Button from '@material-ui/core/Button';
import Grid, {GridSize} from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';

import { pageStyles } from '../styles';
import { SprykerButton } from 'src/shared/components/UI/SprykerButton';
import { submitBtnTitle } from 'src/shared/constants/buttons';
import { SprykerForm } from 'src/shared/components/UI/SprykerForm';
import {
  TCustomerFirstName,
  TCustomerLastName,
  TCustomerSalutation,
  TSalutationVariant,
} from 'src/shared/interfaces/customer';
import { salutationVariants } from 'src/shared/constants/customer';
import {SprykerSelectProps} from "src/shared/components/UI/SprykerSelect";
import {IRadioItem, TFormInputValue} from "src/shared/components/UI/SprykerForm/types";

interface UpdateProfileProps extends WithStyles<typeof pageStyles> {
  submitHandler: (event: FormEvent<HTMLFormElement>) => void;
  inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
  firstName: TCustomerFirstName;
  lastName: TCustomerLastName;
  salutation: TCustomerSalutation;
  email: TCustomerSalutation;
}

export const sectionTitle = 'Update Profile';

export const UpdateProfileBase: React.SFC<UpdateProfileProps> = (props): JSX.Element => {
  const {
    classes,
    submitHandler,
    inputChangeHandler,
    firstName,
    lastName,
    salutation,
    email,
  } = props;

  return (
    <SprykerForm
      form={{
        formName: 'profileForm',
        onChangeHandler: inputChangeHandler,
        onSubmitHandler: submitHandler,
        fields: [
          [{
            type: 'select',
            inputName: 'salutation',
            inputValue: salutation,
            spaceNumber: 2,
            isRequired: true,
            label: 'Salutation',
            isError: false,
            menuItems: salutationVariants
              .map((item: TSalutationVariant) => ({value: item.value, name: item.label})),
          }, {
            type: 'input',
            inputName: 'firstName',
            inputValue: firstName,
            spaceNumber: 5,
            isRequired: true,
            label: 'First Name',
            isError: false,
          }, {
            type: 'input',
            inputName: 'lastName',
            inputValue: lastName,
            spaceNumber: 5,
            isRequired: true,
            label: 'Last Name',
            isError: false,
          }], [{
            type: 'input',
            inputName: 'email',
            inputValue: email,
            spaceNumber: 5,
            isRequired: true,
            label: 'Email address',
            isError: false,
          }]
        ]
      }}
      SubmitButton={
        <Grid container>
          <Grid item xs={12} sm={2}>
            <SprykerButton title="update" btnType="submit" className={classes.button} />
          </Grid>
        </Grid>
      }
      formClassName={ classes.form }
    />
  );
};

export const UpdateProfile = withStyles(pageStyles)(UpdateProfileBase);

