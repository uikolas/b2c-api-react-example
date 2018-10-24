
type TAppColor = React.CSSProperties['color'];

export interface IAppColors {
  white: TAppColor;
  black: TAppColor;
  grey: TAppColor;
  lightGrey: TAppColor;

  oldPrice: TAppColor;
  saleLabel: TAppColor;
  newLabel: TAppColor;
}

export const appColors: IAppColors = {
  white: "#ffffff",
  black: "#111111",
  grey: "#787878",
  lightGrey: "#f2f2f2",

  oldPrice: "#787878",
  saleLabel: "#3589ea",
  newLabel: "#ea7a35",
};
