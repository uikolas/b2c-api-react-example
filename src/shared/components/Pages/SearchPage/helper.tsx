import {FilterValue, ISearchPageData, RangeFacets} from 'src/shared/interfaces/searchPageData';
import { rangeFilterValueToFront } from 'src/shared/helpers/common/transform';
import { rangeMaxType, rangeMinType, TActiveRangeFilters } from 'src/shared/components/Pages/SearchPage/types';
import {IActiveFilterCategories} from "src/shared/components/Pages/SearchPage/CategoriesList/types";

export const isValidRangeInput = (activeRanges: TActiveRangeFilters,
                                  defaultRanges: ISearchPageData['rangeFilters']): boolean => {
  const activeData: {[key: string]: any} = {...activeRanges};
  const defaultData = [...defaultRanges];
  let canMakeNewRequest: boolean = true;

  defaultData.forEach((filter: RangeFacets) => {
    if (activeData[filter.name]) {
      const defaultMin = rangeFilterValueToFront(filter.min, rangeMinType);
      const defaultMax = rangeFilterValueToFront(filter.max, rangeMaxType);

      for (let prop in activeData[filter.name]) {
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

export const getFormattedActiveCategories = (data: Array<FilterValue>): IActiveFilterCategories | null => {
  if (!Array.isArray(data) || !data.length) {
    return null;
  }
  const response: IActiveFilterCategories = {};
  data.forEach((item: FilterValue) => {
    response[item.value] = item.doc_count;
  });
  return response;
};
