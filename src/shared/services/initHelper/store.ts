import {IInitData} from "../../reducers/Common/Init";
import {APP_LOCALE_DEFAULT, PRICE_MODE_DEFAULT} from "../../constants/Environment/index";

export const parseStoreResponse = (data: any): IInitData => {

  const result: IInitData = {
    priceMode: null,
    currency: null,
    store: null,
    locale: null,
  };

  if (!data.data[0].attributes) {
    return result;
  }
  const attributes = data.data[0].attributes;
  result.store = data.data[0].id;
  result.currency = attributes.defaultCurrency;
  result.priceMode = PRICE_MODE_DEFAULT;

  attributes.locales.forEach((row: any) => {
    row.code === result.store.toLowerCase() ? result.locale = row.code : 'fr';
  });

  return result;
};
