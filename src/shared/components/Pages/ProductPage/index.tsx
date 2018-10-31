import * as React from 'react';
import { RouteProps } from 'react-router';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { connect } from './connect';

import { AppMain } from '../../Common/AppMain';
import { ImageSlider } from '../../Common/ImageSlider';
import { ProductGeneralInfo } from './ProductGeneralInfo';
import { DropdownControlled } from '../../UI/DropdownControlled';
import { ProductAvailability } from './ProductAvailability';
import { SprykerButton } from '../../UI/SprykerButton';
import { ProductAttributes } from './ProductAttributes';
import {
  absentProductType,
  concreteProductType,
  defaultItemValueDropdown,
  IProductAttributeMap,
  IProductAttributes,
  IProductCardImages,
  IProductDataParsed,
  IProductPropFullData,
  ISuperAttributes,
  priceTypeNameOriginal,
  TProductQuantity,
} from 'src/shared/interfaces/product';
import { IImageSlide } from 'src/shared/components/Common/ImageSlider';
import { styles } from './styles';
import {
  createPathToIdProductConcrete,
  createQuantityVariants,
  findIdProductConcreteByPath,
  getAvailabilityDisplay,
  getInitialSuperAttrSelected,
  ISuperAttribute,
} from 'src/shared/helpers/product';

import { TAppPriceMode, TAppStore } from 'src/shared/reducers/Common/Init';
import { createCartItemAddToCart } from 'src/shared/helpers/cart';
import { IWishlist, TWishListName } from 'src/shared/interfaces/wishlist';
import { ICartAddItem, TCartId } from 'src/shared/interfaces/cart';
import { AppPrice } from 'src/shared/components/Common/AppPrice';
import { TRouterMatchParam } from 'src/shared/selectors/Common/router';
import { ICartCreatePayload } from 'src/shared/services/Common/Cart';
import { createWishListMenuVariants } from 'src/shared/helpers/wishlist/list';

export const buyBtnTitle = 'Add to cart';
export const wishlistBtnTitle = 'Add to Wishlist';
const quantitySelectedInitial = 1;

interface ProductPageProps extends WithStyles<typeof styles>, RouteProps {
  product: IProductDataParsed | null;
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  appPriceMode: TAppPriceMode;
  appStore: TAppStore;
  addItemToCart: Function;
  addItemGuestCart: Function;
  getProductData: Function;
  getWishLists: Function;
  addToWishlist: Function;
  createCartAndAddItem: Function;
  cartCreated: boolean;
  cartId: TCartId;
  payloadForCreateCart: ICartCreatePayload;
  isLoading: boolean;
  isRejected: boolean;
  isFulfilled: boolean;
  isInitiated: boolean;
  locationProductSKU?: TRouterMatchParam;
  isWishListsFetched: boolean;
  wishLists: Array<IWishlist>;
  isProductExist: boolean;
  isWishListLoading: boolean;

}

interface ProductPageState extends IProductPropFullData, ISuperAttributes {
  attributeMap: IProductAttributeMap | null;
  superAttrSelected: IProductAttributes;
  quantitySelected: TProductQuantity;
  wishListSelected: TWishListName | null;
}

