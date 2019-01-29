import * as React from 'react';
import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import { ILocaleActionPayload } from '@stores/reducers/common/Init/types';
import { TAppLocale } from 'src/shared/interfaces/locale';

export type language = {
    name: React.ReactNode,
    code: TAppLocale,
};

export interface LangProps extends WithStyles<typeof styles> {
    appLocale: TAppLocale;
    switchLocaleAction: (payload: ILocaleActionPayload) => void;
}

export interface LangState {
    anchorEl: HTMLElement | null;
}
