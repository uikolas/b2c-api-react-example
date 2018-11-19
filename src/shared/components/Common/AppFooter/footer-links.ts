import { link } from './parts/Links/types';
import {pathSearchPage} from "src/shared/routes/contentRoutes";

export const categoriesLinks: link[] = [
  {
    name: 'Computers',
    path: `${pathSearchPage}/5`,
  },
  {
    name: 'Notebooks',
    path: `${pathSearchPage}/6`,
  },
  {
    name: 'Pcs & Workstations',
    path: `${pathSearchPage}/7`,
  },
  {
    name: 'Tablets',
    path: `${pathSearchPage}/8`,
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
    path: 'https://www.instagram.com',
  },
  {
    name: 'YouTube',
    path: 'https://youtube.com',
  },
  {
    name: 'Facebook',
    path: 'https://facebook.com',
  },
  {
    name: 'Twitter',
    path: 'https://twitter.com',
  },
  {
    name: 'LinkedIn',
    path: 'https://linkedin.com',
  },
  {
    name: 'Xing',
    path: 'https://www.xing.com',
  },
];
