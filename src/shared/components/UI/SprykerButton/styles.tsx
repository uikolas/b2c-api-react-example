import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
  icon: {
    marginLeft: theme.spacing.unit * 2,
  }
});