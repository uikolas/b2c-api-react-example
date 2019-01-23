import {ICurrencyItem} from "src/shared/interfaces/currency/index";
import {ILocaleItem} from "src/shared/interfaces/locale/index";
import {ICountry} from "src/shared/interfaces/country/index";

export interface IStoreRawResponse {
  data: [{
    attributes: IStoreAttributesRawResponse;
    id: string;
    links: {
      self: string;
    };
    type: string;
  }];
  links: {
    self: string;
  };
}

export interface IStoreAttributesRawResponse {
  countries: Array<ICountry>;
  currencies: Array<ICurrencyItem>;
  defaultCurrency: string;
  locales: Array<ILocaleItem>;
  timeZone: string;
}
