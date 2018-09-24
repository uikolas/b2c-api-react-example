import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';

import {reduxify} from '../../../lib/redux-helper';

import {ProductState} from '../../../reducers/Pages/Product';
import {IProductCard} from '../../../interfaces/productCard';

// import {SearchState} from '../../../reducers/Pages/Search';

import {sendSearchAction} from '../../../actions/Pages/Search';

import {AppMain} from '../../Common/AppMain';
import {ImageSlider} from '../../Common/ImageSlider';
import {ProductGeneralInfo} from './ProductGeneralInfo';
import {DropdownControlled, defaultItemValue} from '../../UI/DropdownControlled';
import {getFormattedPrice} from '../../../services/priceFormatter';
import {ProductAvailability} from './ProductAvailability';
import {SprykerButton} from '../../UI/SprykerButton';

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

export const buyBtnTitle = "Add to cart";

const imagesFix = [
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
const availability_fixture = true;

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

  public buyBtnHandler = (event: any): void => {
    console.log('buyBtnHandler clicked');
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
    if (!this.props.product) {
      return null;
    }
    const {
      classes,
      isLoading,
      currency,
      product, product: {
        name,
        sku,
        price,
        images,
      }    } = this.props;

    console.info('product: ', product);
    console.info('images: ', images);
    console.info('props: ', this.props);

    return (
      <AppMain isLoading={isLoading}>
        <Grid container justify="center" >
          <Grid item xs={12} sm={6} >
            <ImageSlider images={imagesFix} />
          </Grid>
          <Grid item xs={12} sm={6} >
            <ProductGeneralInfo
              name={name}
              sku={sku}
              price={getFormattedPrice(price, currency)}
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

            <ProductAvailability availability={availability_fixture} />
            <SprykerButton title={buyBtnTitle} extraClasses={classes.buyBtn} onClick={this.buyBtnHandler}/>
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
    const productProps: ProductState = state.pageProduct ? state.pageProduct : null;
    return (
      {
        location: routerProps.location ? routerProps.location : ownProps.location,
        isLoading: productProps && productProps.pending ? productProps.pending : ownProps.pending,
        product: productProps && productProps.data && productProps.data.selectedProduct
          ? productProps.data.selectedProduct
          : ownProps.selectedProduct,
        currency: productProps && productProps.data.currency ? productProps.data.currency : ownProps.currency,
      }
    );
  }
)(ProductPage);
