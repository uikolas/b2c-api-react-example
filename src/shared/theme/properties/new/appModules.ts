import {baseTheme} from "src/shared/theme/index";


export interface IAppModules {
  chip: {
    margin: React.CSSProperties['margin'];
    display: React.CSSProperties['display'];
    justifyContent: React.CSSProperties['justifyContent'];
  };
}

export const appModules: IAppModules = {
  chip: {
    margin: baseTheme.spacing.unit / 2,
    display: 'flex',
    justifyContent: 'space-between',
  }
};
