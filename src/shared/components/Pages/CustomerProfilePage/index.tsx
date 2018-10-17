import * as React from "react";
import {ChangeEvent, FormEvent} from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';

import {reduxify} from '../../../lib/redux-helper';
import {pageStyles} from './styles';
import {isAppInitiated} from "../../../reducers/Common/Init";
import {isUserAuthenticated} from "../../../reducers/Pages/Login";
import {getRouterLocation} from "../../../selectors/Common/router";
import {UpdateProfile} from "./UpdateProfile/index";
import {
  ICustomerChangePassword,
  ICustomerDataProfile,
  TCustomerEmail, TCustomerFirstName, TCustomerInputValue, TCustomerLastName, TCustomerPassword,
  TCustomerSalutation
} from "../../../interfaces/customer/index";
import {
  emptyRequiredFieldsErrorText, inputSaveErrorText,
  passwordsNotEqualErrorText
} from "../../../constants/messages/errors";
import {ChangePassword} from "./ChangePassword/index";
import {AccountActions} from "./AccountActions/index";

export const pageTitle = "Profile";

interface ICustomerProfilePageProps extends WithStyles<typeof pageStyles>, RouteProps {
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
}

interface ICustomerProfilePageState {
  profileData: ICustomerDataProfile;
  passwordData: ICustomerChangePassword;
}

interface IProfileFieldInput {
  name: (keyof ICustomerDataProfile);
  value: TCustomerInputValue;
}

interface IPasswordFieldInput {
  name: (keyof ICustomerChangePassword);
  value: TCustomerInputValue;
}

export class CustomerProfilePageBase extends React.Component<ICustomerProfilePageProps, ICustomerProfilePageState> {

  public state: ICustomerProfilePageState = {
    profileData: {
      salutation: 'Dr',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@email.com',
    },
    passwordData: {
      newPassword: '',
      oldPassword: '111111',
      confirmPassword: '',
    },
  };

  public componentDidMount = () => {
    console.log("%c ---- componentDidMount ----", 'background: #4caf50; color: #bada55');
  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    console.log("%c ---- componentDidUpdate ----", 'background: #4cab50; color: #cada55');
  }

  public handleProfileInputChange =  (event: {target: IProfileFieldInput}): void => {
    const { name, value }: IProfileFieldInput = event.target;
    const cleanValue = value.trim();
    if (!this.state.profileData.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
      return;
    }

    this.setState( (prevState: ICustomerProfilePageState) => {

      const key: (keyof ICustomerDataProfile) = name;
      const prevValue: TCustomerInputValue = prevState.profileData[key];
      if (prevValue === cleanValue) {
        return;
      }

      return ({
        ...prevState,
        profileData: {
          ...prevState.profileData,
          [name]: cleanValue,
        },
      });
    });

  }

  public handlePasswordInputChange =  (event: {target: IPasswordFieldInput}): void => {
    const { name, value }: IPasswordFieldInput = event.target;
    const cleanValue = value.trim();
    if (!this.state.passwordData.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
      return;
    }

    this.setState( (prevState: ICustomerProfilePageState) => {

      const key: (keyof ICustomerChangePassword) = name;
      const prevValue: TCustomerInputValue = prevState.passwordData[key];
      if (prevValue === cleanValue) {
        return;
      }

      return ({
        ...prevState,
        passwordData: {
          ...prevState.passwordData,
          [name]: cleanValue,
        },
      });
    });

  }

  public handleChangeSalutation = (event: React.ChangeEvent<HTMLInputElement>): void => {
    console.log("%c *** handleChangeSalutation *** event", 'background: #3d5afe; color: #ffea00');
    const {value}: {value: string} = event.target;
    const cleanValue = value.trim();
    if(!cleanValue) {
      return;
    }

    this.setState( (prevState: ICustomerProfilePageState) => {
      if (prevState.profileData.salutation === value) {
        return;
      }
      return ({
        ...prevState,
        profileData: {
          ...prevState.profileData,
          salutation: value,
        },
      });
    });
  }

