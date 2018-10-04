import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  appBar: {
    minHeight: "65px",
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
  cartNotification: {
    top: "70px",
    right: "21px",
  },
  preloader: {
    top: "70px",
  },
});
