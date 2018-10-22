import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  layout: {
    width: theme.appContainerWidth,
    marginTop: `calc(${65}px + ${theme.spacing.unit * 4}px)`,
    marginLeft: "auto",
    marginRight: "auto",
    position: 'relative',
  },
  container: {
    position: 'relative',
    paddingTop: theme.spacing.unit * 6,
  },
});
