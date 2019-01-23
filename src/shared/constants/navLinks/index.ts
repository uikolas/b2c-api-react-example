import {INavLinkData} from 'src/shared/interfaces/navLinks/index';
import {
  pathCustomerAddressesPage,
  pathCustomerProfilePage,
  pathOrderHistoryPage,
  pathWishListsPage
} from 'src/shared/routes/contentRoutes';
import {
  NavLinkTitleProfile,
  NavLinkTitleAddresses,
  NavLinkTitleOrderHistory,
  NavLinkTitleWishlist
} from 'src/shared/translation/translations';


export const customerProfileNavLinks: Array<INavLinkData> = [
  {path: pathCustomerProfilePage, title: NavLinkTitleProfile},
  {path: pathCustomerAddressesPage, title: NavLinkTitleAddresses},
  {path: pathOrderHistoryPage, title: NavLinkTitleOrderHistory},
  {path: pathWishListsPage, title: NavLinkTitleWishlist},
];
