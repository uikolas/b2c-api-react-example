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
import {getCustomerReference, isUserAuthenticated} from "../../../reducers/Pages/Login";
import {getRouterLocation} from "../../../selectors/Common/router";
import {UpdateProfile} from "./UpdateProfile/index";
import {
  ICustomerDataParsed,
  ICustomerProfile,
  TCustomerInputValue,
  TCustomerReference,
} from "../../../interfaces/customer/index";
import {
  emptyRequiredFieldsErrorText, inputSaveErrorText,
  passwordsNotEqualErrorText
} from "../../../constants/messages/errors";
import {ChangePassword} from "./ChangePassword/index";
import {AccountActions} from "./AccountActions/index";
import {getCustomerProfileAction} from "../../../actions/Pages/CustomerProfile";
import {
  getCustomerProfile,
  isCustomerProfilePresent,
  isPageCustomerProfileFulfilled, isPageCustomerProfileLoading,
  isPageCustomerProfileRejected
} from "../../../reducers/Pages/CustomerProfile";

export const pageTitle = "Profile";

interface ICustomerProfilePageProps extends WithStyles<typeof pageStyles>, RouteProps {
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isCustomerDataExist: boolean;
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  customerReference: TCustomerReference;
  getCustomerData: Function;
  customerData: ICustomerDataParsed;
}

interface ICustomerProfilePageState extends ICustomerProfile {

}

interface IProfileFieldInput {
  name: (keyof ICustomerProfile);
  value: TCustomerInputValue;
}

const keySalutation = 'salutation';
const keyFirstName = 'firstName';
const keyLastName = 'lastName';
const keyEmail = 'email';
const keyNewPassword = 'newPassword';
const keyOldPassword = 'oldPassword';
const keyConfirmPassword = 'confirmPassword';

export class CustomerProfilePageBase extends React.Component<ICustomerProfilePageProps, ICustomerProfilePageState> {

  public state: ICustomerProfilePageState = {
    salutation: '',
    firstName: '',
    lastName: '',
    email: '',
    newPassword: '',
    oldPassword: '',
    confirmPassword: '',
  };

  public componentDidMount = () => {
    console.log("%c ---- componentDidMount ----", 'background: #1a5bfe; color: #bada55');
    if (!this.props.isCustomerDataExist) {
      this.initRequestData();
    }

  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    console.log("%c ---- componentDidUpdate ----", 'background: #4cab50; color: #cada55');
    if (!this.props.isRejected && !this.props.isCustomerDataExist) {
      this.initRequestData();
    }
  }

  public handleProfileInputChange =  (event: {target: IProfileFieldInput}): void => {
    const { name, value }: IProfileFieldInput = event.target;
    const cleanValue = value.trim();
    if (!this.state.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
      return;
    }

    this.setState( (prevState: ICustomerProfilePageState) => {

      const key: (keyof ICustomerProfile) = name;
      const prevValue: TCustomerInputValue = prevState[key];
      if (prevValue === cleanValue) {
        return;
      }

      return ({
        ...prevState,
        [name]: cleanValue,
      });
    });

  }

  public handleSubmitUpdateProfile = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("%c *** handleSubmitUpdateProfile ***", 'background: #3d5afe; color: #ffea00');
    const firstName = this.getCustomerCurrentDataField(keyFirstName);
    const lastName = this.getCustomerCurrentDataField(keyLastName);
    const salutation = this.getCustomerCurrentDataField(keySalutation);
    const email = this.getCustomerCurrentDataField(keyEmail);

    if(!firstName || !lastName || !email || !salutation) {
      toast.warn(emptyRequiredFieldsErrorText);
      return null;
    }
    const profileData = {firstName, lastName, salutation, email};
    console.log("%c *** handleSubmitUpdateProfile DATA***", 'background: #3d5afe; color: #ffea00', profileData);

  }

  public handleSubmitPassword = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("%c *** handleSubmitPassword ***", 'background: #3d5afe; color: #ffea00');

    const oldPassword = this.getCustomerCurrentDataField(keyOldPassword);
    const newPassword = this.getCustomerCurrentDataField(keyNewPassword);
    const confirmPassword = this.getCustomerCurrentDataField(keyConfirmPassword);
    if( !oldPassword || !newPassword || !confirmPassword) {
      toast.warn(emptyRequiredFieldsErrorText);
      return null;
    }

    if (newPassword !== confirmPassword) {
      toast.warn(passwordsNotEqualErrorText);
      return null;
    }
    const passwordData = {oldPassword, newPassword, confirmPassword};
    console.log("%c *** handleSubmitPassword DATA***", 'background: #3d5afe; color: #ffea00', passwordData);

  }

  public handleSubmitDeleteAccount = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    console.log("%c *** handleDeleteAccount ***", 'background: #1d5cce; color: #ffea00');

  }

  private getCustomerCurrentDataField = (fieldName: (keyof ICustomerProfilePageState)) => {
    if (!this.props.isCustomerDataExist || !fieldName) {
      return null;
    }

    const key: (keyof ICustomerProfilePageState) = fieldName;
    const stateValue = this.state[key];
    const propsValue: any = this.props.customerData[key];

    if (stateValue) {
      return stateValue;
    } else if (propsValue) {
      return propsValue;
    } else {
      return '';
    }
  }


  private initRequestData = () => {
    if (this.props.isLoading) {
      return;
    }
    if (this.props.isAppDataSet && this.props.customerReference) {
      console.log("%c *** initRequestData ***", 'background: #3d5afe; color: #ffea00');
      this.props.getCustomerData(this.props.customerReference);
      return true;
    }
    return false;
  }


  public render(): JSX.Element {
    console.info('CustomerProfilePage props: ', this.props);
    console.info('CustomerProfilePage state: ', this.state);
    const {classes, isFulfilled} = this.props;

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
                  firstName={this.getCustomerCurrentDataField(keyFirstName)}
                  lastName={this.getCustomerCurrentDataField(keyLastName)}
                  salutation={this.getCustomerCurrentDataField(keySalutation)}
                  email={this.getCustomerCurrentDataField(keyEmail)}
                />

                <ChangePassword
                  submitHandler={this.handleSubmitPassword}
                  inputChangeHandler={this.handleProfileInputChange}
                  oldPassword={this.getCustomerCurrentDataField(keyOldPassword)}
                  newPassword={this.getCustomerCurrentDataField(keyNewPassword)}
                  confirmPassword={this.getCustomerCurrentDataField(keyConfirmPassword)}
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
    const isLoading = isPageCustomerProfileLoading(state, ownProps);
    const isRejected = isPageCustomerProfileRejected(state, ownProps);
    const isFulfilled = isPageCustomerProfileFulfilled(state, ownProps);
    const isCustomerDataExist = isCustomerProfilePresent(state, ownProps);
    const isAppDataSet = isAppInitiated(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const customerReference = getCustomerReference(state, ownProps);
    const customerData = getCustomerProfile(state, ownProps);

    return ({
      location,
      isLoading,
      isRejected,
      isFulfilled,
      isCustomerDataExist,
      isAppDataSet,
      isUserLoggedIn,
      customerReference,
      customerData,
    });
  },
  (dispatch: Function) => ({
    getCustomerData: (customerReference: TCustomerReference) => dispatch(getCustomerProfileAction(customerReference)),
  })
)(CustomerProfilePage);
