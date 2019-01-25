import { INavLinkData } from 'src/shared/interfaces/navLinks';
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
} from 'src/shared/translation/index';

export const customerProfileNavLinks: INavLinkData[] = [
    {path: pathCustomerProfilePage, title: NavLinkTitleProfile},
    {path: pathCustomerAddressesPage, title: NavLinkTitleAddresses},
    {path: pathOrderHistoryPage, title: NavLinkTitleOrderHistory},
    {path: pathWishListsPage, title: NavLinkTitleWishlist},
];
