import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {

  },
  selected: {
    ...theme.appModules.selectedItem,
  },
  icon: {
    transform: "rotate(270deg)",
    transition: "transform .8s ease-in-out",
    fill: theme.appColors.black,
    right: theme.spacing.unit / 2,
  },
  input: {
    fontSize: theme.appFixedDimensions.fontSize.small,
    lineHeight: "normal",
    letterSpacing: 0.5,
    paddingLeft: theme.spacing.unit * 1.5,
    paddingTop: theme.spacing.unit * 1.5,
    paddingBottom: theme.spacing.unit * 1.5,
  },
  menuItem: {

  },
  title: {

  },
});
