import * as React from "react";
import {Location} from 'history';
import { toast } from 'react-toastify';
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import {reduxify} from '../../../lib/redux-helper';
import {ProductState} from '../../../reducers/Pages/Product';
import {IProductCard} from '../../../interfaces/productCard';
import {sendSearchAction} from '../../../actions/Pages/Search';

import {AppMain} from '../../Common/AppMain';
import {ProductCard} from '../../Common/ProductCard';
import {ISearchPageData} from "../../../interfaces/searchPageData";

import {styles} from './styles';


interface ProductPageProps extends WithStyles<typeof styles> {
  product: any;
  isLoading: boolean;
}

interface ProductPageState {}


export class ProductPageBase extends React.Component<ProductPageProps, ProductPageState> {

  public state: ProductPageState = {

  };

  public render() {
    const {classes, isLoading} = this.props;

    return (
      <React.Fragment>
        <AppMain isLoading={isLoading}>
          <Grid container

          >

          </Grid>
        </AppMain>
      </React.Fragment>
    );
  }
}

export const ProductPage = withStyles(styles)(ProductPageBase);

export const ConnectedProductPage = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const productProps: ProductState = state.pageProduct ? state.pageProduct : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        isLoading: productProps && productProps.pending ? productProps.pending : ownProps.pending,
        product: productProps && productProps.data && productProps.data.selectedProduct
          ? productProps.data.selectedProduct
          : ownProps.selectedProduct,
      }
    );
  }
)(ProductPage);
