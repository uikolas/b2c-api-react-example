import * as React from 'react';
import { withRouter } from 'react-router';
import { connect } from './connect';
import withStyles from '@material-ui/core/styles/withStyles';
import { LoginPageProps, LoginPageState } from './types';
import Grid from '@material-ui/core/Grid';
import { NavLink } from 'react-router-dom';
import { pathCustomerPage, pathForgotPassword } from 'src/shared/routes/contentRoutes';
import { AppMain } from '../../Common/AppMain';
import { LoginForm } from './LoginForm';
import { RegisterFormComponent } from './RegisterFormComponent';
import { styles } from './styles';
import { FormattedMessage } from 'react-intl';

@(withStyles(styles) as Function)
@(withRouter as Function)
@connect
export class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
    public state: LoginPageState = {};

    public componentDidUpdate(prevProps: LoginPageProps) {
        if (!prevProps.isAuth && this.props.isAuth) {
            this.props.getCustomerCart();
            this.props.history.push(pathCustomerPage);
        }
    }

    public render() {
        const {classes} = this.props;

        return (
            <AppMain>
                <Grid item xs={12} sm={12} md={6}
                    direction="column"
                    container
                    justify="center"
                    alignItems="center"
                >
                    <LoginForm handleSubmit={this.props.handleSubmitLoginForm} />
                    <div className={classes.link}>
                        <NavLink to={pathForgotPassword}>
                            <FormattedMessage id={ 'forgot.password.title' } />
                        </NavLink>
                    </div>
                </Grid>
                <div className={classes.divider} id="divider"/>
                <Grid item xs={12} sm={12} md={6}
                    direction="column"
                    container
                    justify="center"
                    alignItems="center"
                >
                    <RegisterFormComponent handleSubmit={this.props.handleSubmitRegisterForm}/>
                </Grid>
            </AppMain>
        );
    }
}
