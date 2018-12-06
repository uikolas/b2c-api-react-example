import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    paddingLeft: theme.spacing.unit,
    display: "flex",
    flexGrow: 1,
    justifyContent: "flex-end",
  },
  value: {
    display: 'flex',
    fontSize: theme.appFixedDimensions.fontSize.mini,
    textTransform: 'uppercase',
    borderWidth: '1px',
    borderStyle: 'solid',
    padding: 7,
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
