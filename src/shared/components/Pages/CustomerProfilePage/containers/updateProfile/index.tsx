import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';

import { UpdateProfileProps, UpdateProfileState, IProfileFieldInput } from './types';
import { TSalutationVariant } from '@interfaces/customer';

import { SprykerButton } from '@components/UI/SprykerButton';
import { SprykerForm } from '@components/UI/SprykerForm';
import { NotificationsMessage } from '@components/Common/Notifications/NotificationsMessage';
import { CustomerPageTitle } from '@components/Common/CustomerPageTitle';

import { SalutationVariants } from '@constants/customer';
import { typeNotificationWarning } from '@constants/notifications';

import { Grid, withStyles } from '@material-ui/core';
import { styles } from '../../styles';

@connect
export class UpdateProfileComponent extends React.Component<UpdateProfileProps, UpdateProfileState> {
    constructor(props: UpdateProfileProps) {
        super(props);

        this.state = {
            salutation: props.customerData ? props.customerData.salutation : '',
            firstName: props.customerData ? props.customerData.firstName : '',
            lastName: props.customerData ? props.customerData.lastName : '',
            email: props.customerData ? props.customerData.email : ''
        };
    }

    public handleInputChange = (event: { target: IProfileFieldInput }): void => {
        const { name, value }: IProfileFieldInput = event.target;
        const cleanValue = value.trim();

        if (this.state.hasOwnProperty(name) && this.state[name] !== cleanValue) {
            this.setState({
                ...this.state,
                [name]: cleanValue
            });
        }
    };

    public handleSubmitUpdateProfile = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        if (!this.props.customerReference) {
            return;
        }
        const {firstName, lastName, salutation, email} = this.state;

        if (!firstName || !lastName || !email || !salutation) {
            NotificationsMessage({
                id: 'empty.required.fields.message',
                type: typeNotificationWarning
            });

            return null;
        }
        const profileData = { salutation, firstName, lastName, email };
        this.props.updateCustomerData(this.props.customerReference, profileData);
    };

    public render = () => {
        const {
            classes
        } = this.props;

        const {
            firstName,
            lastName,
            salutation,
            email
        } = this.state;

        return (
            <>
                <CustomerPageTitle title="profile" />

                <SprykerForm
                    form={ {
                        formName: 'profileForm',
                        onChangeHandler: this.handleInputChange,
                        onSubmitHandler: this.handleSubmitUpdateProfile,
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
            </>
        );
    }
}

export const UpdateProfile = withStyles(styles)(UpdateProfileComponent);
