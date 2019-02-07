import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { createWishListMenuVariants } from '@helpers/wishlist/list';
import { connect } from './connect';
import { withStyles, Grid } from '@material-ui/core';
import { SprykerForm } from '@components/UI/SprykerForm';
import { SprykerButton } from '@components/UI/SprykerButton';
import {
    ProductConfiguratorAddToWishlistProps as Props,
    ProductConfiguratorAddToWishlistState as State,
    IProductWishListParams
} from './types';
import { concreteProductType, defaultItemValueDropdown } from '@interfaces/product';
import { IFormSettings } from '@components/UI/SprykerForm/types';
import { ClickEvent } from '@interfaces/common/react';
import { TWishListName } from '@interfaces/wishlist';
import { styles } from './styles';

@connect
export class ProductConfiguratorAddToWishlistBase extends React.Component<Props, State> {
    public state: any = {
        wishListSelected: null
    };

    public componentDidMount() {
        this.initRequestWishListsData();
    }

    public componentDidUpdate() {
        this.setInitialWishList();
        this.initRequestWishListsData();
    }

    public handleWishListChange = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>)
        : void => {
        const {value} = event.target;

        if (this.state.wishListSelected !== value) {
            this.setState({wishListSelected: value});
        }
    };

    private initRequestWishListsData = (): boolean => {
        const {isWishListLoading, isWishListsFetched, getWishLists} = this.props;

        if (!isWishListLoading && !isWishListsFetched) {
            getWishLists();

            return true;
        }

        return false;
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
                wishListSelected
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

    private handleAddToWishlist = (event: ClickEvent) => {
        this.props.addToWishlist(this.state.wishListSelected, this.props.sku);
    };

    private isAddToWishListBtnDisabled = () => (
        !this.props.isWishListsFetched || this.props.productType !== concreteProductType
    );

    private getWishListFormSettings = (params: IProductWishListParams): IFormSettings => {
        const {
            inputValue,
            wishLists,
            onChangeHandler
        } = params;
        const formSettings: IFormSettings = {
            formName: 'quantityForm',
            onChangeHandler,
            onSubmitHandler: (event: React.FormEvent<HTMLFormElement>) => {
                console.info('Empty WishList Submit');
            },
            fields: [
                [
                    {
                        type: 'select',
                        inputName: 'wishlists',
                        inputValue,
                        spaceNumber: 12,
                        isRequired: false,
                        label: null,
                        isError: false,
                        menuItems: createWishListMenuVariants(wishLists),
                        menuItemFirst: {
                            value: defaultItemValueDropdown,
                            name: <FormattedMessage id={'select.wish.list.label'} />,
                            disabled: true
                        }
                    }
                ]
            ]
        };

        return formSettings;
    };

    public render(): JSX.Element {
        const {classes} = this.props;
        const {wishListSelected} = this.state;

        const formWishListSettings: IFormSettings = this.getWishListFormSettings({
            inputValue: wishListSelected,
            wishLists: this.props.wishLists,
            onChangeHandler: this.handleWishListChange
        });

        return (
            <Grid container spacing={24} className={classes.wishlistBtnArea}>
                {wishListSelected &&
                <Grid item xs={12} sm={12} md={6}>
                    <SprykerForm
                        form={formWishListSettings}
                        formClassName={classes.formWishList}
                    />
                </Grid>
                }
                <Grid item
                      xs={12}
                      md={wishListSelected ? 6 : 12}
                      className={classes.buyBtnParent}
                >
                    <SprykerButton
                        title={
                            <FormattedMessage id={'add.to.cart.wishlist.title'} />
                        }
                        extraClasses={classes.wishListBtn}
                        onClick={this.handleAddToWishlist}
                        disabled={this.isAddToWishListBtnDisabled()}
                    />
                </Grid>
            </Grid>
        );
    }
}

export const ProductConfiguratorAddToWishlist = withStyles(styles)(ProductConfiguratorAddToWishlistBase);
