import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';

import { WishlistPageProps as Props } from './types';

import { AppPageTitle } from '@components/Common/AppPageTitle';
import { ErrorBoundary } from '@components/Library/ErrorBoundary';
import { AddNewWishListForm } from './containers/addNewWishListForm';
import { WishListsTable } from './containers/wishListsTable';

import { Grid, withStyles } from '@material-ui/core';
import { styles } from './styles';

@connect
export class WishListBase extends React.Component<Props> {
    public componentDidMount() {
        if (!this.props.isInitial) {
            this.props.getWishlistsAction();
        }
    }

    public render() {
        const { classes } = this.props;

        return (
            <Grid container>
                <Grid item xs={12}>
                    <AppPageTitle
                        classes={{root: classes.appPageTitleRoot, pageHeader: classes.appPageTitleRootPageHeader}}
                        title={<FormattedMessage id={ 'word.wishlist.title' } />}
                    />
                </Grid>

                <Grid item xs={12}>
                    <ErrorBoundary>
                        <AddNewWishListForm />
                    </ErrorBoundary>

                    <ErrorBoundary>
                        <WishListsTable />
                    </ErrorBoundary>
                </Grid>
            </Grid>
        );
    }
}

export const ConnectedWishlistPage = withStyles(styles)(WishListBase);

export default ConnectedWishlistPage;
