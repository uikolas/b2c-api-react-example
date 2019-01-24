import * as React from 'react';
import { ChangeEvent, FormEvent } from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import { styles } from '../styles';
import { SprykerButton } from 'src/shared/components/UI/SprykerButton';
import { SprykerForm } from 'src/shared/components/UI/SprykerForm';
import {
    TCustomerEmail,
    TCustomerFirstName,
    TCustomerLastName,
    TCustomerSalutation,
    TSalutationVariant,
} from 'src/shared/interfaces/customer';
import { SalutationVariants } from 'src/shared/constants/customer/index';
import { FormattedMessage } from 'react-intl';

interface UpdateProfileProps extends WithStyles<typeof styles> {
    submitHandler: (event: FormEvent<HTMLFormElement>) => void;
    inputChangeHandler: (event: ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => void;
    firstName: TCustomerFirstName;
    lastName: TCustomerLastName;
    salutation: TCustomerSalutation;
    email: TCustomerEmail;
}


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
            form={ {
                formName: 'profileForm',
                onChangeHandler: inputChangeHandler,
                onSubmitHandler: submitHandler,
                fields: [
                    [ {
                        type: 'select',
                        inputName: 'salutation',
                        inputValue: salutation,
                        spaceNumber: 2,
                        isRequired: true,
                        label: <FormattedMessage id={ 'salutation.label' } />,
                        isError: false,
                        menuItems: SalutationVariants
                            .map((item: TSalutationVariant) => ({ value: item.value, name: item.label })),
                    }, {
                        type: 'input',
                        inputName: 'firstName',
                        inputValue: firstName,
                        spaceNumber: 5,
                        isRequired: true,
                        label: <FormattedMessage id={ 'first.name.label' } />,
                        isError: false,
                    }, {
                        type: 'input',
                        inputName: 'lastName',
                        inputValue: lastName,
                        spaceNumber: 5,
                        isRequired: true,
                        label: <FormattedMessage id={ 'last.name.label' } />,
                        isError: false,
                    } ], [ {
                        type: 'input',
                        inputName: 'email',
                        inputValue: email,
                        inputType: 'email',
                        spaceNumber: 5,
                        isRequired: true,
                        label: <FormattedMessage id={ 'email.label' } />,
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

export const UpdateProfile = withStyles(styles)(UpdateProfileBase);
