import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  paperContainer: {
    width: '100%',
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
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
  },
});
