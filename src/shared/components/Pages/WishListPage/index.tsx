import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';

import { WishlistPageProps as Props, WishlistPageState as State } from './types';
import { InputChangeEvent } from '@interfaces/common/react';

import { AppPageTitle } from '@components/Common/AppPageTitle';
import { WishListsTable } from './containers/wishListsTable';

import { Grid, Typography, Paper, TextField, Button, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
export class WishListBase extends React.Component<Props, State> {
    public state: State = {
        name: '',
        updatedName: '',
        updatedList: '',
    };

    public componentDidMount() {
        if (!this.props.isInitial) {
            this.props.getWishlistsAction();
        }
    }

    public handleChangeName = (event: InputChangeEvent): void => {
        event.persist();
        this.setState(() => ({name: event.target.value}));
    };

    public addWishlist = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!this.state.name.trim()) {
            return;
        }
        this.props.addWishlistAction(this.state.name);
        this.setState(() => ({name: ''}));
    };

    public render() {
        const { classes, wishlists, isLoading } = this.props;
        const { name } = this.state;

        if (!wishlists.length && isLoading) {
            return null;
        }

        return (
            <Grid container>
                <Grid item xs={12}>
                    <AppPageTitle
                        classes={{root: classes.appPageTitleRoot, pageHeader: classes.appPageTitleRootPageHeader}}
                        title={<FormattedMessage id={ 'word.wishlist.title' } />}
                    />
                </Grid>

                <Grid item xs={12}>
                    <form noValidate autoComplete="off" onSubmit={this.addWishlist} className={classes.form}>
                        <Typography paragraph className={ classes.titleForm }>
                            <FormattedMessage id={ 'add.new.wishlist.title' } />
                        </Typography>
                        <Paper elevation={0} className={classes.formItem}>
                            <TextField
                                className={ classes.textFieldForm }
                                value={ name }
                                helperText={ <FormattedMessage id={ 'wishlist.name.title' } /> }
                                FormHelperTextProps={ {
                                    classes: {
                                        root: classes.placeholder,
                                        filled: name.length > 0 ? classes.filled : null
                                    }
                                } }
                                variant={ 'outlined' }
                                onChange={ this.handleChangeName }
                                inputProps={ { className: classes.input } }
                            />
                            <Button type="submit" variant="contained" color="primary"
                                    className={ classes.formSubmit }>
                                <FormattedMessage id={ 'add.new.wishlist.title' } />
                            </Button>
                        </Paper>
                    </form>

                    <WishListsTable />
                </Grid>
            </Grid>
        );
    }
}

export const ConnectedWishlistPage = withStyles(styles)(WishListBase);
export default ConnectedWishlistPage;
