import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';
import {appTypographyStyles} from "src/shared/theme/properties/overwritten/appTypography";

export const styles = (theme: Theme) => createStyles({
  userDrop: {
    ...appTypographyStyles,
    width: theme.appFixedDimensions.userDrop.width,
    padding: theme.spacing.unit * 3,
    borderBottom: `1px solid ${theme.appColors.weakGrey}`,
    borderLeft: `1px solid ${theme.appColors.weakGrey}`,
    borderRight: `1px solid ${theme.appColors.weakGrey}`,
  },
  title: {
    fontSize: '20px',
    lineHeight: '24px',
    fontWeight: 'bold',
    color: theme.appColors.black,
    letterSpacing: '-.5px',
    margin: '0 0 10px',
    borderBottom: '1px solid #d8d8d8',
    paddingBottom: 10,
    '& strong': {
      fontWeight: 400,
    },
  },
  userDropNav: {
    listStyle: 'none',
    margin: 0,
    padding: '24px 0',
    '& li': {
      marginBottom: 10,
    },
    '& a': {
      color: theme.appColors.black,
      textDecoration: 'none',
      '&:hover': {
        color: theme.appColors.blue
      }
    },
  },
  userBtns: {
    ...appTypographyStyles,
    display: 'flex',
    '& a': {
      flex: 1,
      '&:not(:last-child)': {
        marginRight: 12,
      },
    },
  },
  userContent: {

  },
  popoverTriangle: {
    '&:before, &:after': {
      right: 114,
      [theme.breakpoints.down(theme.appFixedDimensions.customBreakpoints.tablet)]: {
        right: 63,
      },
    }
  },
});
