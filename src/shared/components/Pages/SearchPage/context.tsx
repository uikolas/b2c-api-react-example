import * as React from 'react';
import {TCategoryId} from "src/shared/interfaces/serach/index";

type TSearchPageContext = {
  selectCategoryHandler: (categoryId: TCategoryId) => any;
};

export const SearchPageContext = React.createContext<TSearchPageContext>({
  selectCategoryHandler: (categoryId: TCategoryId) => {
    throw new Error('selectCategoryHandler() not implemented');
  },
});
