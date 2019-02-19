import { ISearchQuery } from 'src/interfaces/searchPageData';
import { TActiveRangeFilters } from 'src/application/pages/SearchPage/types';

export const addToQueryActiveRangeFilters = (activeRangeFilters: TActiveRangeFilters): ISearchQuery => {
    const query: { [key: string]: number | string } = {};

    Object.keys(activeRangeFilters).forEach((key: string) => {
        query[`${key.includes('price') ? 'price' : key}[min]`] = activeRangeFilters[key].min;
        query[`${key.includes('price') ? 'price' : key}[max]`] = activeRangeFilters[key].max;
    });

    return query;
};