@connect
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
    priceOriginalGross: null,
    priceOriginalNet: null,
    priceDefaultGross: null,
    priceDefaultNet: null,
    attributes: null,
    quantity: null,
    wishListSelected: null,
  };

  public componentDidMount() {
    console.info('%c ++++ ProductPage componentDidMount ++++', 'background: #3d5afe; color: #ffea00');
    if (this.props.product) {
      this.setInitialData();
    } else {
      if (!this.props.isLoading && this.props.isAppDataSet) {
        this.props.getProductData(this.props.locationProductSKU);
      }
    }

  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    if (this.props.isRejected || this.props.isLoading || !this.props.isAppDataSet) {
      console.info('%c ---- componentDidUpdate RETURN ----', 'background: #4caf50; color: #cada55');
      return;
    }

    // First load of the App
    // tslint:disable:max-line-length
    if (!this.props.isFulfilled && (!prevProps.product || prevProps.product.abstractProduct.sku !== this.props.locationProductSKU)) {
      console.info('%c ---- First load of the App in componentDidUpdate getProductData ----', 'background: #4caf50; color: #bada55');
      this.props.getProductData(this.props.locationProductSKU);
      return;
    }

    // Update of the product
    if (this.props.product.abstractProduct.sku !== this.props.locationProductSKU) {
      console.info('%c ---- Update of the product App in componentDidUpdate ----', 'background: #4caf50; color: #bada55');
      this.props.getProductData(this.props.locationProductSKU);
      return;
    }

    if (!prevProps.product || prevProps.product.abstractProduct.sku !== this.props.locationProductSKU) {
      this.setInitialData();
    }

    this.setInitialWishList();
    this.initRequestWishListsData();

  };

  public handleSuperAttributesChange = (event: any, child: React.ReactNode): void => {
    const key = event.target.name;
    const value = event.target.value;

    let productData: IProductPropFullData | null;

    if (value === defaultItemValueDropdown) {
      // If selected nothing
      productData = this.getProductDataObject(
        this.props.product.abstractProduct,
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
          this.props.product.concreteProducts[idProductConcrete],
        );
      }
    }

    this.setState((prevState: ProductPageState) => {
      if (prevState.superAttrSelected[key] === value) {
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
  };

  public handleProductQuantityChange = (event: any, child: React.ReactNode): void => {
    const value = event.target.value;
    this.setState((prevState: ProductPageState) => {
      if (prevState.quantitySelected === value) {
        return;
      }
      return ({
        ...prevState,
        quantitySelected: value,
      });
    });
  };

  public handleWishListChange = (event: any): void => {
    const value = event.target.value;
    this.setState((prevState: ProductPageState) => {
      if (this.state.wishListSelected === value) {
        return;
      }
      return ({
        ...prevState,
        wishListSelected: value,
      });
    });
  };

  public handleBuyBtnClick = (event: any): void => {
    const item: ICartAddItem = createCartItemAddToCart(this.state.sku, this.state.quantitySelected);

    if (this.props.isUserLoggedIn && this.props.cartId) {
      this.props.addItemToCart(
        item,
        this.props.cartId,
      );
    } else if (this.props.isUserLoggedIn) {
      this.props.createCartAndAddItem(this.props.payloadForCreateCart, item);
    } else {
      this.props.addItemGuestCart(item);
    }

    this.setState((prevState: ProductPageState) => {
      if (this.state.quantitySelected === quantitySelectedInitial) {
        return;
      }
      return ({
        ...prevState,
        quantitySelected: quantitySelectedInitial,
      });
    });
  };

  private initRequestWishListsData = (): boolean => {
    if (this.props.product
      && this.props.isUserLoggedIn
      && !this.props.isWishListLoading
      && !this.props.isWishListsFetched
    ) {
      this.props.getWishLists();
      return true;
    }
    return false;
  };

  private getProductDataObject = (data: IProductPropFullData | null): IProductPropFullData => {
    const defaultValues = this.props.product.abstractProduct;
    return {
      sku: data ? data.sku : null,
      name: data ? data.name : defaultValues.name,
      images: data
        ? (data.images && data.images.length ? [...data.images] : null)
        : (defaultValues.images.length ? [...defaultValues.images] : null),
      availability: data ? data.availability : false,
      description: data ? data.description : defaultValues.description,
      price: data ? data.price : null,
      priceOriginalGross: data ? data.priceOriginalGross : null,
      priceOriginalNet: data ? data.priceOriginalNet : null,
      priceDefaultGross: data ? data.priceDefaultGross : null,
      priceDefaultNet: data ? data.priceDefaultNet : null,
      attributes: data ? data.attributes : defaultValues.attributes,
      quantity: data ? data.quantity : defaultValues.quantity,
      productType: data ? data.productType : absentProductType,
    };
  };

  private setInitialWishList = (): boolean => {
    if (this.state.wishListSelected) {
      return false;
    }
    const wishListSelected = this.getFirstWishList();
    if (!wishListSelected) {
      return false;
    }
    this.setState((prevState: ProductPageState) => {
      if (prevState.wishListSelected === wishListSelected) {
        return;
      }
      return ({
        ...prevState,
        wishListSelected,
      });
    });
    return true;
  };

  private setInitialData = (): boolean => {
    let productData: IProductPropFullData | null;
    const concreteProductsIds = Object.keys(this.props.product.concreteProducts);
    const isOneConcreteProduct = Boolean(concreteProductsIds.length === 1);
    if (isOneConcreteProduct) {
      productData = this.getProductDataObject(this.props.product.concreteProducts[concreteProductsIds[0]]);
    } else {
      productData = this.getProductDataObject(this.props.product.abstractProduct);
    }

    // Parsing superAttributes to set initial data for this.state.superAttrSelected
    const selectedAttrNames = getInitialSuperAttrSelected(this.props.product.superAttributes);

    this.setState((prevState: ProductPageState) => {
      return ({
        ...prevState,
        superAttributes: this.props.product.superAttributes,
        attributeMap: this.props.product.attributeMap,
        superAttrSelected: selectedAttrNames,
        ...productData,
      });
    });
    return true;
  };

  private getFirstWishList = (): TWishListName | null => {
    if (!this.props.isWishListsFetched) {
      return null;
    }
    return (this.props.wishLists.length > 0) ? this.props.wishLists[0].id : null;
  };

  private getIdProductConcrete = (key: string, value: string) => {
    const selected = {...this.state.superAttrSelected};
    selected[key] = value;
    const path = createPathToIdProductConcrete(selected);
    if (!path) {
      return false;
    }

    const id = findIdProductConcreteByPath(path, this.state.attributeMap.attribute_variants);
    return id;
  };

  private getSuperAttrValue = (key: string) => {
    if (!key) {
      return defaultItemValueDropdown;
    }
    return (
      this.state.superAttrSelected[key]
        ? this.state.superAttrSelected[key]
        : defaultItemValueDropdown
    );
  };

  private getImageData = (images: Array<IProductCardImages>): Array<IImageSlide> | null => {
    if (!images) {
      return null;
    }
    const response = images.map((element: any, index: number) => (
      {
        id: index,
        src: element.externalUrlLarge,
      }
    ));
    return response;
  };

  private isBuyBtnDisabled = () => {
    if (this.state.productType === concreteProductType && this.state.availability) {
      return false;
    }
    return true;
  };

  private handleAddToWishlist = (e: any) => {
    this.props.addToWishlist(this.state.wishListSelected, this.state.sku);
  };

  private isAddToWishListBtnDisabled = () => {
    if (!this.props.isWishListsFetched
      || this.state.productType !== concreteProductType
      || !this.state.wishListSelected
    ) {
      return true;
    }
    return false;
  };

  public render(): JSX.Element {
    const {classes} = this.props;
    console.info('state: ', this.state);
    console.info('props: ', this.props);
    const images = this.getImageData(this.state.images);
    console.info('render this.state.wishListSelected ', this.state.wishListSelected);

    return (
      <AppMain>
        { (!this.props.product || !this.state.productType || !this.props.isAppDataSet || this.props.isRejected)
          ? null
          : (
            <div className={ classes.root }>
              <Grid container justify="center">
                <Grid item xs={ 12 } sm={ 6 } className={ classes.sliderParent }>
                  <ImageSlider images={ images } uniqueKey={ this.state.sku }/>
                </Grid>
                <Grid item xs={ 12 } sm={ 6 }>
                  <ProductGeneralInfo
                    name={ this.state.name }
                    sku={ this.state.sku }
                    price={ <AppPrice value={ this.state.priceDefaultGross }/> }
                    oldPrice={ this.state.priceOriginalGross
                      ? <AppPrice value={ this.state.priceOriginalGross } priceType={ priceTypeNameOriginal }/>
                      : null
                    }
                  />

                  { this.state.superAttributes
                    ? this.state.superAttributes.map((item: ISuperAttribute) => (
                      <DropdownControlled
                        key={ item.name }
                        nameAttr={ item.name }
                        nameToShow={ item.nameToShow }
                        value={ this.getSuperAttrValue(item.name) }
                        handleChange={ this.handleSuperAttributesChange }
                        menuItems={ item.data }
                      />
                    ))
                    : null
                  }

                  <ProductAvailability availability={ getAvailabilityDisplay(this.state.availability) }/>

                  <Grid container justify="center" className={ classes.buyBtnArea }>
                    <Grid item xs={ 12 } sm={ 6 } className={ classes.buyBtnParent }>
                      <SprykerButton
                        title={ buyBtnTitle }
                        extraClasses={ classes.buyBtn }
                        onClick={ this.handleBuyBtnClick }
                        IconType={ AddShoppingCartIcon }
                        disabled={ this.isBuyBtnDisabled() }
                      />
                    </Grid>
                    <Grid item xs={ 12 } sm={ 6 }>
                      { this.isBuyBtnDisabled()
                        ? null
                        : <DropdownControlled
                          nameAttr="quantity"
                          nameToShow="Quantity"
                          value={ this.state.quantitySelected }
                          handleChange={ this.handleProductQuantityChange }
                          menuItems={ createQuantityVariants(this.state.quantity) }
                          isHiddenMenuItemFirst={ true }
                        />
                      }
                    </Grid>
                  </Grid>

                  { this.props.isUserLoggedIn
                    ? (<Grid container justify="center" className={ classes.wishlistBtnArea }>
                        <Grid item xs={ 12 } sm={ 6 } className={ classes.buyBtnParent }>
                          <SprykerButton
                            title={ wishlistBtnTitle }
                            extraClasses={ classes.buyBtn }
                            onClick={ this.handleAddToWishlist }
                            IconType={ FavoriteIcon }
                            disabled={ this.isAddToWishListBtnDisabled() }
                          />
                        </Grid>
                        <Grid item xs={ 12 } sm={ 6 }>

                          { this.state.wishListSelected
                            ? <DropdownControlled
                              nameAttr="wishlists"
                              value={ this.state.wishListSelected }
                              handleChange={ this.handleWishListChange }
                              menuItems={ createWishListMenuVariants(this.props.wishLists) }
                              menuItemFirst={ {
                                value: defaultItemValueDropdown,
                                name: 'Select wishlist',
                              } }
                              isHiddenMenuItemFirst={ true }
                            />
                            : null
                          }

                        </Grid>
                      </Grid>
                    )
                    : null
                  }

                </Grid>
              </Grid>
              <Grid container justify="center">
                <ProductAttributes attributes={ this.state.attributes }/>
                <Grid item xs={ 12 }>
                  <Typography color="inherit" variant="body2" component="p" gutterBottom={ true }>
                    { this.state.description }
                  </Typography>
                </Grid>
              </Grid>
            </div>
          )
        }
      </AppMain>
    );
  }
}

export const ProductPage = withStyles(styles)(ProductPageBase);

export default ProductPage;
