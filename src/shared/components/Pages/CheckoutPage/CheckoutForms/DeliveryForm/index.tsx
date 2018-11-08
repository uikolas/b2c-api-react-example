import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {IDeliveryFormProps} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/DeliveryForm/types";
import {formStyles} from "src/shared/components/Pages/CheckoutPage/CheckoutForms/styles";
import {FieldTextInput} from "src/shared/components/Common/FormFields/FieldTextInput/index";
import {
  InputLabelCity,
  InputLabelCompany,
  InputLabelCountry,
  InputLabelFirstName,
  InputLabelLastName,
  InputLabelNumber,
  InputLabelPhone,
  InputLabelStreet,
  InputLabelStreetExtra,
  InputLabelZipCode
} from "src/shared/constants/forms/labels";
import {SprykerSelect} from "src/shared/components/UI/SprykerSelect/index";
import {salutationVariants} from "src/shared/constants/customer/index";
import {TSalutationVariant} from "src/shared/interfaces/customer/index";

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
      address1,
      address2,
      address3,
      zipCode,
      city,
      country,
      company,
      phone,
      iso2Code,
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

          <Grid container justify="flex-start" alignItems="center" className={classes.controlsGroup}>
            <Grid item xs={12} sm={4} className={classes.control}>
              <SprykerSelect
                currentMode={salutation}
                changeHandler={inputChangeHandler}
                menuItems={salutationVariants
                  .map((item: TSalutationVariant) => ({value: item.value, name: item.label}))}
                name="salutation"
              />
            </Grid>
          </Grid>

          <Grid container justify="flex-start" alignItems="center" className={classes.controlsGroup}>
            <Grid item xs={12} sm={6} className={classes.control}>
              <FieldTextInput
                formName={deliveryFormName}
                inputName="firstName"
                value={firstName}
                onChangeHandler={inputChangeHandler}
                label={InputLabelFirstName}
                isError={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.control}>
              <FieldTextInput
                formName={deliveryFormName}
                inputName="lastName"
                value={lastName}
                onChangeHandler={inputChangeHandler}
                label={InputLabelLastName}
                isError={false}
              />
            </Grid>
          </Grid>

          <Grid container justify="flex-start" alignItems="center" className={classes.controlsGroup}>
            <Grid item xs={12} sm={6} className={classes.control}>
              <FieldTextInput
                formName={deliveryFormName}
                inputName="company"
                value={company}
                onChangeHandler={inputChangeHandler}
                label={InputLabelCompany}
                isError={false}
              />
            </Grid>
          </Grid>

          <Grid container justify="flex-start" alignItems="center" className={classes.controlsGroup}>
            <Grid item xs={12} sm={6} className={classes.control}>
              <FieldTextInput
                formName={deliveryFormName}
                inputName="address1"
                value={address1}
                onChangeHandler={inputChangeHandler}
                label={InputLabelStreet}
                isError={false}
              />
            </Grid>
            <Grid item xs={12} sm={4} className={classes.control}>
              <FieldTextInput
                formName={deliveryFormName}
                inputName="address2"
                value={address2}
                onChangeHandler={inputChangeHandler}
                label={InputLabelNumber}
                isError={false}
              />
            </Grid>
          </Grid>

          <Grid container justify="flex-start" alignItems="center" className={classes.controlsGroup}>
            <Grid item xs={12} sm={6} className={classes.control}>
              <FieldTextInput
                formName={deliveryFormName}
                inputName="address3"
                value={address3}
                onChangeHandler={inputChangeHandler}
                label={InputLabelStreetExtra}
                isError={false}
              />
            </Grid>
          </Grid>

          <Grid container justify="flex-start" alignItems="center" className={classes.controlsGroup}>
            <Grid item xs={12} sm={6} className={classes.control}>
              <FieldTextInput
                formName={deliveryFormName}
                inputName="city"
                value={city}
                onChangeHandler={inputChangeHandler}
                label={InputLabelCity}
                isError={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.control}>
              <FieldTextInput
                formName={deliveryFormName}
                inputName="zipCode"
                value={zipCode}
                onChangeHandler={inputChangeHandler}
                label={InputLabelZipCode}
                isError={false}
              />
            </Grid>
          </Grid>

          <Grid container justify="flex-start" alignItems="center" className={classes.controlsGroup}>
            <Grid item xs={12} sm={6} className={classes.control}>
              <FieldTextInput
                formName={deliveryFormName}
                inputName="country"
                value={country}
                onChangeHandler={inputChangeHandler}
                label={InputLabelCountry}
                isError={false}
              />
            </Grid>
            <Grid item xs={12} sm={6} className={classes.control}>
              <FieldTextInput
                formName={deliveryFormName}
                inputName="phone"
                value={phone}
                onChangeHandler={inputChangeHandler}
                label={InputLabelPhone}
                isError={true}
              />
            </Grid>
          </Grid>

        </form>

      </Grid>
    </Grid>
  );
};

export const DeliveryForm = withStyles(formStyles)(DeliveryFormBase);
