import * as React from 'react';
import {TCategoryId, TFilterItemName, TFilterItemValue} from "src/shared/components/Pages/SearchPage/types";

type TSearchPageContext = {
  selectCategoryHandler: (categoryId: TCategoryId) => any;
  deleteActiveFilterHandler: (filterName: TFilterItemName, filterValue: TFilterItemValue) => any;
};

export const SearchPageContext = React.createContext<TSearchPageContext>({
  selectCategoryHandler: (categoryId: TCategoryId) => {
    throw new Error('selectCategoryHandler() not implemented');
  },
  deleteActiveFilterHandler: (filterName: TFilterItemName, filterValue: TFilterItemValue) => {
    throw new Error('deleteActiveFilterHandler() not implemented');
  },
});
