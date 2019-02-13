import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';

import { IWishlistPageProps as Props } from './types';

import { AppPageTitle } from '@components/Common/AppPageTitle';
import { ErrorBoundary } from '@components/Library/ErrorBoundary';
import { AddNewWishListForm } from './AddNewWishListForm';
import { WishListsTable } from './WishListsTable';

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

export const WishlistPage = withStyles(styles)(WishListBase);

export default WishlistPage;
