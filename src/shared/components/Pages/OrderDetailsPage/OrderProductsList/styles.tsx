import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    borderBottom: `1px solid ${theme.palette.grey.A100}`,
    paddingLeft: theme.spacing.unit,
  },
  title: {
    borderBottom: `1px solid ${theme.palette.grey.A100}`,
    paddingBottom: theme.spacing.unit * 2,
  },
  tableOuter: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
});
