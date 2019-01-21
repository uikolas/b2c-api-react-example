import { getCategoriesTree, ICategory } from '@stores/reducers/common/init';
import { reduxify } from 'src/shared/lib/redux-helper';

const mapStateToProps = (state: any, ownProps: any) => {
  const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);

  return ({categoriesTree});
};

export const connect = reduxify(mapStateToProps);
