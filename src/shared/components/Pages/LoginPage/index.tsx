import * as React from "react";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

const styles = (theme: Theme) => createStyles({
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginTop: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
});

interface LoginPageProps extends WithStyles<typeof styles> {

}

interface LoginPageState {
  open: boolean;
}

class LoginPage extends React.Component<LoginPageProps, LoginPageState> {
  public state: LoginPageState = {
    open: false,
  };

  /*handleNext = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep + 1,
    });
  };*/

  /*handleBack = () => {
    const { activeStep } = this.state;
    this.setState({
      activeStep: activeStep - 1,
    });
  };*/

  /*handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };*/

  public render() {
    const { classes } = this.props;
    // const { activeStep } = this.state;

    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="absolute" color="default" className={classes.appBar}>
          <Toolbar>
            <Grid container direction="row">

              <Grid item xs={6}
                    direction="row"
                    container
                    justify="flex-start"
                    alignItems="center">
                <Typography variant="title" color="inherit" noWrap>
                  Spryker Logo
                </Typography>
              </Grid>

              <Grid item xs={6}
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
            <Grid item xs={6}
                  direction="row"
                  container
                  justify="center"
                  alignItems="center">
              <Typography variant="title" color="inherit" noWrap>
                Login Part
              </Typography>
            </Grid>

            <Grid item xs={6}
                  direction="row"
                  container
                  justify="center"
                  alignItems="center">
              <Typography variant="title" color="inherit" noWrap>
                Register Part
              </Typography>
            </Grid>

          </Grid>
        </main>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(LoginPage);
