import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    width: '100%',
    marginLeft: 0,
    borderRadius: theme.appFixedDimensions.borderRadius,
    border: `solid 1px ${theme.appColors.weakGrey}`,
    backgroundColor: theme.appColors.white,
    padding: theme.spacing.unit * 1.5,
    fontSize: theme.appFixedDimensions.fontSize.small,
  },
  button: {
    display: 'block',
    marginLeft: theme.spacing.unit,
    paddingLeft: 0,
    paddingRight: 0,
  },
  chip: {
    margin: theme.spacing.unit / 2,
    display: 'flex',
    justifyContent: 'space-between',
  },
});
