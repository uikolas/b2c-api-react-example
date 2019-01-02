import { IInitData } from '../../reducers/Common/Init/Init';
import { PRICE_MODE_DEFAULT } from '../../constants/Environment';
import {ILocaleItem} from "src/shared/interfaces/locale/index";
import {IStoreRawResponse} from "src/shared/helpers/init/types";

export const parseStoreResponse = (data: IStoreRawResponse): IInitData => {

  const result: IInitData = {
    priceMode: null,
    currency: null,
    store: null,
    locale: null,
    timeZone: null,
  };

  if (!data.data[0].attributes) {
    return result;
  }
  const attributes = data.data[0].attributes;
  result.store = data.data[0].id;
  result.currency = attributes.defaultCurrency;
  result.priceMode = PRICE_MODE_DEFAULT;
  result.timeZone = attributes.timeZone;
  result.countries = attributes.countries;

  attributes.locales.forEach((row: ILocaleItem) => {
    row.code === result.store.toLowerCase() ? result.locale = row.code : 'de';
  });
  // For now it's hardcoded. Change if needed
  result.locale = attributes.locales[0].code;

  return result;
};
