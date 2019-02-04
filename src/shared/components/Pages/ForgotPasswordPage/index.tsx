import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { connect } from './connect';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import BackIcon from '@material-ui/icons/ChevronLeft';
import { ForgotPasswordPageProps, ForgotPasswordPageState } from './types';
import { AppMain } from 'src/shared/components/Common/AppMain';
import { styles } from './styles';
import { ClickEvent, InputChangeEvent } from 'src/shared/interfaces/common/react';
import { FormattedMessage } from 'react-intl';

@connect
export class ForgotPasswordPageBase extends React.Component<ForgotPasswordPageProps, ForgotPasswordPageState> {
    public state: ForgotPasswordPageState = {
        email: ''
    };

    public handleChange = (e: InputChangeEvent) => {
        this.setState({email: e.target.value});
    };

    public submitRequest = (e: ClickEvent) => {
        this.props.sendForgotRequest(this.state.email);
    };

    public render() {
        const {classes, routerGoBack} = this.props;
        const {email} = this.state;

        return (
            <AppMain>
                <Grid
                    item xs={12}
                    container
                    justify="center"
                >
                    <Paper className={classes.forgot}>
                        <Typography color="primary" variant="headline" paragraph>
                            <FormattedMessage id={'recovery.password.title'} />
                        </Typography>
                        <Typography variant="title" paragraph>
                            <FormattedMessage id={'enter.email.address.message'} />
                        </Typography>
                        <form autoComplete="off">
                            <TextField
                                required
                                inputProps={{type: 'email'}}
                                label={<FormattedMessage id={'email.label'} />}
                                className={classes.email}
                                value={email}
                                helperText={<FormattedMessage id={'email.label'} />}
                                FormHelperTextProps={{
                                    classes: {
                                        root: classes.placeholder,
                                        filled: email.length > 0 ? classes.filled : null
                                    }
                                }}
                                onChange={this.handleChange}
                            />
                        </form>
                        <Grid container justify="flex-end">
                            <Button
                                variant="outlined"
                                color="primary"
                                className={classes.passwordButtons}
                                onClick={() => routerGoBack()}
                            >
                                <BackIcon />
                                <FormattedMessage id={'word.back.title'} />
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.passwordButtons}
                                onClick={this.submitRequest}
                            >
                                <FormattedMessage id={'word.submit.title'} />
                            </Button>
                        </Grid>
                    </Paper>
                </Grid>
            </AppMain>
        );
    }
}

export const ForgotPasswordPage = withStyles(styles)(ForgotPasswordPageBase);
