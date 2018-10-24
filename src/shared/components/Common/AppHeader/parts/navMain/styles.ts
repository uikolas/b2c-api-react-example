import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  mainNav: {
    textTransform: 'uppercase',
  },
  mainNavLink: {
    color: theme.appColors.black,
    marginRight: 32,
    textDecoration: 'none',
    '&:hover': {
      color: theme.appColors.saleLabel,
    },
  },
});
