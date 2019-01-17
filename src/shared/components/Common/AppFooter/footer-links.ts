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
  SocialInstagramText,
  SocialFacebookText,
  SocialXingText,
  SocialLinkedInText,
  SocialTwitterText,
  SocialYouTubeText
} from 'src/shared/translation/translations';

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
    name: SocialInstagramText,
    path: 'https://www.instagram.com/spryker/',
  },
  {
    name: SocialYouTubeText,
    path: 'https://www.youtube.com/channel/UC6lVOEbqXxUh0W5FMTvlPDQ',
  },
  {
    name: SocialFacebookText,
    path: 'https://www.facebook.com/Spryker/',
  },
  {
    name: SocialTwitterText,
    path: 'https://twitter.com/sprysys',
  },
  {
    name: SocialLinkedInText,
    path: 'https://www.linkedin.com/company/spryker-systems-gmbh',
  },
  {
    name: SocialXingText,
    path: 'https://www.xing.com/companies/sprykersystemsgmbh',
  },
];
