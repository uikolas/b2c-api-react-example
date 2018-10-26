import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  label: {
    position: "absolute",
    top: theme.spacing.unit + theme.spacing.unit / 2,
    left: theme.spacing.unit + theme.spacing.unit / 2,
    width: "auto",
    zIndex: 351,
    borderRadius: 2,
    boxShadow: "1px 1px 0 0 rgba(0, 0, 0, 0.08)",
    minWidth: 33,
  },
  labelText: {
    fontSize: theme.appFixedDimensions.fontSize.small,
    color: theme.appColors.white,
    padding: 7,
    letterSpacing: 0.6,
    textAlign: "center",
    lineHeight: 1,
  },
  saleLabel: {
    background: theme.appColors.blue,
  },
  newLabel: {
    background: theme.appColors.orange,
  },
});
