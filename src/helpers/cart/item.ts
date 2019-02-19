import { TProductQuantity, TProductSKU } from '../../interfaces/product/index';
import { ICartAddItem, ICartItem } from '../../interfaces/cart/index';

export const createCartItemAddToCart = (sku: TProductSKU, quantity: TProductQuantity): ICartAddItem => ({
    sku,
    quantity,
});

export const getCartItemBlueprint = (): ICartItem => (
    {
        sku: null,
        name: null,
        image: null,
        quantity: null,
        amount: null,
        prices: [],
        calculations: null,
        groupKey: null,
        availability: null,
        availableQuantity: null,
        superAttributes: null,
        priceOriginalGross: null,
        priceOriginalNet: null,
        priceDefaultGross: null,
        priceDefaultNet: null,
    }
);
