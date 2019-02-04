import * as React from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from '@material-ui/core/Grid';
import {
    defaultItemValueDropdown,
    IProductCardImages,
    IProductPropFullData
} from 'src/shared/interfaces/product';
import { IImageSlide } from 'src/shared/components/Common/ImageSlider';
import {
    createPathToIdProductConcrete,
    findIdProductConcreteByPath,
    getAvailabilityDisplay,
    getInitialSuperAttrSelected,
    getCurrentProductDataObject
} from 'src/shared/helpers/product';
import { AppMain } from '@components/Common/AppMain';
import { ImageSlider } from '@components/Common/ImageSlider';
import { ProductGeneralInfo } from '@components/components/ProductGeneralInfo';
import { ProductSuperAttribute } from '@components/containers/ProductSuperAttribute';
import { ProductConfiguratorAddToCart } from '@components/containers/ProductConfiguratorAddToCart';
import { ProductConfiguratorAddToWishlist } from '@components/containers/ProductConfiguratorAddToWishlist';
import { connect } from './connect';
import { ProductPageProps as Props, ProductPageState as State } from './types';
import { styles } from './styles';
import { ProductDetail } from 'src/shared/components/components/ProductDetail';
import { ErrorBoundary } from '@components/hoc/ErrorBoundary';

@connect
export class ProductPageBase extends React.Component<Props, State> {
    public state: State = {
        attributeMap: null,
        superAttrSelected: {},
        superAttributes: null,
        productType: null,
        sku: null,
        name: null,
        images: null,
        availability: null,
        description: null,
        price: null,
        prices: null,
        priceOriginalGross: null,
        priceOriginalNet: null,
        priceDefaultGross: null,
        priceDefaultNet: null,
        attributes: null,
        attributeNames: null
    };

    // Component lifecycle methods
    public componentDidMount() {
        if (this.props.product) {
            this.setInitialData();
        } else {
            if (!this.props.isLoading && this.props.isAppDataSet) {
                this.props.getProductData(this.props.locationProductSKU);
            }
        }
    }

    public componentDidUpdate(prevProps: Props, prevState: State) {
        if (this.props.isRejected || this.props.isLoading || !this.props.isAppDataSet) {
            return;
        }

        // First load of the App
        if (!this.props.isFulfilled
            && (!prevProps.product || prevProps.product.abstractProduct.sku !== this.props.locationProductSKU)
        ) {
            this.props.getProductData(this.props.locationProductSKU);

            return;
        }

        // Update of the product
        if (this.props.product.abstractProduct.sku !== this.props.locationProductSKU) {
            this.props.getProductData(this.props.locationProductSKU);

            return;
        }

        if (!prevProps.product || prevProps.product.abstractProduct.sku !== this.props.locationProductSKU) {
            this.setInitialData();
        }
    }

    // Action handlers
    public handleSuperAttributesChange = ({name, value}: {name: string, value: string}): void => {
        let productData: IProductPropFullData | null;

        if (value === defaultItemValueDropdown) {
            // If selected nothing
            productData = getCurrentProductDataObject(
                this.props.product.abstractProduct,
                null
            );
        } else {
            // If selected a concrete product
            const idProductConcrete = this.getIdProductConcrete(name, value);

            if (!idProductConcrete) {
                // Such product does not exist
                productData = getCurrentProductDataObject(this.props.product.abstractProduct, null);
            } else {
                // Such product exists
                productData = getCurrentProductDataObject(
                    this.props.product.abstractProduct,
                    this.props.product.concreteProducts[idProductConcrete]
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
                    [name]: value
                },
                ...productData
            });
        });
    };

    private setInitialData = (): boolean => {
        const concreteProductsIds = Object.keys(this.props.product.concreteProducts);
        const isOneConcreteProduct = Boolean(concreteProductsIds.length === 1);
        const productData: IProductPropFullData | null = getCurrentProductDataObject(
            this.props.product.abstractProduct,
            isOneConcreteProduct
                ? this.props.product.concreteProducts[concreteProductsIds[0]]
                : getCurrentProductDataObject(this.props.product.abstractProduct, null)
        );

        // Parsing superAttributes to set initial data for this.state.superAttrSelected
        const selectedAttrNames = getInitialSuperAttrSelected(this.props.product.superAttributes);

        this.setState((prevState: State) => ({
            ...prevState,
            superAttributes: this.props.product.superAttributes,
            attributeMap: this.props.product.attributeMap,
            superAttrSelected: selectedAttrNames,
            ...productData
        }));

        return true;
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

    private getImageData = (images: IProductCardImages[]): IImageSlide[] | null => images
        ? images.map((element: IProductCardImages, index: number) => ({
            id: index,
            src: element.externalUrlLarge
        })) : null;

    public render(): JSX.Element {
        const {classes} = this.props;
        const images = this.getImageData(this.state.images);

        return (
            <ErrorBoundary>
                <AppMain>
                    {(!this.props.product || !this.state.productType || !this.props.isAppDataSet || this.props.isRejected)
                        ? null
                        : (
                            <div className={classes.root}>
                                <Grid container justify="center" className={classes.productMain}>
                                    <Grid item xs={12} sm={12} md={7} className={classes.sliderParent}>
                                        <div className={classes.sliderParentContainer}>
                                            <ImageSlider
                                                images={images}
                                                uniqueKey={this.state.sku}
                                                showThumbs={false}
                                                showStatus={false}
                                            />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} sm={12} md={5} className={classes.generalInfoParent}>
                                        <ProductGeneralInfo
                                            name={this.state.name}
                                            sku={this.state.sku}
                                            price={this.state.priceDefaultGross}
                                            oldPrice={
                                                this.state.priceOriginalGross ? this.state.priceOriginalGross : null
                                            }
                                            availability={getAvailabilityDisplay(this.state.availability)}
                                        />

                                        {this.state.superAttributes &&
                                            <ErrorBoundary>
                                                <ProductSuperAttribute
                                                    productData={this.state.superAttributes}
                                                    onChange={this.handleSuperAttributesChange}
                                                />
                                            </ErrorBoundary>
                                        }

                                        <ErrorBoundary>
                                            <ProductConfiguratorAddToCart
                                                productType={this.state.productType}
                                                product={this.props.product.concreteProducts[this.state.sku]}
                                                sku={this.state.sku}
                                            />
                                        </ErrorBoundary>

                                        {this.props.isUserLoggedIn &&
                                            <ErrorBoundary>
                                                <ProductConfiguratorAddToWishlist
                                                    productType={this.state.productType}
                                                    sku={this.state.sku}
                                                />
                                            </ErrorBoundary>
                                        }
                                    </Grid>
                                </Grid>
                                <ProductDetail
                                    attributes={this.state.attributes}
                                    attributeNames={this.state.attributeNames}
                                    description={this.state.description}
                                    sku={this.state.sku ? this.state.sku : this.props.product.abstractProduct.sku}
                                />
                            </div>
                        )
                    }
                </AppMain>
            </ErrorBoundary>
        );
    }
}

export const ProductPageContainer = withStyles(styles)(ProductPageBase);
