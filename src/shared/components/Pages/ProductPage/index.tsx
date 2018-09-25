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
import {getFormattedPrice} from '../../../services/productHelper';
import {ProductAvailability} from './ProductAvailability';
import {SprykerButton} from '../../UI/SprykerButton';
import {ProductAttributes} from './ProductAttributes';
import {
  IProductAttributeMap,
  IProductAttributes,
  IProductCardImages,
  IProductPropFullData,
  ISuperAttributes,
} from '../../../interfaces/product';
import {IImageSlide} from '../../../components/Common/ImageSlider';

import {styles} from './styles';
import {ISuperAttribute} from "../../../services/productHelper/superAttributes";

export const buyBtnTitle = "Add to cart";

interface ProductPageProps extends WithStyles<typeof styles>, RouteProps {
  product: any;
  isLoading: boolean;
  currency: string;
}

type TCurrentProductType = 'abstractProduct' | 'concreteProduct';

interface ProductPageState extends IProductPropFullData, ISuperAttributes {
  attributeMap: IProductAttributeMap | null;
  superAttrSelected: IProductAttributes;
  currentProductType: TCurrentProductType;
}

export class ProductPageBase extends React.Component<ProductPageProps, ProductPageState> {

  public state: ProductPageState = {
    attributeMap: null,
    superAttrSelected: {},
    superAttributes: null,
    currentProductType: null,
    sku: null,
    name: null,
    images: null,
    availability: null,
    description: null,
    price: null,
    attributes: null,
    quantity: null,
  };

  public componentDidMount = () => {
    this.setInitialData();
  }

  public dropdownHandleChange = (event: any, child: React.ReactNode): void => {
    const key = event.target.name;
    const value = event.target.value;
    let productData: IProductPropFullData;

    if (value === defaultItemValue) {
      // If selected nothing
      productData = this.getProductDataObject(
        this.props.product.abstractProduct
      );
    } else {
      // If selected a concrete product
      const idProductConcrete = this.state.attributeMap.attribute_variants[`${key}:${value}`].id_product_concrete;
      productData = this.getProductDataObject(
        this.props.product.concreteProducts[idProductConcrete]
      );
    }

    this.setState( (prevState: ProductPageState) => {
      if (this.state.superAttrSelected[key] === value) {
        return;
      }
      return (
        {
          ...prevState,
          superAttrSelected: {
            ...prevState.superAttrSelected,
            [key]: value,
          },
          currentProductType: 'concreteProduct',
          ...productData,
        }
      );
    });
  }

  private getProductDataObject = (data: IProductPropFullData): IProductPropFullData => {
    return {
      sku: data.sku,
      name: data.name,
      images: data.images,
      availability: data.availability,
      description: data.description,
      price: data.price,
      attributes: data.attributes,
      quantity: data.quantity,
    };
  }

  private setInitialData = (): void => {

    const productData = this.getProductDataObject(this.props.product.abstractProduct);

    this.setState( (prevState: ProductPageState) => {
      return (
        {
          ...prevState,
          currentProductType: 'abstractProduct',
          superAttributes: this.props.product.superAttributes,
          attributeMap: this.props.product.attributeMap,
          ...productData,
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
    console.info('props: ', this.props);
    if (!this.props.product || !this.state.currentProductType) {
      return null;
    }
    const {
      classes,
      isLoading,
      currency,
      product,

    } = this.props;

    console.info('product: ', product);
    console.info('state: ', this.state);

    return (
      <AppMain isLoading={isLoading}>
        <div className={classes.root} >
          <Grid container justify="center" >
            <Grid item xs={12} sm={6} className={classes.sliderParent}>
              <ImageSlider images={this.getImageData(this.state.images)} />
            </Grid>
            <Grid item xs={12} sm={6} >
              <ProductGeneralInfo
                name={this.state.name}
                sku={this.state.sku}
                price={getFormattedPrice(this.state.price, currency)}
              />

              { this.state.superAttributes
                ? this.state.superAttributes.map((item: ISuperAttribute) => (
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

              <ProductAvailability availability={this.state.availability} />
              <SprykerButton title={buyBtnTitle} extraClasses={classes.buyBtn} onClick={this.buyBtnHandler}/>
            </Grid>
          </Grid>
          <Grid container justify="center" >
            <ProductAttributes attributes={this.state.attributes} />
            <Grid item xs={12}>
              <Typography color="inherit" variant="body2" component="p" gutterBottom={true}>
                {this.state.description}
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
