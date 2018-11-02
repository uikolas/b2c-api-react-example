import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    borderBottom: `1px solid ${theme.appColors.blockDivider}`,
    borderTop: `1px solid ${theme.appColors.blockDivider}`,
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 12,
  },
  container: {
    height: "auto",
    position: "relative",
    paddingLeft: 70,
    paddingRight: 70,
  },
  item: {
    width: 70,
    height: 70,
    minWidth: 70,
    maxWidth: 70,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    backgroundColor: theme.appColors.white,
  },
  itemLeft: {
    position: "absolute",
    left: 0,
  },
  itemRight: {
    position: "absolute",
    right: 0,
  },
  label: {
    color: theme.appColors.black,
    fontSize: theme.appFixedDimensions.fontSize.large,
  },
  selected: {
    paddingTop: "0 !important",
    color: theme.appColors.blue,
    fontSize: `${theme.appFixedDimensions.fontSize.large} !important`,
  },
  wrapper: {
    color: theme.appColors.black,
  },
  pagesWrapper: {
    display: "flex",
    justifyContent: "center",
    flexGrow: 1,
  }
});
