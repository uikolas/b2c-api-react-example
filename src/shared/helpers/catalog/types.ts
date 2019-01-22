
import {IProductCard} from "src/shared/interfaces/product/index";
import {IProductLabelResponse, RangeFacets, ValueFacets} from "src/shared/interfaces/searchPageData/index";

export interface ICatalogSearchRawResponse {
  data: [{
    attributes: {
      abstractProducts: Array<IProductCard> | null,
      pagination: {
        currentItemsPerPage: number,
        currentPage: number,
        maxPage: number,
        numFound: number,
        config: {
          defaultItemsPerPage: number,
          itemsPerPageParameterName: string,
          parameterName: string,
          validItemsPerPageOptions: Array<number>,
        },
      },
      rangeFacets: Array<RangeFacets> | null,
      sort: {
        currentSortOrder: string | null,
        currentSortParam: string | null,
        sortParamLocalizedNames: {[key: string]: string},
        sortParamNames: Array<string> | null,
      },
      spellingSuggestion: string | null,
      valueFacets: Array<ValueFacets> | null,
      id: null | string,
    }
  }];
  included: [IRowCatalogSearchIncludedResponse];
  links: {
    first: string;
    last: string;
    next: string;
    self: string;
  };
}

export interface IRowCatalogSearchIncludedResponse {
  type: string;
  relationships?: {
    "product-labels"?: {
      data: Array<IProductLabelResponse>,
    }
  };
  attributes: {
    isExclusive?: boolean;
    name?: string;
    position?: number;
    frontEndReference?: string;
  };
  id?: string;
}
