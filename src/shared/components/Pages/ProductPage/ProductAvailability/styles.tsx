import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit,
  },
  value: {
    display: 'block',
    fontSize: '11px',
    lineHeight: '15px',
    textTransform: 'uppercase',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: 7
  },
  available: {
    borderColor: theme.appColors.green,
    color: theme.appColors.green,
  },
  unavailable: {
    borderColor: theme.appColors.grey,
    color: theme.appColors.grey,
  },
});
