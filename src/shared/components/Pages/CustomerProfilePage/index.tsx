// tslint:disable:max-file-line-count

import * as React from 'react';
import { FormEvent, MouseEvent, SyntheticEvent } from 'react';
import { toast } from 'react-toastify';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { ICustomerProfile, TCustomerInputValue } from 'src/shared/interfaces/customer';
import {
  emptyRequiredFieldsErrorText,
  inputSaveErrorText,
  passwordsNotEqualErrorText,
} from 'src/shared/constants/messages/errors';
import { saveCustomerUsernameToLocalStorage } from 'src/shared/helpers/localStorage';
import { pathLoginPage } from 'src/shared/routes/contentRoutes';
import { SprykerDialog } from '../../UI/SprykerDialog';
import { UpdateProfile } from './UpdateProfile';
import { ChangePassword } from './ChangePassword';
import { AccountActions } from './AccountActions';
import { ICustomerProfilePageProps as Props, ICustomerProfilePageState as State, IProfileFieldInput } from './types';
import { pageStyles } from './styles';
import { connect } from './connect';

export const pageTitle = 'Profile';

const keySalutation = 'salutation';
const keyFirstName = 'firstName';
const keyLastName = 'lastName';
const keyEmail = 'email';
const keyNewPassword = 'newPassword';
const keyOldPassword = 'password';
const keyConfirmPassword = 'confirmPassword';

const deleteProfileContent = 'Are you sure you want to delete your account?';

@connect
export class CustomerProfilePageBase extends React.Component<Props, State> {
  public state: State = {
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
    console.info('%c ---- componentDidMount ----', 'background: #1a5bfe; color: #bada55');
    if (!this.props.isCustomerDataExist) {
      this.initRequestData();
    }
  };

  public componentDidUpdate = (prevProps: Props, prevState: State) => {
    console.info('%c ---- componentDidUpdate ----', 'background: #4cab50; color: #cada55');
    if (!this.props.isRejected && !this.props.isCustomerDataExist) {
      this.initRequestData();
    }

    if (this.props.passwordUpdated === true && this.props.passwordUpdated !== prevProps.passwordUpdated) {
      this.clearPasswords();
    }
  };

  public handleProfileInputChange = (event: {target: IProfileFieldInput}): void => {
    const {name, value}: IProfileFieldInput = event.target;
    const cleanValue = value.trim();
    if (!this.state.inputs.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
      return;
    }

    this.setState((prevState: State) => {
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
  };

  public handleSubmitUpdateProfile = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    if (this.props.isLoading || !this.props.customerReference) {
      return;
    }
    const firstName = this.getCurrentDataField(keyFirstName);
    const lastName = this.getCurrentDataField(keyLastName);
    const salutation = this.getCurrentDataField(keySalutation);
    const email = this.getCurrentDataField(keyEmail);

    if (!firstName || !lastName || !email || !salutation) {
      toast.warn(emptyRequiredFieldsErrorText);
      return null;
    }
    const profileData = {salutation, firstName, lastName, email};
    this.props.updateCustomerData(this.props.customerReference, profileData);
    // TODO: remove after fixing an email bug
    if (email !== this.props.customerData.email) {
      toast.warn('We can\'t show your updated email. To see it logout and login again!');
      this.props.saveLoginDataToStore({email});
      // TODO: it's a temporary solution. We do not have email in the /customers/{customerReference}
      saveCustomerUsernameToLocalStorage({email});
    }
  };

  public handleSubmitPassword = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    const password = this.getCurrentDataField(keyOldPassword);
    const newPassword = this.getCurrentDataField(keyNewPassword);
    const confirmPassword = this.getCurrentDataField(keyConfirmPassword);
    if (!password || !newPassword || !confirmPassword || !this.props.customerReference) {
      toast.warn(emptyRequiredFieldsErrorText);
      return null;
    }

    if (newPassword !== confirmPassword) {
      toast.warn(passwordsNotEqualErrorText);
      return null;
    }
    const passwordData = {password, newPassword, confirmPassword};
    this.props.updateCustomerPassword(this.props.customerReference, passwordData);
  };

