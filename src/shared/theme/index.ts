import { createMuiTheme } from '@material-ui/core/styles';
import {purple} from '@material-ui/core/colors';
import {green} from '@material-ui/core/colors';
import {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";

import { Theme } from '@material-ui/core/styles/createMuiTheme';

declare module '@material-ui/core/styles/createMuiTheme' {
  interface Theme {
    appContainerWidth: React.CSSProperties['width'];
  }

  // allow configuration using `createMuiTheme`
  interface ThemeOptions {
    appContainerWidth?: React.CSSProperties['width'];
  }
}

export function createSprykerTheme(options: ThemeOptions) {
  return createMuiTheme({

    ...options,
  });
}

export const sprykerTheme = createSprykerTheme({
  appContainerWidth: 1200,
  palette: {
    primary: {
      main: '#282c3d',
    },
    secondary: {
      main: '#ededed',
    }
  },
});
