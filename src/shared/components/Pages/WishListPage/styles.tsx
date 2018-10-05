import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  paperContainer: {
    width: '70%',
    marginTop: theme.spacing.unit * 4,
  },
  newList: {
    width: '75%',
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  icons: {
    color: theme.palette.primary.light,
  },
  headerCell: {
    color: theme.palette.common.black,
    fontSize: '0.85rem',
  }
});
