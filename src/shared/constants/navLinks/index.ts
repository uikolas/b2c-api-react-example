import { INavLinkData } from 'src/shared/interfaces/navLinks';
import {
    pathCustomerAddressesPage,
    pathCustomerProfilePage,
    pathOrderHistoryPage,
    pathWishListsPage
} from 'src/shared/routes/contentRoutes';

export const customerProfileNavLinks: INavLinkData[] = [
    { path: pathCustomerProfilePage, title: 'word.profile.title' },
    { path: pathCustomerAddressesPage, title: 'word.addresses.title' },
    { path: pathOrderHistoryPage, title: 'word.order.history.title' },
    { path: pathWishListsPage, title: 'word.wishlist.title' }
];
