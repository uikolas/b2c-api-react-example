import { getCategoriesTree } from 'src/shared/reducers/Common/Init/index';
import { reduxify } from 'src/shared/lib/redux-helper';
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";
import {ICategory} from "src/shared/interfaces/category/index";

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
  const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);

  return ({categoriesTree});
};

export const connect = reduxify(mapStateToProps);
