import { IReduxState } from 'src/typings/app';
import {
  FlyoutSearch, ICatalogSearchDataParsed, ISearchPageData,
  ISearchTermData
} from 'src/shared/interfaces/searchPageData';
import {IActionData} from "src/shared/reducers/types";


export interface ISearchState extends IReduxState {
  data: ISearchPageData;
}

export interface IPageSearchAction extends IActionData {
  payloadSearchFulfilled?: ICatalogSearchDataParsed;
  payloadSuggestionFulfilled?: FlyoutSearch;
  payloadSearchTermFulfilled?: ISearchTermData;
}
