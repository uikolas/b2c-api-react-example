import { ICurrencyItem } from 'src/interfaces/currency/index';
import { ILocaleItem } from 'src/interfaces/locale/index';
import { ICountry } from 'src/interfaces/country/index';

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
    countries: ICountry[];
    currencies: ICurrencyItem[];
    defaultCurrency: string;
    locales: ILocaleItem[];
    timeZone: string;
}
