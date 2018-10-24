import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  footer: {
    background: theme.appColors.lightGrey,
    padding: '64px 0',
  },
  footerContainer: {
    ...theme.appContainerStyles,
  }
});
