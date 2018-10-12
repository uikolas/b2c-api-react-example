import * as React from "react";
import {RouteProps} from "react-router";
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { toast } from 'react-toastify';
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import FavoriteIcon from '@material-ui/icons/Favorite';

import {reduxify} from '../../../lib/redux-helper';

import {
  getProduct, isPageProductStateFulfilled, isPageProductStateInitiated, isPageProductStateLoading,
  isPageProductStateRejected, isProductDetailsPresent
} from '../../../reducers/Pages/Product';
import {
  getWishlistsCollectionFromStore, isPageWishlistStateLoading, isWishlistsCollectionInitiated,
  WishlistState
} from '../../../reducers/Pages/Wishlist';
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
  defaultItemValueDropdown,
  IProductAttributeMap,
  IProductAttributes,
  IProductCardImages,
  IProductPropFullData,
  ISuperAttributes,
  TProductQuantity,
  IProductDataParsed, priceTypeNameOriginal,
} from '../../../interfaces/product';
import {IImageSlide} from '../../../components/Common/ImageSlider';

import {styles} from './styles';
import {
  ISuperAttribute,
  getAvailabilityDisplay,
  createQuantityVariants,
  createPathToIdProductConcrete,
  findIdProductConcreteByPath,
  getInitialSuperAttrSelected,
} from "../../../services/productHelper";
import {addItemToCartAction} from "../../../actions/Common/Cart";
import {isCartCreated, getCartId} from "../../../reducers/Common/Cart";
import {
  getPayloadForCreateCart,
  isAppInitiated,
  TAppPriceMode,
  TAppStore,
} from "../../../reducers/Common/Init";
import {
  getWishlistsAction,
  addItemAction,
} from '../../../actions/Pages/Wishlist';
import {isUserAuthenticated} from "../../../reducers/Pages/Login";
import {createCartItemAddToCart} from "../../../services/cartHelper";
import {IWishlist, TWishListName} from "../../../interfaces/wishlist";
import {ICartAddItem, TCartId} from "../../../interfaces/cart/index";
import {AppPrice} from "../../Common/AppPrice/index";
import {getProductDataAction} from "../../../actions/Pages/Product";
import {getRouterLocation, getRouterMatchParam, TRouterMatchParam} from "../../../selectors/Common/router";
import {cartAuthenticateErrorText} from "../../../constants/messages/errors";
import {ICartCreatePayload} from "../../../services/Common/Cart";
import {createWishListMenuVariants} from "../../../services/wishlistHelper/list";

export const buyBtnTitle = "Add to cart";
export const wishlistBtnTitle = "Add to Wishlist";
const quantitySelectedInitial = 1;

interface ProductPageProps extends WithStyles<typeof styles>, RouteProps {
  product: IProductDataParsed | null;
  isAppDataSet: boolean;
  isUserLoggedIn: boolean;
  appPriceMode: TAppPriceMode;
  appStore: TAppStore;
  addItemToCart: Function;
  getProductData: Function;
  getWishLists: Function;
  addToWishlist: Function;
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

  public componentDidMount () {
    if (this.props.product) {
      this.setInitialData();
    }
  }

