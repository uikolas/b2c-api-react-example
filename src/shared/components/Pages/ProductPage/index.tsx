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
import {DropdownControlled} from '../../UI/DropdownControlled';
import {ProductAvailability} from './ProductAvailability';
import {SprykerButton} from '../../UI/SprykerButton';
import {ProductAttributes} from './ProductAttributes';
import {
  concreteProductType,
  absentProductType,
  abstractProductType,
  defaultItemValueDropdown,
  IProductAttributeMap,
  IProductAttributes,
  IProductCardImages,
  IProductPropFullData,
  ISuperAttributes,
  TProductSKU,
  TProductQuantity,
  TProductName,
  TProductPrice,
} from '../../../interfaces/product';
import {IImageSlide} from '../../../components/Common/ImageSlider';

import {styles} from './styles';
import {
  getFormattedPrice,
  ISuperAttribute,
  getAvailabilityDisplay,
  createQuantityVariants,
  displayProductNameWithSuperAttr,
  createPathToIdProductConcrete,
  findIdProductConcreteByPath,
  getInitialSuperAttrSelected,
} from "../../../services/productHelper";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import {addProductToCart} from "../../../actions/Common/Cart";

export const buyBtnTitle = "Add to cart";
const quantitySelectedInitial = 1;

interface ProductPageProps extends WithStyles<typeof styles>, RouteProps {
  product: any;
  isLoading: boolean;
  currency: string;
  addProductToCart: Function;
}

interface ProductPageState extends IProductPropFullData, ISuperAttributes {
  attributeMap: IProductAttributeMap | null;
  superAttrSelected: IProductAttributes;
  quantitySelected: TProductQuantity;
}

export class ProductPageBase extends React.Component<ProductPageProps, ProductPageState> {

  public state: ProductPageState = {
    attributeMap: null,
    superAttrSelected: {},
    quantitySelected: quantitySelectedInitial,
    superAttributes: null,
    productType: null,
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
    if (this.props.product) {
      this.setInitialData();
    }
  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    if (this.props.product && !prevState.productType) {
      this.setInitialData();
    }
  }

  public handleSuperAttributesChange = (event: any, child: React.ReactNode): void => {
    const key = event.target.name;
    const value = event.target.value;

    let productData: IProductPropFullData | null;

    if (value === defaultItemValueDropdown) {
      // If selected nothing
      productData = this.getProductDataObject(
        this.props.product.abstractProduct
      );
    } else {
      // If selected a concrete product
      const idProductConcrete = this.getIdProductConcrete(key, value);

      if (!idProductConcrete) {
        // Such product does not exist
        productData = this.getProductDataObject(null);
      } else {
        // Such product exists
        productData = this.getProductDataObject(
          this.props.product.concreteProducts[idProductConcrete]
        );
      }
    }

    this.setState( (prevState: ProductPageState) => {
      if (this.state.superAttrSelected[key] === value) {
        return;
      }
      return ({
          ...prevState,
          superAttrSelected: {
            ...prevState.superAttrSelected,
            [key]: value,
          },
          quantitySelected: quantitySelectedInitial,
          ...productData,
      });
    });
  }

  public handleProductQuantityChange = (event: any, child: React.ReactNode): void => {
    const value = event.target.value;
    this.setState( (prevState: ProductPageState) => {
      if (this.state.quantitySelected === value) {
        return;
      }
      return ({
          ...prevState,
          quantitySelected: value,
      });
    });
  }

  public handleBuyBtnClick = (event: any): any => {
    if (this.state.productType === concreteProductType) {
      const productName = displayProductNameWithSuperAttr(this.state.name, this.state.superAttrSelected);
      this.props.addProductToCart(
        this.state.sku,
        productName,
        this.state.quantitySelected,
        this.state.price,
      );
      this.setState( (prevState: ProductPageState) => {
        if (this.state.quantitySelected === quantitySelectedInitial) {
          return;
        }
        return ({
          ...prevState,
          quantitySelected: quantitySelectedInitial,
        });
      });
    }
    return null;
  }

