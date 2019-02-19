import { TAppPriceMode } from 'src/interfaces/product';
import { TAppCurrency } from 'src/interfaces/currency';
import { TAppStore } from 'src/interfaces/store';
import { TAppLocale, TAppTimeZone } from 'src/interfaces/locale';
import { ICategory } from 'src/interfaces/category';
import { ICountry } from 'src/interfaces/country';

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
