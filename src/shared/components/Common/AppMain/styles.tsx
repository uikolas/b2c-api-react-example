import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  layout: {
    ...theme.appContainerStyles,
    marginTop: `calc(${theme.appFixedDimensions.headerHeight}px + ${theme.spacing.unit * 4}px)`,
  },
  container: {
    position: 'relative',
    paddingTop: theme.spacing.unit * 6,
  },
});
