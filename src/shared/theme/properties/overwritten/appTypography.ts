export interface IAppTypography {
  fontFamily: React.CSSProperties['fontFamily'];
}

export const appTypographyStyles: IAppTypography = {
  fontFamily: [
    'Lato',
    'Segoe UI',
    'Roboto',
  ].join(','),
};
