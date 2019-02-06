import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { connect } from './connect';

import { ChangePasswordProps } from './types';

import { CustomerPageTitle } from '@components/Common/CustomerPageTitle';
import { SprykerButton } from '@components/UI/SprykerButton';
import { SprykerForm } from '@components/UI/SprykerForm';
import { typeNotificationWarning } from '@constants/notifications';
import { NotificationsMessage } from '@components/Common/Notifications/NotificationsMessage';
import { IProfileFieldInput } from '@components/Pages/CustomerProfilePage/types';
import { ChangePasswordState } from '@components/Pages/CustomerProfilePage/containers/changePassword/types';

import { Grid, withStyles } from '@material-ui/core';
import { styles } from '../../styles';

@connect
export class ChangePasswordComponent extends React.Component<ChangePasswordProps, ChangePasswordState> {
    constructor(props: ChangePasswordProps) {
        super(props);

        this.state = {
            password: '',
            newPassword: '',
            confirmPassword: ''
        };
    }

    public componentDidUpdate = (prevProps: ChangePasswordProps, prevState: ChangePasswordState) => {
        if (this.props.passwordUpdated && !prevProps.passwordUpdated) {
            this.clearPasswords();
        }
    };

    public handleInputChange = (event: { target: IProfileFieldInput }): void => {
        const {name, value}: IProfileFieldInput = event.target;
        const cleanValue = value.trim();

        if (this.state.hasOwnProperty(name) && this.state[name] !== cleanValue) {
            this.setState({...this.state, [name]: cleanValue});
        }
    };

    public handleSubmitPassword = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();
        const { password, newPassword, confirmPassword } = this.state;
        if (!password || !newPassword || !confirmPassword || !this.props.customerReference) {
            NotificationsMessage({
                id: 'empty.required.fields.message',
                type: typeNotificationWarning
            });

            return null;
        }
        if (newPassword !== confirmPassword) {
            NotificationsMessage({
                id: 'password.not.equal.message',
                type: typeNotificationWarning
            });

            return null;
        }
        const passwordData = { password, newPassword, confirmPassword };
        this.props.updateCustomerPassword(this.props.customerReference, passwordData);
    };

    private clearPasswords = (): void => {
        this.setState({
            newPassword: '',
            password: '',
            confirmPassword: ''
        });
    };

    public render = () => {
        const {
            classes
        } = this.props;

        const {
            password,
            newPassword,
            confirmPassword
        } = this.state;

        return (
            <>
                <CustomerPageTitle title={<FormattedMessage id={ 'change.password.title' } />} />

                <SprykerForm
                    form={ {
                        formName: 'passwordForm',
                        onChangeHandler: this.handleInputChange,
                        onSubmitHandler: this.handleSubmitPassword,
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
            </>
        );
    }
}

export const ChangePassword = withStyles(styles)(ChangePasswordComponent);
