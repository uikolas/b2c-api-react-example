import * as React from "react";
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
import {emptyRequiredFieldsErrorText, inputSaveErrorText} from "../../../constants/messages/errors";
import {ChangePassword} from "./ChangePassword/index";

export const pageTitle = "Profile";

interface ICustomerProfilePageProps extends WithStyles<typeof pageStyles>, RouteProps {
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
}

interface ICustomerProfilePageState {
  profile: ICustomerDataProfile;
  password: ICustomerChangePassword;
}

export class CustomerProfilePageBase extends React.Component<ICustomerProfilePageProps, ICustomerProfilePageState> {

  public state: ICustomerProfilePageState = {
    profile: {
      salutation: 'Dr',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@email.com',
    },
    password: {
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

  public handleProfileInputChange =  (event: any) => {
    const { name, value }: {name: (keyof ICustomerDataProfile), value: TCustomerInputValue} = event.target;
    const cleanValue = value.trim();
    if (!this.state.profile.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
      return;
    }

    this.setState( (prevState: ICustomerProfilePageState) => {

      const key: (keyof ICustomerDataProfile) = name;
      const prevValue: TCustomerInputValue = prevState.profile[key];
      if (prevValue === cleanValue) {
        return;
      }

      return ({
        ...prevState,
        profile: {
          ...prevState.profile,
          [name]: cleanValue,
        },
      });
    });

  }

  public handlePasswordInputChange =  (event: any) => {
    const { name, value }: {name: (keyof ICustomerChangePassword), value: TCustomerInputValue} = event.target;
    const cleanValue = value.trim();
    if (!this.state.password.hasOwnProperty(name)) {
      throw new Error(inputSaveErrorText);
      return;
    }

    this.setState( (prevState: ICustomerProfilePageState) => {

      const key: (keyof ICustomerChangePassword) = name;
      const prevValue: TCustomerInputValue = prevState.password[key];
      if (prevValue === cleanValue) {
        return;
      }

      return ({
        ...prevState,
        password: {
          ...prevState.password,
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
      if (prevState.profile.salutation === value) {
        return;
      }
      return ({
        ...prevState,
        profile: {
          ...prevState.profile,
          salutation: value,
        },
      });
    });
  }

  public handleSubmitUpdateProfile = (event: any): void => {
    event.preventDefault();
    console.log("%c *** handleSubmitUpdateProfile ***", 'background: #3d5afe; color: #ffea00');

    const {profile} = this.state;
    if( !profile
      || !profile.firstName
      || !profile.lastName
      || !profile.email
      || !profile.salutation
    ) {
      toast.warn(emptyRequiredFieldsErrorText);
      return null;
    }
    console.log("%c *** handleSubmitUpdateProfile DATA***", 'background: #3d5afe; color: #ffea00', profile);

  }

  public handleSubmitPassword = (event: any): void => {
    event.preventDefault();
    console.log("%c *** handleSubmitPassword ***", 'background: #3d5afe; color: #ffea00');

    const {password} = this.state;
    if( !password
      || !password.oldPassword
      || !password.newPassword
      || !password.confirmPassword
    ) {
      toast.warn(emptyRequiredFieldsErrorText);
      return null;
    }
    console.log("%c *** handleSubmitPassword DATA***", 'background: #3d5afe; color: #ffea00', password);

  }

  private initRequestData = () => {
    console.log("%c *** initRequestData ***", 'background: #2cab50; color: #cada55');
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
                  changeSalutationHandler={this.handleChangeSalutation}
                  firstName={this.state.profile.firstName}
                  lastName={this.state.profile.lastName}
                  salutation={this.state.profile.salutation}
                  email={this.state.profile.email}
                />

                <ChangePassword
                  submitHandler={this.handleSubmitPassword}
                  inputChangeHandler={this.handlePasswordInputChange}
                  oldPassword={this.state.password.oldPassword}
                  newPassword={this.state.password.newPassword}
                  confirmPassword={this.state.password.confirmPassword}
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
