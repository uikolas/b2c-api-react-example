import { IInitData } from 'src/shared/interfaces/init/index';
import { ICategory } from 'src/shared/interfaces/category/index';
import { IActionData, IReduxState } from '@stores/reducers/types';
import { TAppLocale } from 'src/shared/interfaces/locale';

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
