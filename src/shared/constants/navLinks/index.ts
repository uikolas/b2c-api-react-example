import { INavLinkData } from 'src/shared/interfaces/navLinks/index';
import { FormattedMessageTemplate } from 'src/shared/lib/formatted-message-template';
import {
    pathCustomerAddressesPage,
    pathCustomerProfilePage,
    pathOrderHistoryPage,
    pathWishListsPage
} from 'src/shared/routes/contentRoutes';

export const customerProfileNavLinks: Array<INavLinkData> = [
    { path: pathCustomerProfilePage, title: FormattedMessageTemplate('word.profile.title')},
    { path: pathCustomerAddressesPage, title: FormattedMessageTemplate('word.addresses.title') },
    { path: pathOrderHistoryPage, title: FormattedMessageTemplate('word.order.history.title') },
    { path: pathWishListsPage, title: FormattedMessageTemplate('word.wishlist.title') },
];
