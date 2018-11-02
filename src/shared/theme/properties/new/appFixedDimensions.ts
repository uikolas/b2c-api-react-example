import {GridSpacing} from "@material-ui/core/Grid";
import {baseTheme} from "src/shared/theme/index";

export interface IAppFixedDimensions {
  headerHeight: React.CSSProperties['height'];
  card: {
    actionAreaWidth: React.CSSProperties['width'];
    actionAreaHeight: React.CSSProperties['height'];
  };
  borderRadius: React.CSSProperties['borderRadius'];
  gridSpacing: GridSpacing;
  fontSize: {
    mini: React.CSSProperties['fontSize'];
    small: React.CSSProperties['fontSize'];
    medium: React.CSSProperties['fontSize'];
    large: React.CSSProperties['fontSize'];
    big: React.CSSProperties['fontSize'];
  };
}

export const appFixedDimensions: IAppFixedDimensions = {
  headerHeight: 65,
  card: {
    actionAreaWidth: 282,
    actionAreaHeight: 428,
  },
  borderRadius: 4,
  gridSpacing: 24,
  fontSize: {
    mini: "0.69rem",
    small: "0.875rem",
    medium: "1.0rem",
    large: "1.13rem",
    big: "1.25rem",
  },

};
