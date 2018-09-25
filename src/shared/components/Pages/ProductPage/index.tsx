import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {reduxify} from '../../../lib/redux-helper';

import {ProductState} from '../../../reducers/Pages/Product';
import {AppMain} from '../../Common/AppMain';
import {ImageSlider} from '../../Common/ImageSlider';
import {ProductGeneralInfo} from './ProductGeneralInfo';
import {DropdownControlled, defaultItemValue} from '../../UI/DropdownControlled';
import {getFormattedPrice} from '../../../services/priceFormatter';
import {ProductAvailability} from './ProductAvailability';
import {SprykerButton} from '../../UI/SprykerButton';
import {ProductAttributes} from './ProductAttributes';
import {IProductCardImages} from '../../../interfaces/product';
import {IImageSlide} from '../../../components/Common/ImageSlider';
import {styles} from './styles';
import {productPropsFixtureSuper as productFixture} from './fixture';
import {parseSuperAttributes} from "../../../services/productHelper";

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

  private getImageData = (images: Array<IProductCardImages>): Array<IImageSlide> => {
    const response = images.map((element: any, index: number) => (
      {
        id: index,
        src: element.externalUrlLarge,
      }
    ));
    return response;
  }

  public render(): JSX.Element {
    // TODO: productFixture - fixture for testing - remove
    if (!this.props.product && !productFixture) {
      return null;
    }
    const {
      classes,
      isLoading,
      currency,
      product,
    } = this.props;

    const {
      name,
      sku,
      price,
      images,
      availability,
      attributes,
      description,
      superAttributes,
    } = product || productFixture ;

    const superData = parseSuperAttributes(superAttributes);

    console.info('product: ', product);
    console.info('props: ', this.props);
    console.info('state: ', this.state);
    console.info('superData: ', superData);

    return (
      <AppMain isLoading={isLoading}>
        <div className={classes.root} >
          <Grid container justify="center" >
            <Grid item xs={12} sm={6} className={classes.sliderParent}>
              <ImageSlider images={this.getImageData(images)} />
            </Grid>
            <Grid item xs={12} sm={6} >
              <ProductGeneralInfo
                name={name}
                sku={sku}
                price={getFormattedPrice(price, currency)}
              />

              { superData
                ? superData.map((item) => (
                  <DropdownControlled
                    key={item.name}
                    nameAttr={item.name}
                    nameToShow={item.nameToShow}
                    value={this.getSuperAttrValue(item.name)}
                    handleChange={this.dropdownHandleChange}
                    menuItems={item.data}
                  />
                ))
                : null
              }

              <ProductAvailability availability={availability} />
              <SprykerButton title={buyBtnTitle} extraClasses={classes.buyBtn} onClick={this.buyBtnHandler}/>
            </Grid>
          </Grid>
          <Grid container justify="center" >
            <ProductAttributes attributes={attributes} />
            <Grid item xs={12}>
              <Typography color="inherit" variant="body2" component="p" gutterBottom={true}>
                {description}
              </Typography>
            </Grid>
          </Grid>
        </div>
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
