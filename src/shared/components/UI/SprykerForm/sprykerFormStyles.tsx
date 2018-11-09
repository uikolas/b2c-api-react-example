import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const sprykerFormStyles = (theme: Theme) => createStyles({
  form: {},
  controlsGroup: {
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
  },
  control: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  }
});
