import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  paperContainer: {
    width: '70%',
    marginTop: theme.spacing.unit * 4,
  },
  newList: {
    width: '70%',
    margin: `${theme.spacing.unit * 3}px ${theme.spacing.unit * 2}px`,
  },
  headerCell: {
    color: theme.palette.common.black,
    fontSize: '0.85rem',
  },
  updateCell: {
    display: 'flex'
  }
});
