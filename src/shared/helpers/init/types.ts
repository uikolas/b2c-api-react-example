import { ICurrencyItem } from 'src/shared/interfaces/currency';
import { ILocaleItem } from 'src/shared/interfaces/locale';
import { ICountry } from 'src/shared/interfaces/country';

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
