import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  title: {
    marginTop: theme.spacing.unit * 3,
  },
  root: {
    width: '100%',
    margin: '2%',
  },
  tableWrapper: {},
  table: {},
  delIcon: {
    fontSize: 32,
    color: theme.palette.secondary.light,
  },
  footer: {
    margin: theme.spacing.unit * 3,
  },
});
