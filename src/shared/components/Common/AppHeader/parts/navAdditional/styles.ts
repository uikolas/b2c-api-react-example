import createStyles from '@material-ui/core/styles/createStyles';
import { Theme } from '@material-ui/core/styles/createMuiTheme';

export const styles = (theme: Theme) => createStyles({
  addNavContainer: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
      position: 'relative',
      zIndex: 11,
    },
  },
  addNavItem: {
    '&:not(:first-child)': {
      marginLeft: 8,
    }
  }
});