  public handleSubmitDeleteAccount = (event: FormEvent<HTMLFormElement>): void => {
    event.preventDefault();
    this.setState(prev => ({isDeleteProfileDialogOpen: true}));
  };

  public handleDeleteProfileDialogShowing = (event: SyntheticEvent<{}>): void => {
    this.setState(prev => ({isDeleteProfileDialogOpen: !prev.isDeleteProfileDialogOpen}));
  };

  public handleDeleteProfileDialogAgree = (event: MouseEvent<HTMLElement>): void => {
    if (this.props.isLoading || !this.props.customerReference) {
      return;
    }
    this.props.deleteCustomerEntity(this.props.customerReference);
    this.handleDeleteProfileDialogShowing(event);
    this.props.routerPush(`${pathLoginPage}`);
  };

  public handleDeleteProfileDialogDisagree = (event: MouseEvent<HTMLElement>): void => {
    this.handleDeleteProfileDialogShowing(event);
  };

  private getCurrentDataField = (fieldName: (keyof ICustomerProfile)): string => {
    const emptyValue = '';
    if (!this.props.isCustomerDataExist || !fieldName) {
      return emptyValue;
    }

    const key: (keyof ICustomerProfile) = fieldName;
    const stateValue = this.state.inputs[key];
    const propsValue = this.props.customerData[key];

    if (stateValue) {
      return stateValue;
    } else {
      if (propsValue) {
        return propsValue as string;
      } else {
        return emptyValue;
      }
    }
  };

  private clearPasswords = (): void => {
    if (this.props.isLoading) {
      return;
    }

    this.setState((prevState: State) => ({
      ...prevState,
      inputs: {
        ...prevState.inputs,
        newPassword: '',
        password: '',
        confirmPassword: '',
      },
    }));
  };

  private initRequestData = () => {
    if (this.props.isLoading) {
      return;
    }
    if (this.props.isAppDataSet && this.props.customerReference) {
      console.info('%c *** initRequestData ***', 'background: #3d5afe; color: #ffea00');
      this.props.getCustomerData(this.props.customerReference);
      return true;
    }
    return false;
  };

  public render(): JSX.Element {
    console.info('CustomerProfilePage props: ', this.props);
    console.info('CustomerProfilePage state: ', this.state);
    const {classes} = this.props;

    return (
      <div>
        <div className={ classes.root }>
          <Grid container justify="center">
            <Grid item xs={ 12 }>
              <Typography align="center" variant="headline" gutterBottom={ true }>{ pageTitle }</Typography>
            </Grid>
          </Grid>
          <Grid container justify="center">
            <UpdateProfile
              submitHandler={ this.handleSubmitUpdateProfile }
              inputChangeHandler={ this.handleProfileInputChange }
              firstName={ this.getCurrentDataField(keyFirstName) }
              lastName={ this.getCurrentDataField(keyLastName) }
              salutation={ this.getCurrentDataField(keySalutation) }
              email={ this.getCurrentDataField(keyEmail) }
            />

            <ChangePassword
              submitHandler={ this.handleSubmitPassword }
              inputChangeHandler={ this.handleProfileInputChange }
              password={ this.getCurrentDataField(keyOldPassword) }
              newPassword={ this.getCurrentDataField(keyNewPassword) }
              confirmPassword={ this.getCurrentDataField(keyConfirmPassword) }
            />

            <AccountActions submitDeleteHandler={ this.handleSubmitDeleteAccount }/>

            { this.state.isDeleteProfileDialogOpen
              ? (
                <SprykerDialog
                  handleShow={ this.handleDeleteProfileDialogShowing }
                  content={ deleteProfileContent }
                  isOpen={ this.state.isDeleteProfileDialogOpen }
                  handleAgree={ this.handleDeleteProfileDialogAgree }
                  handleDisagree={ this.handleDeleteProfileDialogDisagree }
                />
              ) : null
            }
          </Grid>
        </div>
      </div>
    );
  }
}

export const CustomerProfilePage = withStyles(pageStyles)(CustomerProfilePageBase);

export default CustomerProfilePage;
