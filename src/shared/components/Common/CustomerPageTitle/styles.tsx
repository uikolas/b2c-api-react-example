import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  pageHeader: {
    color: theme.appColors.black,
    fontSize: theme.appFixedDimensions.fontSize.xl,
    lineHeight: 1.13,
    letterSpacing: -0.8,
    paddingBottom: theme.spacing.unit * 2,
    textTransform: 'capitalize',
    borderBottom: `1px solid ${theme.appColors.blockDivider}`
  },
});
