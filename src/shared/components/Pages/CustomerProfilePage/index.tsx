import * as React from 'react';
import { connect } from './connect';
import { ICustomerProfilePageProps } from './types';

import { ErrorBoundary } from '@components/Library/ErrorBoundary';
import { UpdateProfile } from './containers/updateProfile';
import { ChangePassword } from './containers/changePassword';
import { AccountActions } from './containers/accountActions';

import withStyles from '@material-ui/core/styles/withStyles';
import { styles } from './styles';

@connect
export class CustomerProfilePageBase extends React.Component<ICustomerProfilePageProps> {
    public componentDidMount = () => {
        if (!this.props.isCustomerDataExist) {
            this.initRequestData();
        }
    };

    public componentDidUpdate = () => {
        if (!this.props.isRejected && !this.props.isCustomerDataExist) {
            this.initRequestData();
        }
    };

    private initRequestData = () => {
        if (!this.props.isLoading && this.props.isAppDataSet && this.props.customerReference) {
            this.props.getCustomerData(this.props.customerReference);
        }
    };

    public render(): JSX.Element {
        if (!this.props.isCustomerDataExist) {
            return (
                <>
                    <div>Loading...</div>
                </>
            );
        }

        return (
            <>
                <ErrorBoundary>
                    <UpdateProfile
                        customerReference={ this.props.customerReference }
                    />

                    <ChangePassword
                        customerReference={ this.props.customerReference }
                    />

                    <AccountActions
                        customerReference={ this.props.customerReference }
                        routerPush={ this.props.routerPush }
                    />
                </ErrorBoundary>
            </>
        );
    }
}

export const CustomerProfilePage = withStyles(styles)(CustomerProfilePageBase);
export default CustomerProfilePage;