  public componentDidUpdate = (prevProps: any, prevState: any) => {
    if (this.props.isFulfilled) {
      if (this.props.product && !prevProps.product && this.props.locationProductSKU) {
        this.setInitialData();
      }
      if (this.props.product && prevProps.locationProductSKU !== this.props.locationProductSKU) {
        this.props.getProductData(this.props.locationProductSKU);
      }
      this.setInitialWishList();
    }

    if (!this.props.product
        && this.props.locationProductSKU
        && this.props.isAppDataSet
        && !this.props.isLoading
        && !this.props.isRejected
    ) {
      this.props.getProductData(this.props.locationProductSKU);
    }

    if (this.props.product
      && this.props.isUserLoggedIn
      && !this.props.isWishListLoading
      && this.props.isAppDataSet
      && !this.props.isWishListsFetched
    ) {
      this.props.getWishLists();
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
  }

  public handleProductQuantityChange = (event: any, child: React.ReactNode): void => {
    const value = event.target.value;
    this.setState( (prevState: ProductPageState) => {
      if (prevState.quantitySelected === value) {
        return;
      }
      return ({
        ...prevState,
        quantitySelected: value,
      });
    });
  }

  public handleWishListChange = (event: any): void => {
    const value = event.target.value;
    this.setState( (prevState: ProductPageState) => {
      if (this.state.wishListSelected === value) {
        return;
      }
      return ({
        ...prevState,
        wishListSelected: value,
      });
    });
  }

  public handleBuyBtnClick = (event: any): any => {
    if (!this.props.isUserLoggedIn) {
      toast.error(cartAuthenticateErrorText);
      return;
    }
    if (this.state.productType === concreteProductType) {
      this.props.addItemToCart(
        createCartItemAddToCart(this.state.sku, this.state.quantitySelected),
        this.props.cartId,
        this.props.payloadForCreateCart
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
    console.log('*** getProductDataObject: images: ', data ? data.images : defaultValues.images);
    console.log('*** getProductDataObject: data: ', Boolean(data));
    return {
      sku: data ? data.sku : null,
      name: data ? data.name : defaultValues.name,
      images: data ? [...data.images] : [...defaultValues.images],
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
  }

  private setInitialWishList = (): boolean => {
    const wishListSelected = this.getFirstWishList();

    if (!wishListSelected) {
      return false;
    }
    this.setState( (prevState: ProductPageState) => {
      if (prevState.wishListSelected === wishListSelected) {
        return;
      }
      return ({
        ...prevState,
        wishListSelected,
      });
    });
    return true;
  }

  private setInitialData = (): boolean => {
    console.log('%%% setInitialData works %%%');
    let productData: IProductPropFullData | null;
    const concreteProductsIds = Object.keys(this.props.product.concreteProducts);
    const isOneConcreteProduct = (concreteProductsIds.length === 1);
    if (isOneConcreteProduct) {
      productData = this.getProductDataObject(this.props.product.concreteProducts[concreteProductsIds[0]]);
    } else {
      productData = this.getProductDataObject(this.props.product.abstractProduct);
    }

    // Parsing superAttributes to set initial data for this.state.superAttrSelected
    const selectedAttrNames = getInitialSuperAttrSelected(this.props.product.superAttributes);

    this.setState( (prevState: ProductPageState) => {
      return ({
        ...prevState,
        superAttributes: this.props.product.superAttributes,
        attributeMap: this.props.product.attributeMap,
        superAttrSelected: selectedAttrNames,
        ...productData,
      });
    });
    return true;
  }

  private getFirstWishList = (): TWishListName | null => {
    if (!this.props.isWishListsFetched) {
      return null;
    }
    return (this.props.wishLists.length > 0) ? this.props.wishLists[0].id : null;
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
  }

  private isBuyBtnDisabled = () => {
    if (this.state.productType === concreteProductType && this.state.availability) {
      return false;
    }
    return true;
  }

  private handleAddToWishlist = (e: any) => {
    this.props.addToWishlist(this.state.wishListSelected, this.state.sku);
  }

  private isAddToWishListBtnDisabled = () => {
    if (!this.props.isWishListsFetched
      || this.state.productType !== concreteProductType
      || !this.state.wishListSelected
    ) {
      return true;
    }
    return false;
  }

  public render(): JSX.Element {
    const {classes} = this.props;
    console.info('state: ', this.state);
    console.info('props: ', this.props);
    const images = this.getImageData(this.state.images);
    console.log('*** render images ', images)
    return (
      <AppMain>
        { (!this.props.product || !this.state.productType || !this.props.isAppDataSet || this.props.isRejected)
          ? null
          : (
            <div className={classes.root} >
              <Grid container justify="center" >
                <Grid item xs={12} sm={6} className={classes.sliderParent}>
                  <ImageSlider images={images} />
                </Grid>
                <Grid item xs={12} sm={6} >
                  <ProductGeneralInfo
                    name={this.state.name}
                    sku={this.state.sku}
                    price={<AppPrice value={this.state.priceDefaultGross}/>}
                    oldPrice={this.state.priceOriginalGross
                      ? <AppPrice value={this.state.priceOriginalGross} priceType={priceTypeNameOriginal}/>
                      : null
                    }
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
                      {this.isBuyBtnDisabled()
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

                  {this.props.isUserLoggedIn
                    ? ( <Grid container justify="center" className={classes.wishlistBtnArea}>
                          <Grid item xs={12} sm={6} className={classes.buyBtnParent} >
                            <SprykerButton
                              title={wishlistBtnTitle}
                              extraClasses={classes.buyBtn}
                              onClick={this.handleAddToWishlist}
                              IconType={FavoriteIcon}
                              disabled={this.isAddToWishListBtnDisabled()}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6} >

                            {this.state.wishListSelected
                              ? <DropdownControlled
                                nameAttr="wishlists"
                                value={this.state.wishListSelected}
                                handleChange={this.handleWishListChange}
                                menuItems={createWishListMenuVariants(this.props.wishLists)}
                                menuItemFirst={{
                                  value: defaultItemValueDropdown,
                                  name: 'Select wishlist',
                                }}
                                isHiddenMenuItemFirst={true}
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
              <Grid container justify="center" >
                <ProductAttributes attributes={this.state.attributes} />
                <Grid item xs={12}>
                  <Typography color="inherit" variant="body2" component="p" gutterBottom={true}>
                    {this.state.description}
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

export const ConnectedProductPage = reduxify(
  (state: any, ownProps: any) => {
    const location = getRouterLocation(state, ownProps);
    const product = getProduct(state, ownProps);
    const isUserLoggedIn = isUserAuthenticated(state, ownProps);
    const cartCreated: boolean = isCartCreated(state, ownProps);
    const cartId: TCartId = getCartId(state, ownProps);
    const payloadForCreateCart: ICartCreatePayload = getPayloadForCreateCart(state, ownProps);
    const isAppDataSet: boolean = isAppInitiated(state, ownProps);
    const isLoading: boolean = isPageProductStateLoading(state, ownProps);
    const isRejected: boolean = isPageProductStateRejected(state, ownProps);
    const isFulfilled: boolean = isPageProductStateFulfilled(state, ownProps);
    const isInitiated: boolean = isPageProductStateInitiated(state, ownProps);
    const locationProductSKU = getRouterMatchParam(state, ownProps, 'productId');
    const isProductExist: boolean = isProductDetailsPresent(state, ownProps);
    const isWishListLoading: boolean = isPageWishlistStateLoading(state, ownProps);
    const wishLists = getWishlistsCollectionFromStore(state, ownProps);
    const isWishListsFetched: boolean = isWishlistsCollectionInitiated(state, ownProps);

    return ({
      location,
      product,
      cartCreated,
      cartId,
      isAppDataSet,
      payloadForCreateCart,
      isUserLoggedIn,
      isInitiated,
      isLoading,
      isRejected,
      isFulfilled,
      locationProductSKU,
      wishLists,
      isWishListsFetched,
      isProductExist,
      isWishListLoading,
    });
  },
  (dispatch: Function) => ({
    dispatch,
    addItemToCart: (
      payload: ICartAddItem, cartId: TCartId, payloadCartCreate: ICartCreatePayload
    ) => dispatch(addItemToCartAction(payload, cartId, payloadCartCreate)),
    getProductData: (sku: string) => dispatch(getProductDataAction(sku)),
    getWishLists: () => dispatch(getWishlistsAction()),
    addToWishlist: (wishlistId: string, sku: string) => dispatch(addItemAction(wishlistId, sku)),
  })
)(ProductPage);
