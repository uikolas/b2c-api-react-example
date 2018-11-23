import { link } from './parts/Links/types';
import {pathSearchPage} from "src/shared/routes/contentRoutes";

export const categoriesLinks: link[] = [
  {
    name: 'Computers',
    path: `${pathSearchPage}/Computer`,
  },
  {
    name: 'Notebooks',
    path: `${pathSearchPage}/Computer/Notebooks`,
  },
  {
    name: 'Pcs & Workstations',
    path: `${pathSearchPage}/Computer/Pc's/Workstations`,
  },
  {
    name: 'Tablets',
    path: `${pathSearchPage}/Computer/Tablets`,
  },
  {
    name: 'Sale %',
    path: `${pathSearchPage}/outlet`,
  },
  {
    name: 'New',
    path: `${pathSearchPage}/new`,
  },
];

export const socialMediaLinks: link[] = [
  {
    name: 'Instagram',
    path: 'https://www.instagram.com/spryker/',
  },
  {
    name: 'YouTube',
    path: 'https://www.youtube.com/channel/UC6lVOEbqXxUh0W5FMTvlPDQ',
  },
  {
    name: 'Facebook',
    path: 'https://www.facebook.com/Spryker/',
  },
  {
    name: 'Twitter',
    path: 'https://twitter.com/sprysys',
  },
  {
    name: 'LinkedIn',
    path: 'https://www.linkedin.com/company/spryker-systems-gmbh',
  },
  {
    name: 'Xing',
    path: 'https://www.xing.com/companies/sprykersystemsgmbh',
  },
];
