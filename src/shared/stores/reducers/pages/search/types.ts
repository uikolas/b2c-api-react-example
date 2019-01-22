import { IReduxState } from 'src/typings/app';
import {
  FlyoutSearch, ICatalogSearchDataParsed, ISearchPageData,
  ISearchTermData
} from 'src/shared/interfaces/searchPageData/index';
import {IActionData} from "src/shared/stores/reducers/types";


export interface ISearchState extends IReduxState {
  data: ISearchPageData;
}

export interface IPageSearchAction extends IActionData {
  payloadSearchFulfilled?: ICatalogSearchDataParsed;
  payloadSuggestionFulfilled?: FlyoutSearch;
  payloadSearchTermFulfilled?: ISearchTermData;
}
