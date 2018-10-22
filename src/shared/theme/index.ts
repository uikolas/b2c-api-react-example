import { createMuiTheme } from '@material-ui/core/styles';
import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import { Theme } from '@material-ui/core/styles/createMuiTheme';
import {IAppContainerStyles} from "./properties/new/appContainerStyles";
import {IAppTypography} from "./properties/overwritten/appTypography";
import {IAppFixedDimensions} from "./properties/new/appFixedDimensions";
import {IAppColors} from "./properties/new/appColors";

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appContainerStyles: IAppContainerStyles;
    appFixedDimensions: IAppFixedDimensions;
    appColors: IAppColors;
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appContainerStyles?: IAppContainerStyles;
    appFixedDimensions?: IAppFixedDimensions;
    appColors?: IAppColors;
  }

  interface TypographyOptions {
    typography?: IAppTypography;
  }
}

export function createSprykerTheme(options: ThemeOptions) {
  return createMuiTheme({
    ...options,
  });
}

