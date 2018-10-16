import {IMenuItemsDropdown} from "../../components/UI/DropdownControlled";
import {IWishlist} from "../../interfaces/wishlist/index";

export const createWishListMenuVariants = (wishlists:  Array<IWishlist> | null)
                                          :  Array<IMenuItemsDropdown> | boolean => {
  if (!wishlists) {
    return null;
  }

  const variants = wishlists.map((wishlist: IWishlist) => ({name: wishlist.name, value: wishlist.id}));

  return variants;
};
