import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const sprykerFormStyles = (theme: Theme) => createStyles({
  form: {
    paddingBottom: theme.spacing.unit * 1.5,
    paddingTop: theme.spacing.unit * 1.5,
  },
  controlsGroup: {
    paddingBottom: theme.spacing.unit * 1.5,
    paddingTop: theme.spacing.unit * 2.5,
  },
  control: {
    paddingLeft: theme.spacing.unit * 1.5,
    paddingRight: 0,

    "&:first-child": {
      paddingRight: theme.spacing.unit * 1.5,
      paddingLeft: 0,
    },
  },
  root: {},
  textField: {
    marginBottom: 0,
    marginTop: 0,
  },
  menu: {},
  label: {
    position: 'relative',
    paddingBottom: theme.spacing.unit,
    color: theme.appColors.black,
    top: "auto",
    left: "auto",
    width: '100%',
    fontWeight: 600,
  },
  labelCheckbox: {
    paddingBottom: 0,
  },
  inputRoot: {

    "label + &": {
      marginTop: 0,
    }
  },
  input: {
    borderRadius: theme.appFixedDimensions.borderRadius,
    border: `solid 1px ${theme.appColors.weakGrey}`,
    backgroundColor: theme.appColors.white,
    padding: theme.spacing.unit * 1.5,
    width: '100%',
    height: "auto",
    lineHeight: "normal",
    letterSpacing: 0.5,
    color: theme.appColors.black,
    fontSize: theme.appFixedDimensions.fontSize.small,
    fontWeight: "normal",
    [theme.breakpoints.down('sm')]: {
      width: 100,
    },

    "&:focus": {
      border: `solid 1px ${theme.appColors.blue}`,
    },
  },
  inputCheckbox: {
    padding: theme.spacing.unit,
    paddingLeft: 0,
    borderRadius: theme.appFixedDimensions.borderRadius,
    color: theme.appColors.weakGrey,
    "& svg": {
      fontSize: 30,
    }
  },
  outerCheckbox: {
    marginLeft: 0,
  },
  selectRoot: {
    paddingLeft: 0,
    display: "flex",
  },
  selectClassName: {

  },
  selectFormControlClassName: {
    display: "flex",
    flexDirection: "column",
  },
  selectInputRootClassName: {
    width: '100%',
  },
  selectLabel: {
    display: "flex",
  },
  selectInputRoot: {
    display: "flex",
  },
  menuItemClassName: {
  },
  btnSubmitOuter: {},
  error: {
    color: theme.palette.error.main,
  },
});
