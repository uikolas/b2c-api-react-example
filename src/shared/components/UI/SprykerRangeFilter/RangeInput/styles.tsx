import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  title: {
    lineHeight: "normal",
    letterSpacing: 0.5,
    height: "auto",
    paddingRight: theme.spacing.unit * 1.5,
  },
  value: {
    height: "auto",
    lineHeight: "normal",
    letterSpacing: 0.5,
    fontSize: theme.appFixedDimensions.fontSize.small,
    padding: 0,
    fontWeight: 600,
  }
});
