import { link } from './parts/Links/types';
import {
  pathCategoryComputers,
  pathCategoryNew,
  pathCategoryNotebooks,
  pathCategorySale,
  pathCategoryTablets,
  pathCategoryWorkstations
} from 'src/shared/routes/categoriesRoutes';
import {
  CategoryNameComputers,
  CategoryNameNew,
  CategoryNameNotebooks,
  CategoryNameSale,
  CategoryNameTablets,
  CategoryNameWorkstations,
  SocialInstagramTitle,
  SocialFacebookTitle,
  SocialXingTitle,
  SocialLinkedInTitle,
  SocialTwitterTitle,
  SocialYouTubeTitle
} from 'src/shared/translation';

export const categoriesLinks: link[] = [
  {
    name: CategoryNameComputers,
    path: pathCategoryComputers,
  },
  {
    name: CategoryNameNotebooks,
    path: pathCategoryNotebooks,
  },
  {
    name: CategoryNameWorkstations,
    path: pathCategoryWorkstations,
  },
  {
    name: CategoryNameTablets,
    path: pathCategoryTablets,
  },
  {
    name: CategoryNameSale,
    path: pathCategorySale,
  },
  {
    name: CategoryNameNew,
    path: pathCategoryNew,
  },
];

export const socialMediaLinks: link[] = [
  {
    name: SocialInstagramTitle,
    path: 'https://www.instagram.com/spryker/',
  },
  {
    name: SocialYouTubeTitle,
    path: 'https://www.youtube.com/channel/UC6lVOEbqXxUh0W5FMTvlPDQ',
  },
  {
    name: SocialFacebookTitle,
    path: 'https://www.facebook.com/Spryker/',
  },
  {
    name: SocialTwitterTitle,
    path: 'https://twitter.com/sprysys',
  },
  {
    name: SocialLinkedInTitle,
    path: 'https://www.linkedin.com/company/spryker-systems-gmbh',
  },
  {
    name: SocialXingTitle,
    path: 'https://www.xing.com/companies/sprykersystemsgmbh',
  },
];
