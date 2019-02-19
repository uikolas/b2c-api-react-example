import { getAppLocale, getCategoriesTree } from '@stores/reducers/common/init';
import { reduxify } from 'src/application/hoc/Reduxify';
import { IReduxOwnProps, IReduxStore } from 'src/stores/reducers/types';
import { ICategory } from 'src/interfaces/category';

const mapStateToProps = (state: IReduxStore, ownProps: IReduxOwnProps) => {
    const categoriesTree: ICategory[] = getCategoriesTree(state, ownProps);
    const locale = getAppLocale(state, ownProps);

    return ({ categoriesTree, locale });
};

export const connect = reduxify(mapStateToProps);
