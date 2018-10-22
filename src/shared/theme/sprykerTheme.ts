import {createSprykerTheme} from "./index";
import {appContainerStyles} from "./properties/new/appContainerStyles";
import {appPalette} from "./properties/overwritten/appPalette";
import {appTypographyStyles} from "./properties/overwritten/appTypography";
import {appFixedDimensions} from "./properties/new/appFixedDimensions";

export const sprykerTheme = createSprykerTheme({
  // New
  appContainerStyles,
  appFixedDimensions,

  // Overwritten
  palette: appPalette,
  typography: appTypographyStyles,
});
