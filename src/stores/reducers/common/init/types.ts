import { IInitData } from 'src/interfaces/init';
import { ICategory } from 'src/interfaces/category';
import { IActionData, IReduxState } from '@stores/reducers/types';
import { TAppLocale } from 'src/interfaces/locale';

export interface IInitState extends IReduxState {
    data: IInitData | null;
}

export interface IInitAction extends IActionData {
    payloadInitFulfilled?: IInitData;
    payloadCategoriesTreeFulfilled?: {categories: ICategory[]};
    payloadLocaleFulfilled?: ILocaleActionPayload;
}

export interface ILocaleActionPayload {
    locale: TAppLocale;
}
