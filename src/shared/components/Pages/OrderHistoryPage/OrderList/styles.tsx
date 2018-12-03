import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: theme.spacing.unit * 3,
  },
  price: {
    fontWeight: "bold",
  },
  orderBtn: {
    backgroundColor: "transparent",
    color: theme.appColors.black,
    fontSize: theme.appFixedDimensions.fontSize.small,
    letterSpacing: 0.2,
    height: "auto",
    width: "auto",
    border: "none",
    boxShadow: "none",
    marginLeft: theme.spacing.unit * 1.5,
    marginRight: theme.spacing.unit * 1.5,
    textTransform: "none",
    padding: 0,
    "&:hover": {
      backgroundColor: "transparent",
      color: theme.appColors.black,
    }
  },
});
