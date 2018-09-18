import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    borderBottom: `1px solid ${theme.palette.grey.A100}`,
    paddingBottom: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit,
  },

});
