import {ICategoriesTeasersData} from 'src/shared/components/Pages/HomePage/types';
import {
  CategoryIntroComputers,
  CategoryIntroNotebooks,
  CategoryIntroTablets,
  CategoryIntroWorkstations,
  CategoryNameComputers,
  CategoryNameNotebooks,
  CategoryNameTablets,
  CategoryNameWorkstations
} from 'src/shared/translation/translations';
import {
  HomePageComputersBtnTitle,
  HomePageNotebooksBtnTitle,
  HomePageTabletsBtnTitle,
  HomePageWorkstationsBtnTitle
} from 'src/shared/translation/translations';
import {
  pathCategoryComputers,
  pathCategoryNotebooks,
  pathCategoryTablets,
  pathCategoryWorkstations
} from 'src/shared/routes/categoriesRoutes';
import {computersSrc, notebooksSrc, tabletsSrc, workstationsSrc} from 'src/img/index';

export const categoriesTeasersData: Array<ICategoriesTeasersData> = [
  {
    title: CategoryNameComputers,
    text: CategoryIntroComputers,
    img: computersSrc,
    path: pathCategoryComputers,
    linkTitle: HomePageComputersBtnTitle,
  },
  {
    title: CategoryNameNotebooks,
    text: CategoryIntroNotebooks,
    img: notebooksSrc,
    path: pathCategoryNotebooks,
    linkTitle: HomePageNotebooksBtnTitle,
  },
  {
    title: CategoryNameTablets,
    text: CategoryIntroTablets,
    img: tabletsSrc,
    path: pathCategoryTablets,
    linkTitle: HomePageTabletsBtnTitle,
  },
  {
    title: CategoryNameWorkstations,
    text: CategoryIntroWorkstations,
    img: workstationsSrc,
    path: pathCategoryWorkstations,
    linkTitle: HomePageWorkstationsBtnTitle,
  },
];
