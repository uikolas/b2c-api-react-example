import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const formStyles = (theme: Theme) => createStyles({
  root: {},
  form: {},
  controlsGroup: {
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
  },
  control: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  textField: {},
  menu: {},
  label: {},
  input: {},
  btnSubmitOuter: {},
});
