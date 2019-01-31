import {
    FilterValue,
    ILocalizedNamesMap,
    ISearchPageData,
    RangeFacets,
    ValueFacets
} from 'src/shared/interfaces/searchPageData';
import { rangeFilterValueToFront } from 'src/shared/helpers/common/transform';
import {
    rangeMaxType,
    rangeMinType,
    RangeType,
    TActiveRangeFilters
} from 'src/shared/components/Pages/SearchPage/types';
import { IActiveFilterCategories } from 'src/shared/components/Pages/SearchPage/CategoriesList/types';
import { labeledCategories } from 'src/shared/routes/categoriesRoutes';
import { ICategory, ICategoryForBreadcrumbs } from 'src/shared/interfaces/category/index';

export const isValidRangeInput = (
    activeRanges: TActiveRangeFilters,
    defaultRanges: ISearchPageData['rangeFilters']
): boolean => {
    const activeData: { [key: string]: RangeType } = {...activeRanges};
    const defaultData = [...defaultRanges];
    let canMakeNewRequest: boolean = true;

    defaultData.forEach((filter: RangeFacets) => {
        if (activeData[filter.name]) {
            const defaultMin = rangeFilterValueToFront(filter.min, rangeMinType);
            const defaultMax = rangeFilterValueToFront(filter.max, rangeMaxType);

            for (const prop in activeData[filter.name]) {
                if (activeData[filter.name][prop] < defaultMin
                    || activeData[filter.name][prop] > defaultMax
                ) {
                    canMakeNewRequest = false;
                }
            }
        }
    });

    return canMakeNewRequest;
};

export const getFormattedActiveCategories = (data: FilterValue[]): IActiveFilterCategories | null => {
    if (!Array.isArray(data) || !data.length) {
        return null;
    }

    const response: IActiveFilterCategories = {};

    data.forEach((item: FilterValue) => {
        response[item.value] = item.doc_count;
    });

    return response;
};

export const getRangeFiltersLocalizedNames = (data: RangeFacets[] | null): ILocalizedNamesMap | null => {
    if (!Array.isArray(data) || !data.length) {
        return null;
    }

    const response: ILocalizedNamesMap = {};

    data.forEach((item: RangeFacets) => {
        response[item.name] = item.localizedName;
    });

    return response;
};

export const getFiltersLocalizedNames = (data: ValueFacets[] | null): ILocalizedNamesMap | null => {
    if (!Array.isArray(data) || !data.length) {
        return null;
    }

    const response: ILocalizedNamesMap = {};

    data.forEach((item: ValueFacets) => {
        response[item.name] = item.localizedName;
    });

    return response;
};

export const getLabeledCategory = (category: string | number): string | null => {
    if (!category) {
        return null;
    }

    const labelValue = labeledCategories[category];

    if (!labelValue) {
        return null;
    }

    return labelValue;
};

export const getCurrentCategoriesTree = (
    categiesTree: ICategory[],
    categoryId: string): ICategoryForBreadcrumbs[] | null => {

    if (!categoryId) {
        return null;
    }

    for (let i = 0; i < categiesTree.length; i++) {
        if (categiesTree[i].nodeId.toString() === categoryId) {
            return [{
                name: categiesTree[i].name,
                nodeId: categiesTree[i].nodeId,
                current: true
            }];
        }

        const arrayCategoryParents = getCurrentCategoriesTree(categiesTree[i].children as ICategory[], categoryId);

        if (arrayCategoryParents != null) {
            arrayCategoryParents.unshift({
                name: categiesTree[i].name,
                nodeId: categiesTree[i].nodeId
            });

            return arrayCategoryParents;
        }
    }
};
