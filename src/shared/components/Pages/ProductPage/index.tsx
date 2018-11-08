import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  absentProductType,
  concreteProductType,
  defaultItemValueDropdown,
  IProductCardImages,
  IProductPropFullData,
  priceTypeNameOriginal,
} from 'src/shared/interfaces/product';
import { IImageSlide } from 'src/shared/components/Common/ImageSlider';
import {
  createPathToIdProductConcrete,
  createQuantityVariants,
  findIdProductConcreteByPath,
  getAvailabilityDisplay,
  getInitialSuperAttrSelected,
} from 'src/shared/helpers/product';
import { TWishListName } from 'src/shared/interfaces/wishlist';
import { ICartAddItem } from 'src/shared/interfaces/cart';
import { ClickEvent } from 'src/shared/interfaces/commoon/react';
import { createCartItemAddToCart } from 'src/shared/helpers/cart';
import { AppPrice } from 'src/shared/components/Common/AppPrice';
import { createWishListMenuVariants } from 'src/shared/helpers/wishlist/list';
import { AppMain } from '../../Common/AppMain';
import { ImageSlider } from '../../Common/ImageSlider';
import { ProductGeneralInfo } from './ProductGeneralInfo';
import { DropdownControlled } from '../../UI/DropdownControlled';
import { SprykerButton } from '../../UI/SprykerButton';
import { ProductAttributes } from './ProductAttributes';
import { ProductSuperAttribute } from './ProductSuperAttribute';

import { connect } from './connect';
import { ProductPageProps as Props, ProductPageState as State } from './types';
import { styles } from './styles';

export const buyBtnTitle = 'Add to cart';
export const wishlistBtnTitle = 'Add to Wishlist';
const quantitySelectedInitial = 1;
export const skuTitle = 'SKU: ';

@connect
export class ProductPageBase extends React.Component<Props, State> {