  public handleSubmitUpdateProfile = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("%c *** handleSubmitUpdateProfile ***", 'background: #3d5afe; color: #ffea00');

    const {profileData, profileData: {firstName, lastName, salutation, email}} = this.state;
    if( !profileData
      || !firstName
      || !lastName
      || !email
      || !salutation
    ) {
      toast.warn(emptyRequiredFieldsErrorText);
      return null;
    }
    console.log("%c *** handleSubmitUpdateProfile DATA***", 'background: #3d5afe; color: #ffea00', profileData);

  }

  public handleSubmitPassword = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("%c *** handleSubmitPassword ***", 'background: #3d5afe; color: #ffea00');

    const {passwordData, passwordData: {oldPassword, newPassword, confirmPassword}} = this.state;
    if( !passwordData
      || !oldPassword
      || !newPassword
      || !confirmPassword
    ) {
      toast.warn(emptyRequiredFieldsErrorText);
      return null;
    }

    if (newPassword !== confirmPassword) {
      toast.warn(passwordsNotEqualErrorText);
      return null;
    }

    console.log("%c *** handleSubmitPassword DATA***", 'background: #3d5afe; color: #ffea00', passwordData);

  }

  public handleSubmitDeleteAccount = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("%c *** handleDeleteAccount ***", 'background: #1d5cce; color: #ffea00');

  }

  private initRequestData = () => {
    console.log("%c *** initRequestData ***", 'background: #2cab50; color: #cada55');
  }

  public render(): JSX.Element {
    console.info('CustomerProfilePage props: ', this.props);
    console.info('CustomerProfilePage state: ', this.state);
    const {classes, isFulfilled} = this.props;
    const {profileData, passwordData} = this.state;

    return (
      <div>
        { (isFulfilled === false)
          ? null
          : (
            <div className={classes.root} >
              <Grid container justify="center" >
                <Grid item xs={12}>
                  <Typography align="center" variant="headline" gutterBottom={true}>
                    {pageTitle}
                  </Typography>
                </Grid>
              </Grid>
              <Grid container justify="center" >

                <UpdateProfile
                  submitHandler={this.handleSubmitUpdateProfile}
                  inputChangeHandler={this.handleProfileInputChange}
                  changeSalutationHandler={this.handleChangeSalutation}
                  firstName={profileData.firstName}
                  lastName={profileData.lastName}
                  salutation={profileData.salutation}
                  email={profileData.email}
                />

                <ChangePassword
                  submitHandler={this.handleSubmitPassword}
                  inputChangeHandler={this.handlePasswordInputChange}
                  oldPassword={passwordData.oldPassword}
                  newPassword={passwordData.newPassword}
                  confirmPassword={passwordData.confirmPassword}
                />

                <AccountActions
                  submitDeleteHandler={this.handleSubmitDeleteAccount}
                />

              </Grid>
            </div>
          )
        }
      </div>
    );
  }
}

export const CustomerProfilePage = withStyles(pageStyles)(CustomerProfilePageBase);

export const ConnectedCustomerProfilePage = reduxify(
  (state: any, ownProps: any) => {
    const location = getRouterLocation(state, ownProps);
    /*const isLoading: boolean = isOrderHistoryLoading(state, ownProps);
    const isRejected: boolean = isOrderHistoryStateRejected(state, ownProps);
    const isFulfilled = isOrderHistoryFulfilled(state, ownProps);
    */
    const isLoading: boolean = false;
    const isRejected: boolean = false;
    const isFulfilled = true;
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);

    return ({
      location,
      isLoading,
      isRejected,
      isFulfilled,
      isAppDataSet,
      isUserLoggedIn,
    });
  },
  /*(dispatch: Function) => ({
    getOrdersCollection: () => dispatch(getOrdersCollectionAction()),
  })*/
)(CustomerProfilePage);