  private getProductDataObject = (data: IProductPropFullData | null): IProductPropFullData => {
    const defaultValues = this.props.product.abstractProduct;
    return {
      sku: data ? data.sku : null,
      name: data ? data.name : defaultValues.name,
      images: data ? data.images : defaultValues.images,
      availability: data ? data.availability : false,
      description: data ? data.description : defaultValues.description,
      price: data ? data.price : null,
      attributes: data ? data.attributes : defaultValues.attributes,
      quantity: data ? data.quantity : defaultValues.quantity,
      productType: data ? data.productType : absentProductType,
    };
  }

  private setInitialData = (): void => {

    const productData = this.getProductDataObject(this.props.product.abstractProduct);

    // Parsing superAttributes to set initial data for this.state.superAttrSelected
    const selectedAttrNames = getInitialSuperAttrSelected(this.props.product.superAttributes);

    this.setState( (prevState: ProductPageState) => {
      return (
        {
          ...prevState,
          superAttributes: this.props.product.superAttributes,
          attributeMap: this.props.product.attributeMap,
          superAttrSelected: selectedAttrNames,
          ...productData,
        }
      );
    });
  }

  private getIdProductConcrete = (key: string, value: string) => {
    const selected = {...this.state.superAttrSelected};
    selected[key] = value;
    const path = createPathToIdProductConcrete(selected);
    if (!path) {
      return false;
    }

    const id = findIdProductConcreteByPath(path, this.state.attributeMap.attribute_variants);
    return id;
  }

  private getSuperAttrValue = (key: string) => {
    if (!key) {
      return defaultItemValueDropdown;
    }
    return (
      this.state.superAttrSelected[key]
        ? this.state.superAttrSelected[key]
        : defaultItemValueDropdown
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

  private isBuyBtnDisabled = () => {
    if (this.state.productType === concreteProductType && this.state.availability) {
      return false;
    }
    // TODO: Check if only one product
    return true;
  }

  public render(): JSX.Element {
    console.info('props: ', this.props);
    if (!this.props.product || !this.state.productType) {
      return null;
    }
    const {
      classes,
      isLoading,
      currency,
      product,

    } = this.props;
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
                    handleChange={this.handleSuperAttributesChange}
                    menuItems={item.data}
                  />
                ))
                : null
              }

              <ProductAvailability availability={getAvailabilityDisplay(this.state.availability)} />

              <Grid container justify="center" className={classes.buyBtnArea}>
                <Grid item xs={12} sm={6} className={classes.buyBtnParent} >
                  <SprykerButton
                    title={buyBtnTitle}
                    extraClasses={classes.buyBtn}
                    onClick={this.handleBuyBtnClick}
                    IconType={AddShoppingCartIcon}
                    disabled={this.isBuyBtnDisabled()}
                  />
                </Grid>
                <Grid item xs={12} sm={6} >
                  {this.isBuyBtnDisabled() && !this.state.quantity
                    ? null
                    : <DropdownControlled
                      nameAttr="quantity"
                      nameToShow="Quantity"
                      value={this.state.quantitySelected}
                      handleChange={this.handleProductQuantityChange}
                      menuItems={createQuantityVariants(this.state.quantity)}
                    />
                  }
                </Grid>
              </Grid>


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
        product: productProps && productProps.data
          ? productProps.data.selectedProduct
          : ownProps.selectedProduct,
        currency: productProps && productProps.data.currency ? productProps.data.currency : ownProps.currency,
      }
    );
  },
  (dispatch: Function) => ({
      addProductToCart: (sku: TProductSKU,
                         name: TProductName ,
                         quantity: TProductQuantity,
                         price: TProductPrice ) => dispatch(addProductToCart(sku, name, quantity, price)),
  }),
)(ProductPage);
