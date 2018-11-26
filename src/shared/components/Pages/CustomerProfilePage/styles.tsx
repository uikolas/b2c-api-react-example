import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const pageStyles = (theme: Theme) => createStyles({
  pageHeader: {
    color: theme.appColors.black,
    fontSize: '32px',
    lineHeight: 1.13,
    letterSpacing: -0.8,
    marginBottom: theme.spacing.unit * 2,
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
  form: {
    marginBottom: theme.spacing.unit * 4,
    marginTop: theme.spacing.unit * 1.5,
  },
  input: {},
  button: {
    marginTop: theme.spacing.unit * 2.5,
  },
});
