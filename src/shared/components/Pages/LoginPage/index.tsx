import * as React from "react";
import {Location} from 'history';
import { toast } from 'react-toastify';
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import {reduxify} from '../../../lib/redux-helper';
import {ILoginState} from '../../../reducers/Pages/Login';
import {sendLoginAction, customerRegisterAction} from '../../../actions/Pages/Login';
import {Home, IProps} from '../Home';

import {LoginForm} from './LoginForm';
import {RegisterForm} from './RegisterForm';


const styles = (theme: Theme) => createStyles({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginTop: theme.spacing.unit * 4,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
});

interface LoginPageProps extends WithStyles<typeof styles> {
  dispatch?: Function;
  location?: Location;
  customer?: any;
  isAuth?: boolean;
}

interface LoginPageState {
  open: boolean;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  public state: LoginPageState = {
    open: false,
  };

  public componentDidMount() {
    toast.success('Uraaaaaaaaaa');
  }

  public handleSubmitLoginForm = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    console.log('handleSubmitLoginForm submitted');
  }

  public handleSubmitRegisterForm = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    console.log('handleSubmitRegisterForm submitted');
  }


  public render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Grid container direction="row">

              <Grid item xs={12} sm={6}
                    direction="row"
                    container
                    justify="flex-start"
                    alignItems="center">
                <Typography variant="title" color="inherit" noWrap>
                  Spryker Logo
                </Typography>
              </Grid>

              <Grid item xs={12} sm={6}
                    container
                    direction="row"
                    justify="flex-end"
                    alignItems="center"
              >
                <Button variant="contained" component="button" className={classes.button}>
                  Register/Login
                </Button>

                <Button variant="contained" component="button" className={classes.button}>
                  Cart
                </Button>
              </Grid>

            </Grid>

          </Toolbar>
        </AppBar>
        <main className={classes.layout}>
          <Grid item
                xs={12}
                container
                direction="row"
                alignItems="center"
          >
            <Grid item xs={12} sm={6}
                  direction="column"
                  container
                  justify="center"
                  alignItems="center">
              <LoginForm handleSubmit={this.handleSubmitLoginForm} />
            </Grid>

            <Grid item xs={12} sm={6}
                  direction="column"
                  container
                  justify="center"
                  alignItems="center">
              <RegisterForm handleSubmit={this.handleSubmitRegisterForm} />
            </Grid>

          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

const DecoratedClass = withStyles(styles)(LoginPage);

export const ConnectedLogin = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: IProps = state.routing ? state.routing : {};
    const pagesLoginProps: ILoginState = state.pagesLogin ? state.pagesLogin : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        customer: pagesLoginProps && pagesLoginProps.data.customer ? pagesLoginProps.data.customer : ownProps.customer,
        iAuth: pagesLoginProps && pagesLoginProps.data.isAuth ? pagesLoginProps.data.isAuth : ownProps.isAuth,
      }
    );
  }
)(DecoratedClass);
