import {GridSpacing} from "@material-ui/core/Grid";
import {baseTheme} from "src/shared/theme";

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
    huge: React.CSSProperties['fontSize'];
    xl: React.CSSProperties['fontSize'];
    xxxl: React.CSSProperties['fontSize'];
  };
  customBreakpoints: {
    tablet: number;
  };
  customerSubPageWidth: React.CSSProperties['width'];
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
    small: "0.875rem", // 14px
    medium: "1.0rem", // 16px
    large: "1.13rem",
    big: "1.25rem", // 20px
    huge: "1.45rem", // 24px
    xl: "2.0rem", // 32px
    xxxl: "3.5rem", // 56px
  },
  customBreakpoints: {
    tablet: 1280,
  },
  customerSubPageWidth: 740,
};
