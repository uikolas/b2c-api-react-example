import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ILocaleActionPayload } from '@stores/reducers/common/Init/types';
import { TAppLocale } from 'src/shared/interfaces/locale/index';

export type TLanguage = {
    name: React.ReactNode,
    code: TAppLocale,
};

export interface ILangProps extends WithStyles<typeof styles> {
    appLocale: TAppLocale;
    switchLocaleAction: (payload: ILocaleActionPayload) => void;
}

export interface ILangState {
    anchorEl: HTMLElement | null;
}
