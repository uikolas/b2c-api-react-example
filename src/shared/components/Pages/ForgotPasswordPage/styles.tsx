import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    width: '75%',
  },
  textField: {
    width: '80%'
  },
  button: {
    margin: theme.spacing.unit,
  },
});
