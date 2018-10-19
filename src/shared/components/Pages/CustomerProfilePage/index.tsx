import * as React from "react";
import {FormEvent, SyntheticEvent, MouseEvent} from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';

import {reduxify} from '../../../lib/redux-helper';
import {pageStyles} from './styles';
import {isAppInitiated} from "../../../reducers/Common/Init";
import {getCustomerReference, getCustomerUsername, isUserAuthenticated} from "../../../reducers/Pages/Login";
import {getRouterHistoryPush, getRouterLocation} from "../../../selectors/Common/router";
import {UpdateProfile} from "./UpdateProfile/index";
import {
  ICustomerDataParsed,
  ICustomerProfile,
  ICustomerProfileIdentity,
  ICustomerProfilePassword,
  ILoginDataToLocalStorage,
  TCustomerInputValue,
  TCustomerReference,
} from "../../../interfaces/customer/index";
import {
  emptyRequiredFieldsErrorText,
  inputSaveErrorText,
  passwordsNotEqualErrorText
} from "../../../constants/messages/errors";
import {ChangePassword} from "./ChangePassword/index";
import {AccountActions} from "./AccountActions/index";
import {
  deleteCustomerAction,
  getCustomerProfileAction,
  saveLoginDataToStoreAction,
  updateCustomerPasswordAction,
  updateCustomerProfileAction
} from "../../../actions/Pages/CustomerProfile";
import {
  getCustomerProfile,
  isCustomerPasswordUpdated,
  isCustomerProfilePresent,
  isPageCustomerProfileFulfilled,
  isPageCustomerProfileLoading,
  isPageCustomerProfileRejected
} from "../../../reducers/Pages/CustomerProfile";
import {SprykerDialog} from "../../UI/SprykerDialog/index";
import {pathLoginPage} from "../../../routes/contentRoutes";
import {saveCustomerUsernameToLocalStorage} from "../../../helpers/localStorage/index";

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
  updateCustomerData: Function;
  saveLoginDataToStore: Function;
  updateCustomerPassword: Function;
  customerData: ICustomerDataParsed;
  passwordUpdated: boolean;
  deleteCustomerEntity: Function;
  routerPush: Function;
}

interface ICustomerProfilePageState {
  inputs: ICustomerProfile;
  isDeleteProfileDialogOpen: boolean;
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
const keyOldPassword = 'password';
const keyConfirmPassword = 'confirmPassword';

const deleteProfileContent = 'Are you sure you want to delete your account?';

export class CustomerProfilePageBase extends React.Component<ICustomerProfilePageProps, ICustomerProfilePageState> {

  public state: ICustomerProfilePageState = {
    inputs: {
      salutation: '',
      firstName: '',
      lastName: '',
      email: '',
      newPassword: '',
      password: '',
      confirmPassword: '',
    },
    isDeleteProfileDialogOpen: false,
  };

  public componentDidMount = () => {
    console.info("%c ---- componentDidMount ----", 'background: #1a5bfe; color: #bada55');
    if (!this.props.isCustomerDataExist) {
      this.initRequestData();
    }

  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    console.info("%c ---- componentDidUpdate ----", 'background: #4cab50; color: #cada55');
    if (!this.props.isRejected && !this.props.isCustomerDataExist) {
      this.initRequestData();
    }

    if (this.props.passwordUpdated === true && this.props.passwordUpdated !== prevProps.passwordUpdated) {
      this.clearPasswords();
    }
  }

  public handleProfileInputChange =  (event: {target: IProfileFieldInput}): void => {
    const { name, value }: IProfileFieldInput = event.target;
    const cleanValue = value.trim();
    if (!this.state.inputs.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
      return;
    }

    this.setState( (prevState: ICustomerProfilePageState) => {
      const key: (keyof ICustomerProfile) = name;
      const prevValue: TCustomerInputValue = prevState.inputs[key];
      if (prevValue === cleanValue) {
        return;
      }

      return ({
        ...prevState,
        inputs: {
          ...prevState.inputs,
          [name]: cleanValue,
        },
      });
    });
  }

  public handleSubmitUpdateProfile = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (this.props.isLoading || !this.props.customerReference) {
      return;
    }
    const firstName = this.getCurrentDataField(keyFirstName);
    const lastName = this.getCurrentDataField(keyLastName);
    const salutation = this.getCurrentDataField(keySalutation);
    const email = this.getCurrentDataField(keyEmail);

    if(!firstName || !lastName || !email || !salutation) {
      toast.warn(emptyRequiredFieldsErrorText);
      return null;
    }
    const profileData = {firstName, lastName, salutation, email};
    this.props.updateCustomerData(this.props.customerReference, profileData);
    // TODO: remove after fixing an email bug
    if (email !== this.props.customerData.email) {
      toast.warn("We can\'t show your updated email. To see it logout and login again!" );
      this.props.saveLoginDataToStore({email});
      // TODO: it's a temporary solution. We do not have email in the /customers/{customerReference}
      saveCustomerUsernameToLocalStorage({email});
    }
  }

