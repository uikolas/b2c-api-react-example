import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const pageStyles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    maxWidth: '1400px',
    margin: 'auto',
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  section: {
    borderBottom: `1px solid ${theme.palette.grey.A100}`,
    paddingBottom: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 2,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  sectionTitle: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  textField: {},
  controlsGroup: {
    paddingBottom: theme.spacing.unit,
    paddingTop: theme.spacing.unit,
  },
  control: {
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
  },
  label: {},
  menu: {
    width: 200,
  },
  btnSubmitOuter: {
    textAlign: 'right',
  },
  form: {},
  input: {},
});
