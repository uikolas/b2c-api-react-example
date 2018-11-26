import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  button: {
    height: '44px',
    borderRadius: '4px',
    fontSize: '16px',
    letterSpacing: '1.5px',
    fontWeight: 500,
  },
  icon: {
    marginLeft: theme.spacing.unit * 2,
  },
});
