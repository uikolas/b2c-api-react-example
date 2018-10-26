import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: theme.spacing.unit * 6,
  },
  list: {
    paddingTop: theme.spacing.unit,
  },
});
