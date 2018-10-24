
type TAppColor = React.CSSProperties['color'];

export interface IAppColors {
  white: TAppColor;
  black: TAppColor;
  grey: TAppColor;
  lightGrey: TAppColor;
  blue: TAppColor;
  orange: TAppColor;

  blockDivider: TAppColor;
}

export const appColors: IAppColors = {
  white: "#ffffff",
  black: "#111111",
  grey: "#787878",
  lightGrey: "#f2f2f2",
  blue: "#3589ea",
  orange: "#ea7a35",

  blockDivider: "#e2e2e2",
};
