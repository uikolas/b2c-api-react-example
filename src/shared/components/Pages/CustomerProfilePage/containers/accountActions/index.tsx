import * as React from 'react';
import { connect } from './connect';
import { FormattedMessage } from 'react-intl';
import { pathLoginPage } from '@routes/contentRoutes';

import { AccountActionsProps, AccountActionsState } from './types';

import { Grid, Typography, Divider } from '@material-ui/core';
import { SprykerButton } from '@components/UI/SprykerButton';
import { SprykerDialog } from '@components/UI/SprykerDialog';

import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from '../../styles';

@connect
export class AccountActionsComponent extends React.Component<AccountActionsProps, AccountActionsState> {
    constructor(props: AccountActionsProps) {
        super(props);

        this.state = {
            isDeleteProfileDialogOpen: false
        };
    }

    public handleDeleteProfileDialogAgree = (event: React.MouseEvent<HTMLElement>): void => {
        if (!this.props.customerReference) {
            return;
        }
        this.props.deleteCustomerEntity(this.props.customerReference);
        this.handleDeleteProfileDialogShowing(event);

        this.props.routerPush(`${pathLoginPage}`);
    };

    public handleDeleteProfileDialogDisagree = (event: React.MouseEvent<HTMLElement>): void => {
        this.handleDeleteProfileDialogShowing(event);
    };

    public handleDeleteProfileDialogShowing = (event: React.SyntheticEvent<{}>): void => {
        this.setState(prev => ({isDeleteProfileDialogOpen: !prev.isDeleteProfileDialogOpen}));
    };

    public handleSubmitDeleteAccount = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        this.setState({
            isDeleteProfileDialogOpen: true
        });
    };

    public render = () => {
        const {
            classes,
        } = this.props;

        return (
            <>
                <Grid container justify="flex-start" className={ classes.section }>
                    <Grid item xs={ 12 }>
                        <Typography variant="title" className={ classes.sectionTitle }>
                            <FormattedMessage id={ 'delete.account.title' } />
                        </Typography>

                        <Divider/>
                    </Grid>

                    <Grid item xs={ 12 }>
                        <Typography variant="body1" className={ classes.warningTitle }>
                            <FormattedMessage id={ 'delete.account.message' } />
                        </Typography>
                    </Grid>

                    <Grid item xs={ 12 } sm={ 2 }>
                        <SprykerButton
                            title={ <FormattedMessage id={ 'delete.account.title' } /> }
                            onClick={ this.handleSubmitDeleteAccount }
                            extraClasses={ classes.deleteBtn }
                        />
                    </Grid>
                </Grid>

                { this.state.isDeleteProfileDialogOpen && (
                    <SprykerDialog
                        handleShow={ this.handleDeleteProfileDialogShowing }
                        content={ <FormattedMessage id={ 'confirm.delete.account.message' } /> }
                        isOpen={ this.state.isDeleteProfileDialogOpen }
                        handleAgree={ this.handleDeleteProfileDialogAgree }
                        handleDisagree={ this.handleDeleteProfileDialogDisagree }
                    />
                ) }
            </>
        );
    }
}

export const AccountActions = withStyles(styles)(AccountActionsComponent);
