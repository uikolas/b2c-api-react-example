import {ICategoriesTeasersData} from "src/shared/components/Pages/HomePage/types";
import {
  CategoryIntroComputers,
  CategoryIntroNotebooks,
  CategoryIntroTablets,
  CategoryIntroWorkstations,
  CategoryNameComputers,
  CategoryNameNotebooks,
  CategoryNameTablets,
  CategoryNameWorkstations
} from "src/shared/constants/categories";
import {HomePageCategoryBtnText} from "src/shared/constants/content/homePage";
import {
  pathCategoryComputers,
  pathCategoryNotebooks,
  pathCategoryTablets,
  pathCategoryWorkstations
} from "src/shared/routes/categoriesRoutes";

export const categoriesTeasers: Array<ICategoriesTeasersData> = [
  {
    title: CategoryNameComputers,
    text: CategoryIntroComputers,
    img: 'ddd',
    path: pathCategoryComputers,
    linkTitle: `${HomePageCategoryBtnText} ${CategoryNameComputers}`,
  },
  {
    title: CategoryNameNotebooks,
    text: CategoryIntroNotebooks,
    img: 'dddd',
    path: pathCategoryNotebooks,
    linkTitle: `${HomePageCategoryBtnText} ${CategoryNameNotebooks}`,
  },
  {
    title: CategoryNameWorkstations,
    text: CategoryIntroWorkstations,
    img: 'fdfdf',
    path: pathCategoryWorkstations,
    linkTitle: `${HomePageCategoryBtnText} ${CategoryNameWorkstations}`,
  },
  {
    title: CategoryNameTablets,
    text: CategoryIntroTablets,
    img: 'dfdf',
    path: pathCategoryTablets,
    linkTitle: `${HomePageCategoryBtnText} ${CategoryNameTablets}`,
  },
];
