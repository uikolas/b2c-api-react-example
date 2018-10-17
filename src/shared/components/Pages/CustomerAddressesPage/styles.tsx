import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  paperContainer: {
    width: '100%',
    margin: `${theme.spacing.unit * 4}px 0 ${theme.spacing.unit * 2}px ${theme.spacing.unit * 2}px`,
  },
  addButton: {
    margin: theme.spacing.unit * 2,
  },
  customerName: {
    fontWeight: 500,
    fontSize: '0.86rem',
    marginTop: theme.spacing.unit,
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
  },
  addressForm: {
    margin:  `${theme.spacing.unit}px ${theme.spacing.unit * 3}px`,
  },
  textField: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  }
});
