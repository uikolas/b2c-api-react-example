export interface IAppTypography {
  fontFamily: React.CSSProperties['fontFamily'];
}

export const appTypographyStyles: IAppTypography = {
  fontFamily: [
    'CircularStd',
    'Segoe UI',
    'Roboto',
  ].join(','),
};
