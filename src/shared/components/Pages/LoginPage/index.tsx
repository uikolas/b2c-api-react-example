import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from './connect';
import { styles } from './styles';
import withStyles from '@material-ui/core/styles/withStyles';
import { LoginPageProps, LoginPageState } from './types';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import { pathCustomerPage, pathForgotPassword } from 'src/shared/routes/contentRoutes';
import { AppMain } from '@components/Common/AppMain';
import { LoginForm } from '@components/containers/LoginForm';
import { RegisterFormComponent } from '@components/containers/RegisterFormComponent';
import { FormattedMessage } from 'react-intl';
import { ErrorBoundary } from '@components/hoc/ErrorBoundary';

@(withRouter as Function)
@connect
export class LoginPageBase extends React.Component<LoginPageProps, LoginPageState> {
    public state: LoginPageState = {};

    public componentDidUpdate(prevProps: LoginPageProps) {
        if (!prevProps.isAuth && this.props.isAuth) {
            this.props.getCustomerCart();
            this.props.history.push(pathCustomerPage);
        }
    }

    public render() {
        const {classes, handleSubmitLoginForm, handleSubmitRegisterForm} = this.props;

        return (
            <AppMain>
                <Grid item xs={12} sm={12} md={6}
                      direction="column"
                      container
                      justify="center"
                      alignItems="center"
                >
                    <ErrorBoundary>
                        <LoginForm handleSubmit={handleSubmitLoginForm} />
                    </ErrorBoundary>
                    <div className={classes.link}>
                        <NavLink to={pathForgotPassword}>
                            <FormattedMessage id={'forgot.password.title'} />
                        </NavLink>
                    </div>
                </Grid>
                <div className={classes.divider} id="divider" />
                <Grid item xs={12} sm={12} md={6}
                      direction="column"
                      container
                      justify="center"
                      alignItems="center"
                >
                    <ErrorBoundary>
                        <RegisterFormComponent handleSubmit={handleSubmitRegisterForm} />
                    </ErrorBoundary>
                </Grid>
            </AppMain>
        );
    }
}

export const LoginPageComponent = withStyles(styles)(LoginPageBase);
