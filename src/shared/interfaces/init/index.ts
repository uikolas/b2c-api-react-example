import { TAppPriceMode } from 'src/shared/interfaces/product';
import { TAppCurrency } from 'src/shared/interfaces/currency';
import { TAppStore } from 'src/shared/interfaces/store';
import { TAppLocale, TAppTimeZone } from 'src/shared/interfaces/locale/index';
import { ICategory } from 'src/shared/interfaces/category';
import { ICountry } from 'src/shared/interfaces/country';

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
