import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  categoryItem: {
    paddingTop: 0,
    paddingBottom: 0,
  },
  categoryItemText: {
    lineHeight: 2.29,
    letterSpacing: 0.4,
    fontSize: theme.appFixedDimensions.fontSize.small,
  },
});
