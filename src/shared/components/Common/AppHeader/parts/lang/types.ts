import { WithStyles } from '@material-ui/core/styles/withStyles';
import { styles } from './styles';
import {ILocaleActionPayload} from "@stores/reducers/Common/Init/types";
import {TAppLocale} from "src/shared/interfaces/locale/index";

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
