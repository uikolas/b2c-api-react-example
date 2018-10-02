import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  title: {
    margin: theme.spacing.unit * 3,
  },
  root: {
    width: '100%',
    margin: '2%',
  },
  tableWrapper: {

  },
  table: {

  },
  delIcon: {
    fontSize: 32,
    color: theme.palette.secondary.light,
  },
  pageHeader: {
    marginBottom: theme.spacing.unit * 2,
  },
  contentBlock: {

  },
});
