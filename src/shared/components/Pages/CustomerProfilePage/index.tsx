import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';

import {reduxify} from '../../../lib/redux-helper';
import {styles} from './styles';
import {isAppInitiated} from "../../../reducers/Common/Init";
import {isUserAuthenticated} from "../../../reducers/Pages/Login";
import {getRouterLocation} from "../../../selectors/Common/router";
import {UpdateProfile} from "./UpdateProfile/index";
import {
  ICustomerDataProfile,
  TCustomerEmail, TCustomerFirstName, TCustomerInputValue, TCustomerLastName, TCustomerPassword,
  TCustomerSalutation
} from "../../../interfaces/customer/index";
import {emptyRequiredFieldsErrorText, inputSaveErrorText} from "../../../constants/messages/errors";

export const pageTitle = "Profile";

interface ICustomerProfilePageProps extends WithStyles<typeof styles>, RouteProps {
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
}

interface ICustomerProfilePageState {
  profile: ICustomerDataProfile;
  newPassword: TCustomerPassword | null;
  oldPassword: TCustomerPassword | null;
  confirmPassword: TCustomerPassword | null;
}

export class CustomerProfilePageBase extends React.Component<ICustomerProfilePageProps, ICustomerProfilePageState> {

  public state: ICustomerProfilePageState = {
    profile: {
      salutation: 'Dr',
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email@email.com',
    },
    newPassword: '',
    oldPassword: '111111',
    confirmPassword: '',
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

    const profile = this.state.profile;
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

              </Grid>
            </div>
          )
        }
      </div>
    );
  }
}

export const CustomerProfilePage = withStyles(styles)(CustomerProfilePageBase);

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
