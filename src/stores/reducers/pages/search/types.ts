import { IActionData, IReduxState } from '@stores/reducers/types';
import { FlyoutSearch, ICatalogSearchDataParsed, ISearchPageData } from 'src/interfaces/searchPageData/index';

export interface ISearchState extends IReduxState {
    data: ISearchPageData;
}

export interface IPageSearchAction extends IActionData {
    payloadSearchFulfilled?: ICatalogSearchDataParsed;
    payloadSuggestionFulfilled?: FlyoutSearch;
}
