import { ChangeEvent } from 'react';
import { WithStyles } from '@material-ui/core';
import { styles } from './styles';
import { IWishlist, TWishListName } from '@interfaces/wishlist';
import { TProductSKU, TProductType } from '@interfaces/product';

export interface ProductConfiguratorAddToWishlistProps extends WithStyles<typeof styles> {
    getWishLists: Function;
    addToWishlist: Function;
    isWishListsFetched: boolean;
    isWishListLoading: boolean;
    wishLists: IWishlist[];
    productType: TProductType | null;
    sku: TProductSKU | null;
}

export interface ProductConfiguratorAddToWishlistState {
    wishListSelected: TWishListName | null;
}

export interface IProductWishListParams {
    onChangeHandler: (event: ChangeEvent<HTMLSelectElement>) => void;
    inputValue: ProductConfiguratorAddToWishlistState['wishListSelected'];
    wishLists: ProductConfiguratorAddToWishlistProps['wishLists'];
    controlsGroupClassName?: string;
}
