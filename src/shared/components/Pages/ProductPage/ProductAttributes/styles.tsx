import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    display: 'flex',
    width: '100%',
    padding: theme.spacing.unit * 4,
    justifyContent: 'flex-start',
  },
  value: {
    display: 'inline',
  },
  element: {
    paddingBottom: theme.spacing.unit * 2,
  },
});
