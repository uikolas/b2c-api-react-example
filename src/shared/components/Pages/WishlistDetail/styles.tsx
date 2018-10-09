import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  paperContainer: {
    width: '70%',
    marginTop: theme.spacing.unit * 4,
  },
  headerCell: {
    color: theme.palette.common.black,
    fontSize: '0.85rem',
  },
  vertical: {
    display: 'flex',
    flexDirection: 'column',
  },
  name: {
    fontSize: '0.9rem',
    color: theme.palette.primary.main,
    cursor: 'pointer',
  },
  attributes: {
    textTransform: 'capitalize',
  }
});
