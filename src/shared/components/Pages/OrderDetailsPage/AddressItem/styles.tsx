import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';


export const styles = (theme: Theme) => createStyles({
  root: {
    marginTop: theme.spacing.unit * 1.5
  },
  container: {

  },
  title: {
    fontSize: theme.appFixedDimensions.fontSize.big,
    fontWeight: "normal",
  },
});
