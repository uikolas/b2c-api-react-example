import * as React from 'react';

import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import { connect } from './connect';
import { styles } from './styles';

import { AppBackdrop } from 'src/shared/components/Common/AppBackdrop';
import { AppMain } from 'src/shared/components/Common/AppMain';
import { CheckoutForms } from 'src/shared/components/Pages/CheckoutPage/CheckoutForms';
import { CartData } from 'src/shared/components/Pages/CheckoutPage/CartData';
import { ICheckoutPageProps, ICheckoutPageState } from './types';


@connect
export class CheckoutPageBase extends React.Component<ICheckoutPageProps, ICheckoutPageState> {

  public state: ICheckoutPageState = {};

  public componentDidMount() {
    console.info('%c ++ CheckoutPage componentDidMount ++', 'background: #3d5afe; color: #ffea00');
  }

  public componentDidUpdate = (prevProps: ICheckoutPageProps, prevState: ICheckoutPageState) => {
    console.info('%c -- CheckoutPage componentDidUpdate --', 'background: #4caf50; color: #cada55');
  };

  public render(): JSX.Element {
    const {
      classes,
      isLoading,
    } = this.props;
    console.info('CheckoutPage state: ', this.state);
    console.info('CheckoutPage props: ', this.props);

    console.info('products: ', this.props.products);

    return (
      <AppMain>
        { isLoading ? <AppBackdrop isOpen={ true }/> : null }

        <Grid container className={ classes.container }>
          <Grid item xs={ 12 } md={ 7 }>
            <CheckoutForms/>
          </Grid>
          <Grid item xs={ 12 } md={ 5 }>
            <CartData/>
          </Grid>
        </Grid>

      </AppMain>
    );
  }
}

export const CheckoutPage = withStyles(styles)(CheckoutPageBase);

export default CheckoutPage;
