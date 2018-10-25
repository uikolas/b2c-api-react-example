import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {

  },
  title: {
    fontSize: theme.appFixedDimensions.fontSize.medium,
    fontWeight: "bold",
    letterSpacing: 0.6,
    marginBottom: theme.spacing.unit * 2,
  },
  filter: {

  },
});
