import * as React from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { reduxify } from 'src/shared/lib/redux-helper';
import { resetPasswordAction } from '@stores/actions/pages/login';
import { AppMain } from 'src/shared/components/Common/AppMain';
import { getRouterMatchParam } from 'src/shared/helpers/router/index';
import { TRouterMatchParam } from 'src/shared/helpers/router/types';
import { formStyles } from '../styles';
import { IReduxOwnProps, IReduxStore } from "src/shared/stores/reducers/types";
import { ClickEvent, InputChangeEvent } from "src/shared/interfaces/common/react";
import { IResetPasswordPayload } from "src/shared/interfaces/customer/index";
import {
    EnterNewPasswordMessage,
    ConfirmPasswordTitle,
    PasswordTitle,
} from 'src/shared/translation/translations';
import { FormattedMessage } from 'react-intl';


interface ResetPasswordPageProps extends WithStyles<typeof formStyles> {
    dispatch?: Function;
    restoreKey?: TRouterMatchParam;
}

interface ResetPasswordPageState {
    password: string;
    confirmPassword: string;
    submitted: boolean;
}

export class ResetPasswordPageBase extends React.Component<ResetPasswordPageProps, ResetPasswordPageState> {
    public state: ResetPasswordPageState = {
        password: '',
        confirmPassword: '',
        submitted: false,
    };

    public handleChange = (event: InputChangeEvent) => {
        const { name, value } = event.target;
        this.setState({
            ...this.state, [ name ]: value,
        });
    };

    public submitRequest = (e: ClickEvent) => {
        this.setState({ submitted: true });
        if (this.state.password !== this.state.confirmPassword) {
            return;
        }

        const payload: IResetPasswordPayload = {
            restorePasswordKey: this.props.restoreKey,
            password: this.state.password,
            confirmPassword: this.state.confirmPassword,
        };

        this.props.dispatch(resetPasswordAction(payload));
    };

    public render() {
        const { classes } = this.props;

        return (
            <AppMain>
                <Grid
                    item xs={ 12 }
                    container
                    justify="center"
                >
                    <Paper className={ classes.forgot }>
                        <Typography variant="headline" paragraph>
                            <FormattedMessage id={ 'reset.password.title' } />
                        </Typography>
                        <div>{ EnterNewPasswordMessage }</div>
                        <form noValidate autoComplete="off">

                            <TextField
                                required
                                type="password"
                                label={ <FormattedMessage id={ 'word.password.title' } /> }
                                name="password"
                                value={ this.state.password }
                                placeholder={ PasswordTitle }
                                margin="normal"
                                onChange={ this.handleChange }
                                className={ classes.textField }
                            />
                            <TextField
                                required
                                type="password"
                                error={ this.state.submitted && this.state.password !== this.state.confirmPassword }
                                label={ <FormattedMessage id={ 'confirm.password.title' } /> }
                                name="confirmPassword"
                                value={ this.state.confirmPassword }
                                placeholder={ ConfirmPasswordTitle }
                                margin="normal"
                                onChange={ this.handleChange }
                                className={ classes.textField }
                            />

                        </form>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={ this.submitRequest }
                        >
                            <FormattedMessage id={ 'word.submit.title' } />
                        </Button>
                    </Paper>
                </Grid>
            </AppMain>
        );
    }
}

const ResetPassword = withStyles(formStyles)(ResetPasswordPageBase);

export const ResetPasswordPage = reduxify(
    (state: IReduxStore, ownProps: IReduxOwnProps) => {
        const restoreKey = getRouterMatchParam(state, ownProps, 'restoreKey');
        return (
            { restoreKey }
        );
    },
)(ResetPassword);

export default ResetPasswordPage;
