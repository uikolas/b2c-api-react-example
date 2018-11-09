import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const fieldStyles = (theme: Theme) => createStyles({
  root: {},
  textField: {},
  menu: {},
  label: {
    position: 'absolute',
    color: theme.appColors.black,
    top: -theme.spacing.unit * 2.5,
    left: "0%",
    width: '100%',
  },
  input: {
    height: "auto",
    lineHeight: "normal",
    letterSpacing: 0.5,
    color: theme.appColors.black,
    fontSize: theme.appFixedDimensions.fontSize.small,
    padding: 0,
    fontWeight: 600,
    [theme.breakpoints.down('sm')]: {
      width: 100,
    },
  },
  btnSubmitOuter: {},
  error: {
    color: theme.palette.error.main,
  },
});
