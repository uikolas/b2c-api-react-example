import { ICategoriesTeasersData } from 'src/shared/components/Pages/HomePage/types';
import {
    pathCategoryComputers,
    pathCategoryNotebooks,
    pathCategoryTablets,
    pathCategoryWorkstations
} from 'src/shared/routes/categoriesRoutes';
import { computersSrc, notebooksSrc, tabletsSrc, workstationsSrc } from 'src/img/index';

export const categoriesTeasersData: ICategoriesTeasersData[] = [
    {
        title: 'category.name.computers',
        text: 'category.intro.computers',
        img: computersSrc,
        path: pathCategoryComputers,
        linkTitle: 'home.page.computers.button.title',
    },
    {
        title: 'category.name.notebooks',
        text: 'category.intro.notebooks',
        img: notebooksSrc,
        path: pathCategoryNotebooks,
        linkTitle: 'home.page.notebooks.button.title',
    },
    {
        title: 'category.name.tablets',
        text: 'category.intro.tablets',
        img: tabletsSrc,
        path: pathCategoryTablets,
        linkTitle: 'home.page.tablets.button.title',
    },
    {
        title: 'category.name.workstations',
        text: 'category.intro.workstations',
        img: workstationsSrc,
        path: pathCategoryWorkstations,
        linkTitle: 'home.page.workstations.button.title',
    },
];
