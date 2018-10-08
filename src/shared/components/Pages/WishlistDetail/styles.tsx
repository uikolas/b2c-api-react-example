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
    alignItems: 'center'
  }
});
