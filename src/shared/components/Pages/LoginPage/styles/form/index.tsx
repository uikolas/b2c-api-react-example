import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    marginTop: theme.spacing.unit*2,
    width: '50%',
    minWidth: '300px',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  input: {
  },
  button: {
    margin: theme.spacing.unit,
    marginTop: theme.spacing.unit * 4,
    width: '100%',
  },
  menu: {
    width: 200,
  },
});