  public handleSubmitPassword = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const password = this.getCurrentDataField(keyOldPassword);
    const newPassword = this.getCurrentDataField(keyNewPassword);
    const confirmPassword = this.getCurrentDataField(keyConfirmPassword);
    if( !password || !newPassword || !confirmPassword || !this.props.customerReference) {
      toast.warn(emptyRequiredFieldsErrorText);
      return null;
    }

    if (newPassword !== confirmPassword) {
      toast.warn(passwordsNotEqualErrorText);
      return null;
    }
    const passwordData = {password, newPassword, confirmPassword};
    this.props.updateCustomerPassword(this.props.customerReference, passwordData);
  }

  public handleSubmitDeleteAccount = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.setState(prev => ({isDeleteProfileDialogOpen: true}));
  }

  public handleDeleteProfileDialogShowing = (event: SyntheticEvent<{}>): void => {
    this.setState(prev => ({isDeleteProfileDialogOpen: !prev.isDeleteProfileDialogOpen}));
  }

  public handleDeleteProfileDialogAgree = (event: MouseEvent<HTMLElement>): void => {
    if (this.props.isLoading || !this.props.customerReference) {
      return;
    }
    this.props.deleteCustomerEntity(this.props.customerReference);
    this.handleDeleteProfileDialogShowing(event);
    this.props.routerPush(`${pathLoginPage}`);
  }

  public handleDeleteProfileDialogDisagree = (event: MouseEvent<HTMLElement>): void => {
    this.handleDeleteProfileDialogShowing(event);
  }

  private getCurrentDataField = (fieldName: (keyof ICustomerProfile)) => {
    const emptyValue = '';
    if (!this.props.isCustomerDataExist || !fieldName) {
      return emptyValue;
    }

    const key: (keyof ICustomerProfile) = fieldName;
    const stateValue = this.state.inputs[key];
    const propsValue: any = this.props.customerData[key];

    if (stateValue) {
      return stateValue;
    } else if (propsValue) {
      return propsValue;
    } else {
      return emptyValue;
    }
  }

  private clearPasswords =  (): void => {
    if (this.props.isLoading) {
      return;
    }

    this.setState( (prevState: ICustomerProfilePageState) => {
      return ({
        ...prevState,
        inputs: {
          ...prevState.inputs,
          newPassword: '',
          password: '',
          confirmPassword: '',
        },
      });
    });
  }

  private initRequestData = () => {
    if (this.props.isLoading) {
      return;
    }
    if (this.props.isAppDataSet && this.props.customerReference) {
      console.info("%c *** initRequestData ***", 'background: #3d5afe; color: #ffea00');
      this.props.getCustomerData(this.props.customerReference);
      return true;
    }
    return false;
  }


  public render(): JSX.Element {
    console.info('CustomerProfilePage props: ', this.props);
    console.info('CustomerProfilePage state: ', this.state);
    const {classes} = this.props;

    return (
      <div>
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
              firstName={this.getCurrentDataField(keyFirstName)}
              lastName={this.getCurrentDataField(keyLastName)}
              salutation={this.getCurrentDataField(keySalutation)}
              email={this.getCurrentDataField(keyEmail)}
            />

            <ChangePassword
              submitHandler={this.handleSubmitPassword}
              inputChangeHandler={this.handleProfileInputChange}
              password={this.getCurrentDataField(keyOldPassword)}
              newPassword={this.getCurrentDataField(keyNewPassword)}
              confirmPassword={this.getCurrentDataField(keyConfirmPassword)}
            />

            <AccountActions
              submitDeleteHandler={this.handleSubmitDeleteAccount}
            />

            { this.state.isDeleteProfileDialogOpen
              ? (
                <SprykerDialog
                  handleShow={this.handleDeleteProfileDialogShowing}
                  content={deleteProfileContent}
                  isOpen={this.state.isDeleteProfileDialogOpen}
                  handleAgree={this.handleDeleteProfileDialogAgree}
                  handleDisagree={this.handleDeleteProfileDialogDisagree}
                />
              )
              : null
            }

          </Grid>
        </div>
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
    const customerEmail = getCustomerUsername(state, ownProps);
    const passwordUpdated = isCustomerPasswordUpdated(state, ownProps);
    const routerPush = getRouterHistoryPush(state, ownProps);

    if (customerData) {
      customerData.email = customerEmail;
    }

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
      passwordUpdated,
      routerPush,
    });
  },
  (dispatch: Function) => ({
    getCustomerData: (customerReference: TCustomerReference) => dispatch(getCustomerProfileAction(customerReference)),
    updateCustomerData: (customerReference: TCustomerReference, payload: ICustomerProfileIdentity) => dispatch(
      updateCustomerProfileAction(customerReference, payload)
    ),
    saveLoginDataToStore: (payload: ILoginDataToLocalStorage) => dispatch(saveLoginDataToStoreAction(payload)),
    updateCustomerPassword: (customerReference: TCustomerReference, payload: ICustomerProfilePassword) => dispatch(
      updateCustomerPasswordAction(customerReference, payload)
    ),
    deleteCustomerEntity: (customerReference: TCustomerReference) => dispatch(deleteCustomerAction(customerReference)),
  })
)(CustomerProfilePage);
