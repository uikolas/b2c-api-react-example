import { getCategoriesTree, ICategory } from 'src/shared/reducers/Common/Init';
import { reduxify } from 'src/shared/lib/redux-helper';

const mapStateToProps = (state: any, ownProps: any) => {
  const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);

  return ({categoriesTree});
};

const mapDispatchToProps = (dispatch: Function) => ({dispatch});

export const connect = reduxify(mapStateToProps, mapDispatchToProps);
