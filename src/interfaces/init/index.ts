import { TAppPriceMode } from 'src/interfaces/product/index';
import { TAppCurrency } from 'src/interfaces/currency/index';
import { TAppStore } from 'src/interfaces/store/index';
import { TAppLocale, TAppTimeZone } from 'src/interfaces/locale/index';
import { ICategory } from 'src/interfaces/category/index';
import { ICountry } from 'src/interfaces/country/index';

export interface IInitData {
    ok?: boolean;
    priceMode: TAppPriceMode;
    currency: TAppCurrency;
    store: TAppStore;
    locale: TAppLocale;
    timeZone: TAppTimeZone;
    categoriesTree?: ICategory[];
    countries?: ICountry[];
    anonymId?: string;
}
