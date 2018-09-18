import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {reduxify} from '../../../lib/redux-helper';
import {SearchState} from '../../../reducers/Pages/Search';
import {sendSearchAction} from '../../../actions/Pages/Search';

import {AppMain} from '../../Common/AppMain';
import {ImageSlider} from '../../Common/ImageSlider';
import {ProductGeneralInfo} from './ProductGeneralInfo';
import {DropdownControlled, defaultItemValue} from '../../UI/DropdownControlled';
import {getFormattedPrice} from '../../../services/priceFormatter';
import {ISearchPageData} from "../../../interfaces/searchPageData";

import {styles} from './styles';


interface ProductPageProps extends WithStyles<typeof styles>, RouteProps {
  product: any;
  isLoading: boolean;
  currency: string;
}

interface ISuperAttr {
  [key: string]: string | number;
}

interface ProductPageState {
  superAttrSelected: ISuperAttr;
}

const images = [
  {
    id: 1,
    src: "//images.icecat.biz/img/norm/high/17681791-4446.jpg",
  },
  {
    id: 2,
    src: "//images.icecat.biz/img/norm/high/17681791-4446.jpg",
  },
  {
    id: 3,
    src: "//images.icecat.biz/img/norm/high/17681791-4446.jpg",
  },
];
const fixture_menuItems = [
  {
    value: 1,
    name: 'One'
  },
  {
    value: 2,
    name: 'Two'
  },
];
const fixture_menuItems_2 = [
  {
    value: 'Hi',
    name: 'Hi'
  },
  {
    value: 'Hello',
    name: 'Hello'
  },
];
const test_nameAttr = 'test_nameAttr';
const test_nameAttr_2 = 'test_nameAttr_2';

export class ProductPageBase extends React.Component<ProductPageProps, ProductPageState> {

  public state: ProductPageState = {
    superAttrSelected: {},
  };

  public dropdownHandleChange = (event: any, child: React.ReactNode): void => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState( (prevState: ProductPageState) => {
      if (this.state.superAttrSelected[key] === value) {
        return;
      }
      return (
        {
          superAttrSelected: {
            ...prevState.superAttrSelected,
            [key]: value,
          },
        }
      );
    });
  }

  private getSuperAttrValue = (key: string) => {

    if (!key) {
      return defaultItemValue;
    }
    return (
      this.state.superAttrSelected[key]
        ? this.state.superAttrSelected[key]
        : defaultItemValue
    );
  }

  public render(): JSX.Element {
    const {classes, isLoading, currency} = this.props;

    return (
      <AppMain isLoading={isLoading}>
        <Grid container justify="center" >
          <Grid item xs={12} sm={6} >
            <ImageSlider images={images} />
          </Grid>
          <Grid item xs={12} sm={6} >
            <ProductGeneralInfo
              name="Product Name"
              sku="Product SKU"
              price={getFormattedPrice(0, currency)}
            />
            <DropdownControlled
              nameAttr={test_nameAttr}
              nameToShow="nameToShow"
              value={this.getSuperAttrValue(test_nameAttr)}
              handleChange={this.dropdownHandleChange}
              menuItems={fixture_menuItems}
            />

            <DropdownControlled
              nameAttr={test_nameAttr_2}
              nameToShow="nameToShow__2"
              value={this.getSuperAttrValue(test_nameAttr_2)}
              handleChange={this.dropdownHandleChange}
              menuItems={fixture_menuItems_2}
            />
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
        currency: pageSearchProps && pageSearchProps.data.currency ? pageSearchProps.data.currency : ownProps.currency,
        product: pageSearchProps && pageSearchProps.data && pageSearchProps.data.selectedProduct
          ? pageSearchProps.data.selectedProduct
          : ownProps.selectedProduct,
      }
    );
  }
)(ProductPage);
