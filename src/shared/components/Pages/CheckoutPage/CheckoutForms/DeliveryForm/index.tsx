import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';

import { styles } from './styles';
import {IDeliveryFormProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/DeliveryForm/types";
import {salutationVariants} from "src/shared/constants/customer/index";
import {TSalutationVariant} from "src/shared/interfaces/customer/index";
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {FieldFirstName} from "src/shared/components/Common/FormFields/FieldFirstName/index";

const deliveryFormName = 'delivery';

export const DeliveryFormBase: React.SFC<IDeliveryFormProps> = (props): JSX.Element => {
  const {
    classes,
    submitHandler,
    inputChangeHandler,
    shippingAddress: {
      firstName,
      lastName,
      salutation,
    }
  }  = props;

  return (
    <Grid container className={ classes.root }>
      <Grid item xs={ 12 }>

        <form
          className={classes.form}
          noValidate
          autoComplete="off"
          onSubmit={submitHandler}
          id={`${deliveryFormName}`}
          name={`${deliveryFormName}`}
        >

          <Grid container justify="flex-start" className={classes.controlsGroup}>
            <Grid item xs={12} sm={2} className={classes.control}>
              <TextField
                required
                id={`${deliveryFormName}-salutation`}
                select
                label="Salutation"
                name="salutation"
                className={classes.textField}
                value={salutation}
                onChange={inputChangeHandler}
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
            </Grid>

            <Grid item xs={12} sm={5} className={classes.control}>
              <FieldFirstName
                formName={deliveryFormName}
                value={firstName}
                onChangeHandler={inputChangeHandler}
              />
            </Grid>

            <Grid item xs={12} sm={5} className={classes.control}>
              <TextField
                required
                id={`${deliveryFormName}-last-name`}
                label="Last Name"
                name="lastName"
                type="text"
                value={lastName}
                onChange={inputChangeHandler}
                className={classes.textField}
                margin="normal"
                fullWidth
                InputLabelProps={{
                  shrink: true,
                }}
                InputProps={{
                  className: classes.input,
                }}
              />
            </Grid>
          </Grid>

          <Grid container justify="flex-start" className={classes.controlsGroup}>
            <Grid item xs={12} sm={12} className={classes.control}>
            </Grid>
          </Grid>


        </form>

      </Grid>
    </Grid>
  );
};

export const DeliveryForm = withStyles(formStyles)(DeliveryFormBase);

