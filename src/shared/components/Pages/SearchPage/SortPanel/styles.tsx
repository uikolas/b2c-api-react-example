import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    borderBottom: `1px solid ${theme.appColors.blockDivider}`,
    borderTop: `1px solid ${theme.appColors.blockDivider}`,
    paddingBottom: theme.spacing.unit * 5,
    marginBottom: theme.spacing.unit * 6,
  },
});
