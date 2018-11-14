import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  appBar: {
    minHeight: theme.appFixedDimensions.headerHeight,
  },
  layout: {
    ...theme.appContainerStyles,
  },
  button: {
    marginLeft: theme.spacing.unit,
  },
  cartNotification: {
    top: '70px',
    right: '21px',
  },
  preloader: {
    top: '70px',
  },
  customerBtn: {
    margin: theme.spacing.unit,
    width: '44px',
    height: '44px',
  },
});
