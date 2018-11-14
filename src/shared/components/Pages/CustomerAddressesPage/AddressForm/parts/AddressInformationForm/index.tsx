import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid/Grid';
import TextField from '@material-ui/core/TextField/TextField';
import MenuItem from '@material-ui/core/MenuItem/MenuItem';

import { AddressInformationFormProps as Props } from './types';
import { styles } from './styles';

export const AddressInformationFormComponent: React.SFC<Props> = ({
  submitted, zipCode, city, iso2Code, countries, handleChange, handleChangeCountry,
}) => (
  <Grid container spacing={ 16 }>
    <Grid item xs={ 12 } sm={ 4 }>
      <TextField
        required
        error={ submitted && !zipCode }
        fullWidth
        label="Zip Code"
        name="zipCode"
        value={ zipCode }
        onChange={ handleChange }
      />
    </Grid>
    <Grid item xs={ 12 } sm={ 4 }>
      <TextField
        required
        error={ submitted && !city }
        fullWidth
        label="City"
        name="city"
        value={ city }
        onChange={ handleChange }
      />
    </Grid>
    <Grid item xs={ 12 } sm={ 4 }>
      <TextField
        required
        select
        error={ submitted && !iso2Code }
        fullWidth
        label="Country"
        name="iso2Code"
        value={ iso2Code }
        onChange={ handleChangeCountry }
      >
        { countries.map(country => (
          <MenuItem key={ `country-${country.iso2Code}` } value={ country.iso2Code }>{ country.name }</MenuItem>
        )) }
      </TextField>
    </Grid>
  </Grid>
);

export const AddressInformationForm = withStyles(styles)(AddressInformationFormComponent);
