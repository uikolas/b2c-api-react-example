import { getCategoriesTree, ICategory } from 'src/shared/reducers/Common/Init/Init';
import { reduxify } from 'src/shared/lib/redux-helper';
import {IReduxOwnProps, IReduxStore} from "src/shared/reducers/types";

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
  const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);

  return ({categoriesTree});
};

export const connect = reduxify(mapStateToProps);
