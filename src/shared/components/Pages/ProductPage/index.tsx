import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {reduxify} from '../../../lib/redux-helper';
import {SearchState} from '../../../reducers/Pages/Search';
import {sendSearchAction} from '../../../actions/Pages/Search';

import {AppMain} from '../../Common/AppMain';
import {ImageSlider} from '../../Common/ImageSlider';
import {ISearchPageData} from "../../../interfaces/searchPageData";

import {styles} from './styles';


interface ProductPageProps extends WithStyles<typeof styles>, RouteProps {
  product: any;
  isLoading: boolean;
}

interface ProductPageState {}


export class ProductPageBase extends React.Component<ProductPageProps, ProductPageState> {

  public state: ProductPageState = {

  };

  public render() {
    const {classes, isLoading} = this.props;

    const images = [
      "//images.icecat.biz/img/norm/high/17681791-4446.jpg",
      "//images.icecat.biz/img/norm/high/17681791-4446.jpg",
      "//images.icecat.biz/img/norm/high/17681791-4446.jpg",
    ];

    return (
      <AppMain isLoading={isLoading}>
        <Grid container justify="center" >
          <Grid item xs={12} sm={6} >
            <ImageSlider images={images} />
          </Grid>
          <Grid item xs={12} sm={6} >
            Product
          </Grid>
        </Grid>
      </AppMain>
    );
  }
}

export const ProductPage = withStyles(styles)(ProductPageBase);

export const ConnectedProductPage = reduxify(
  (state: any, ownProps: any) => {
    const routerProps: RouteProps = state.routing ? state.routing : {};
    const pageSearchProps: SearchState = state.pageSearch ? state.pageSearch : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        isLoading: pageSearchProps && pageSearchProps.pending ? pageSearchProps.pending : ownProps.pending,
        product: pageSearchProps && pageSearchProps.data && pageSearchProps.data.selectedProduct
          ? pageSearchProps.data.selectedProduct
          : ownProps.selectedProduct,
      }
    );
  }
)(ProductPage);
