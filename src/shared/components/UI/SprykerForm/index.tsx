import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {sprykerFormStyles} from "src/shared/components/UI/SprykerForm/sprykerFormStyles";
import {IFormField, ISprykerFormProps} from "src/shared/components/UI/SprykerForm/types";
import {FieldTextInput} from "src/shared/components/UI/SprykerForm/FieldTextInput/index";
import {SprykerSelect} from "src/shared/components/UI/SprykerSelect/index";


export const SprykerFormBase: React.SFC<ISprykerFormProps> = (props): JSX.Element => {
  const {
    classes,
    form: {
      formName,
      onChangeHandler,
      onSubmitHandler,
      fields,
    },
  }  = props;

  const isRowsExist = (fields.length > 0);

  return (
    <form
      className={classes.form}
      noValidate
      autoComplete="off"
      onSubmit={onSubmitHandler}
      id={`${formName}`}
      name={`${formName}`}
    >
      {isRowsExist && fields.map((row: Array<IFormField>) => {
        const isFieldsExist = (row.length > 0);
        return (
          <Grid
            container
            justify="flex-start"
            alignItems="center"
            className={classes.controlsGroup}
            key={`${formName}-${row[0].inputName}`}
          >
            {isFieldsExist && row.map((field: IFormField) => {
              let fieldComponent: JSX.Element | null;

              if (field.type === 'input') {
                fieldComponent = (
                  <FieldTextInput
                    formName={formName}
                    inputName={field.inputName}
                    inputValue={field.inputValue}
                    isRequired={field.isRequired ? field.isRequired : false}
                    onChangeHandler={field.onChangeOwnHandler ? field.onChangeOwnHandler : onChangeHandler}
                    label={field.label ? field.label : null}
                    isError={field.isError ? field.isError : false}
                  />
                );
              } else if (field.type === 'select' && field.menuItems.length > 0) {
                fieldComponent = (
                  <SprykerSelect
                    currentMode={field.inputValue}
                    changeHandler={field.onChangeOwnHandler ? field.onChangeOwnHandler : onChangeHandler}
                    menuItems={field.menuItems}
                    name={field.inputName}
                    label={field.label ? field.label : null}
                    selectClassName={classes.input}
                    isFullWidth={true}
                    isRequired={field.isRequired ? field.isRequired : false}
                    extraTitleClassName={`${classes.selectLabel} ${classes.label}`}
                    extraFormControlClassName={classes.selectFormControlClassName}
                    extraRootClassName={classes.selectRoot}
                    extraInputRootClassName={classes.selectInputRoot}
                    extraSelectFieldClassName={classes.inputRoot}
                  />
                );
              } else {
                fieldComponent = null;
              }

              return (
                <Grid item xs={12} sm={field.spaceNumber} className={classes.control} key={field.inputName}>
                  {fieldComponent}
                </Grid>
              );
            })}
          </Grid>
        );
      })}
    </form>
  );
};

export const SprykerForm = withStyles(sprykerFormStyles)(SprykerFormBase);
