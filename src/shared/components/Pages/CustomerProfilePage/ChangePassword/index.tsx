import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { styles } from '../styles';
import { SprykerButton } from 'src/shared/components/UI/SprykerButton';
import { SprykerForm } from 'src/shared/components/UI/SprykerForm';
import { TCustomerPassword } from 'src/shared/interfaces/customer';
import { FormattedMessage } from 'react-intl';

interface ChangePasswordProps extends WithStyles<typeof styles> {
    submitHandler: (event: FormEvent<HTMLFormElement>) => void;
    inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
    password: TCustomerPassword;
    newPassword: TCustomerPassword;
    confirmPassword: TCustomerPassword;
}

export const ChangePasswordBase: React.SFC<ChangePasswordProps> = (props): JSX.Element => {
    const {
        classes,
        submitHandler,
        inputChangeHandler,
        password,
        newPassword,
        confirmPassword,
    } = props;

    return (
        <SprykerForm
            form={ {
                formName: 'passwordForm',
                onChangeHandler: inputChangeHandler,
                onSubmitHandler: submitHandler,
                fields: [
                    [ {
                        type: 'input',
                        inputName: 'password',
                        inputValue: password,
                        inputType: 'password',
                        spaceNumber: 5,
                        isRequired: true,
                        label: <FormattedMessage id={ 'password.label' } />,
                        isError: false,
                    } ], [ {
                        type: 'input',
                        inputName: 'newPassword',
                        inputValue: newPassword,
                        inputType: 'password',
                        spaceNumber: 5,
                        isRequired: true,
                        label: <FormattedMessage id={ 'new.password.label' } />,
                        isError: false,
                    }, {
                        type: 'input',
                        inputName: 'confirmPassword',
                        inputValue: confirmPassword,
                        inputType: 'password',
                        spaceNumber: 5,
                        isRequired: true,
                        label: <FormattedMessage id={ 'confirm.password.label' } />,
                        isError: false,
                    } ]
                ]
            } }
            SubmitButton={
                <Grid container>
                    <Grid item xs={ 12 } sm={ 2 }>
                        <SprykerButton
                            title={ <FormattedMessage id={ 'word.update.title' } /> }
                            btnType="submit"
                            extraClasses={ classes.submitButton }
                        />
                    </Grid>
                </Grid>
            }
            formClassName={ classes.form }
        />
    );
};

export const ChangePassword = withStyles(styles)(ChangePasswordBase);
