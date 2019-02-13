import { ChangeEvent } from 'react';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IWishlist, TWishlistName } from '@interfaces/wishlist';
import { TProductSKU, TProductType } from '@interfaces/product';

export interface ProductConfiguratorAddToWishlistProps extends WithStyles<typeof styles> {
    getWishlists: Function;
    addToWishlist: Function;
    isWishlistsFetched: boolean;
    isWishlistLoading: boolean;
    wishlists: IWishlist[];
    productType: TProductType | null;
    sku: TProductSKU | null;
}

export interface ProductConfiguratorAddToWishlistState {
    wishlistSelected: TWishlistName | null;
}

export interface IProductWishlistParams {
    onChangeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
    inputValue: ProductConfiguratorAddToWishlistState['wishlistSelected'];
    wishlists: ProductConfiguratorAddToWishlistProps['wishlists'];
    controlsGroupClassName?: string;
}