  public state: State = {
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

  // Component lifecycle methods

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

  public componentDidUpdate(prevProps: any, prevState: any) {
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
  }

  // Action handlers

  public handleSuperAttributesChange = ({name, value}: {name: string, value: string}): void => {
    let productData: IProductPropFullData | null;

    if (value === defaultItemValueDropdown) {
      // If selected nothing
      productData = this.getProductDataObject(
        this.props.product.abstractProduct,
      );
    } else {
      // If selected a concrete product
      const idProductConcrete = this.getIdProductConcrete(name, value);

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

    this.setState((prevState: State) => {
      if (prevState.superAttrSelected[name] === value) {
        return;
      }
      return ({
        ...prevState,
        superAttrSelected: {
          ...prevState.superAttrSelected,
          [name]: value,
        },
        quantitySelected: quantitySelectedInitial,
        ...productData,
      });
    });
  };

  public handleProductQuantityChange = (event: any, child: React.ReactNode): void => {
    const value = event.target.value;
    this.setState((prevState: State) => {
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
    this.setState((prevState: State) => {
      if (this.state.wishListSelected === value) {
        return;
      }
      return ({
        ...prevState,
        wishListSelected: value,
      });
    });
  };

  public handleBuyBtnClick = (event: ClickEvent): void => {
    const item: ICartAddItem = createCartItemAddToCart(this.state.sku, this.state.quantitySelected);

    if (this.props.isUserLoggedIn && this.props.cartId) {
      this.props.addItemToCart(
        item,
        this.props.cartId,
      );
    } else {
      if (this.props.isUserLoggedIn) {
        this.props.createCartAndAddItem(this.props.payloadForCreateCart, item);
      } else {
        this.props.addItemGuestCart(item, this.props.anonymId);
      }
    }

    this.setState((prevState: State) => {
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
    this.setState((prevState: State) => {
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
    const concreteProductsIds = Object.keys(this.props.product.concreteProducts);
    const isOneConcreteProduct = Boolean(concreteProductsIds.length === 1);
    const productData: IProductPropFullData | null = this.getProductDataObject(
      isOneConcreteProduct
        ? this.props.product.concreteProducts[concreteProductsIds[0]]
        : this.getProductDataObject(this.props.product.abstractProduct),
    );

    // Parsing superAttributes to set initial data for this.state.superAttrSelected
    const selectedAttrNames = getInitialSuperAttrSelected(this.props.product.superAttributes);

    this.setState((prevState: State) => ({
      ...prevState,
      superAttributes: this.props.product.superAttributes,
      attributeMap: this.props.product.attributeMap,
      superAttrSelected: selectedAttrNames,
      ...productData,
    }));

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

    return findIdProductConcreteByPath(path, this.state.attributeMap.attribute_variants);
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

  private getImageData = (images: Array<IProductCardImages>): Array<IImageSlide> | null => images
    ? images.map((element: any, index: number) => ({
      id: index,
      src: element.externalUrlLarge,
    })) : null;

  private isBuyBtnDisabled = () => {
    if (this.state.productType === concreteProductType && this.state.availability) {
      return false;
    }
    return true;
  };

  private handleAddToWishlist = (event: ClickEvent) => {
    this.props.addToWishlist(this.state.wishListSelected, this.state.sku);
  };

  private isAddToWishListBtnDisabled = () => {
    return !this.props.isWishListsFetched || this.state.productType !== concreteProductType || !this.state.wishListSelected;
  };

  public render(): JSX.Element {
    const {classes} = this.props;
    const {sku = 'No SKU'} = this.state;
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
              <Grid container justify="center" className={ classes.productMain }>
                <Grid item xs={ 12 } sm={ 7 } className={ classes.sliderParent }>
                  <div className={ classes.sliderParentContainer }>
                    <ImageSlider images={ images } uniqueKey={ this.state.sku } showThumbs={ false }
                                 showStatus={ false }/>
                  </div>
                </Grid>

                <Grid item xs={ 12 } sm={ 5 }>
                  <ProductGeneralInfo
                    name={ this.state.name }
                    sku={ this.state.sku }
                    price={ <AppPrice value={ this.state.priceDefaultGross }/> }
                    oldPrice={ this.state.priceOriginalGross
                      ? <AppPrice value={ this.state.priceOriginalGross } priceType={ priceTypeNameOriginal }/>
                      : null
                    }
                    availability={ getAvailabilityDisplay(this.state.availability) }
                  />

                  { this.state.superAttributes
                    ? <ProductSuperAttribute productData={ this.state.superAttributes }
                                             onChange={ this.handleSuperAttributesChange }/>
                    : null
                  }

                  <Grid container justify="center" className={ classes.buyBtnArea }>
                    <Grid item xs={ 12 } sm={ 12 }>
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
                    <Grid item xs={ 12 } sm={ 12 } className={ classes.buyBtnParent }>
                      <SprykerButton
                        title={ buyBtnTitle }
                        extraClasses={ `${classes.productBtn} ${classes.buyBtn}` }
                        onClick={ this.handleBuyBtnClick }
                        disabled={ this.isBuyBtnDisabled() }
                      />
                    </Grid>
                  </Grid>

                  { this.props.isUserLoggedIn
                    ? (<Grid container justify="center" className={ classes.wishlistBtnArea }>
                        <Grid item xs={ 12 } sm={ this.state.wishListSelected ? 6 : 12 } className={ classes.buyBtnParent }>
                          <SprykerButton
                            title={ wishlistBtnTitle }
                            extraClasses={ `${classes.productBtn} ${classes.wishListBtn}` }
                            onClick={ this.handleAddToWishlist }
                            disabled={ this.isAddToWishListBtnDisabled() }
                          />
                        </Grid>
                        { this.state.wishListSelected
                          ?
                          <Grid item xs={ 12 } sm={ 6 }>
                            <DropdownControlled
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
                          </Grid>
                          : null
                        }
                      </Grid>
                    )
                    : null
                  }
                </Grid>
              </Grid>

              <div className={ classes.descriptionContainer }>
                <Grid container justify="center" className={ classes.description }>
                  <Grid item md={7} sm={12}>
                    <ProductAttributes attributes={ this.state.attributes }/>
                  </Grid>
                  <Grid item md={5} sm={12}>
                    <Typography variant="title" color="textPrimary" className={ classes.descriptionTitle }>
                      Product details
                    </Typography>
                    <Typography color="inherit" variant="body2" component="p" gutterBottom={ true }>
                      { this.state.description }
                    </Typography>
                    <Typography
                      variant="subheading"
                      color="inherit"
                      gutterBottom={ true }
                      className={ classes.descriptionSku }
                    >
                      { skuTitle }{ sku }
                    </Typography>
                  </Grid>
                </Grid>
              </div>
            </div>
          )
        }
      </AppMain>
    );
  }
}

export const ProductPage = withStyles(styles)(ProductPageBase);

export default ProductPage;
