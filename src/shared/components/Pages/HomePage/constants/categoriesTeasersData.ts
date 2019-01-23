import {ICategoriesTeasersData} from 'src/shared/components/Pages/HomePage/types';
import {
  CategoryIntroComputers,
  CategoryIntroNotebooks,
  CategoryIntroTablets,
  CategoryIntroWorkstations
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
    title: 'category.name.computers',
    text: CategoryIntroComputers,
    img: computersSrc,
    path: pathCategoryComputers,
    linkTitle: HomePageComputersBtnTitle,
  },
  {
    title: 'category.name.notebooks',
    text: CategoryIntroNotebooks,
    img: notebooksSrc,
    path: pathCategoryNotebooks,
    linkTitle: HomePageNotebooksBtnTitle,
  },
  {
    title: 'category.name.tablets',
    text: CategoryIntroTablets,
    img: tabletsSrc,
    path: pathCategoryTablets,
    linkTitle: HomePageTabletsBtnTitle,
  },
  {
    title: 'category.name.workstations',
    text: CategoryIntroWorkstations,
    img: workstationsSrc,
    path: pathCategoryWorkstations,
    linkTitle: HomePageWorkstationsBtnTitle,
  },
];
