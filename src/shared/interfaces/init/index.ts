import {TAppPriceMode} from "src/shared/interfaces/product/index";
import {TAppCurrency} from "src/shared/interfaces/currency/index";
import {TAppStore} from "src/shared/interfaces/store/index";
import {TAppLocale, TAppTimeZone} from "src/shared/interfaces/locale";
import {ICategory} from "src/shared/interfaces/category";
import {ICountry} from "src/shared/interfaces/country/index";

export interface IInitData {
  ok?: boolean;
  priceMode: TAppPriceMode;
  currency: TAppCurrency;
  store: TAppStore;
  locale: TAppLocale;
  timeZone: TAppTimeZone;
  categoriesTree?: Array<ICategory>;
  countries?: Array<ICountry>;
  anonymId?: string;
}
