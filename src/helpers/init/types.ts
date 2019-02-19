import { ICurrencyItem } from 'src/interfaces/currency';
import { ILocaleItem } from 'src/interfaces/locale';
import { ICountry } from 'src/interfaces/country';

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
