import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {IDeliveryFormProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/DeliveryForm/types";
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {FieldFirstName} from "src/shared/components/Common/FormFields/FieldFirstName/index";
import {FieldLastName} from "src/shared/components/Common/FormFields/FieldLastName/index";
import {FieldSalutation} from "src/shared/components/Common/FormFields/FieldSalutation/index";

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
             <FieldSalutation
               formName={deliveryFormName}
               value={salutation}
               onChangeHandler={inputChangeHandler}
             />
            </Grid>

            <Grid item xs={12} sm={6} className={classes.control}>
              <FieldFirstName
                formName={deliveryFormName}
                value={firstName}
                onChangeHandler={inputChangeHandler}
              />
              <FieldLastName
                formName={deliveryFormName}
                value={lastName}
                onChangeHandler={inputChangeHandler}
              />
            </Grid>

            <Grid item xs={12} sm={5} className={classes.control}>

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

