import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import { salutationVariants } from 'src/shared/constants/customer';
import { TSalutationVariant } from 'src/shared/interfaces/customer';

import { BasicInformationFormProps as Props } from './types';
import { styles } from './styles';

export const BasicInformationFormComponent: React.SFC<Props> = ({
  submitted, salutation, firstName, lastName, handleChange,
}) => (
  <Grid container spacing={ 16 }>
    <Grid item xs={ 12 } sm={ 2 }>
      <TextField
        required
        fullWidth
        error={ submitted && !salutation }
        select
        label="Salutation"
        name="salutation"
        value={ salutation }
        onChange={ this.handleChangeSalutation }
      >
        { salutationVariants.map((option: TSalutationVariant) => (
          <MenuItem key={ option.value } value={ option.value }>{ option.label }</MenuItem>
        )) }
      </TextField>
    </Grid>
    <Grid item xs={ 12 } sm={ 5 }>
      <TextField
        required
        fullWidth
        error={ submitted && !firstName }
        label="First Name"
        type="text"
        value={ firstName }
        name="firstName"
        onChange={ handleChange }
      />
    </Grid>
    <Grid item xs={ 12 } sm={ 5 }>
      <TextField
        required
        fullWidth
        error={ submitted && !lastName }
        label="Last Name"
        name="lastName"
        value={ lastName }
        onChange={ handleChange }
      />
    </Grid>
  </Grid>
);

export const BasicInformationForm = withStyles(styles)(BasicInformationFormComponent);
