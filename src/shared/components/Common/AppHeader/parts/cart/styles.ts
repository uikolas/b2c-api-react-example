import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  badge: {
    transition: 'transform .3s ease-in-out',
    background: theme.appColors.blue,
    width: 'auto',
    minWidth: 18,
    right: 'auto',
    left: '100%',
    padding: theme.spacing.unit / 2,
    height: 18,
    fontSize: theme.appFixedDimensions.fontSize.mini,
    lineHeight: '14px',
  },
  badgeCartOpen: {

  },
  hideBadge: {
    transform: 'scale(0)',
  },
  cartNotification: {
    top: '70px',
    right: '21px',
  },
  popover: {
    "& > :first-child": {
      position: "absolute",
    },
  },
  cartContent: {
    top: "0 !important",
    maxHeight: theme.appFixedDimensions.cartDrop.height,
    overflow: "visible",
    borderRadius: 0,
  },
  cartFlyOutOpen: {
    position: "relative",

    '&:before, &:after': {
      content: '""',
      zIndex: 1,
      display: "block",
      width: 0,
      height: 0,
      borderStyle: "solid",
      borderWidth: `0 ${theme.appFixedDimensions.cartDrop.triangle}px 
                    ${theme.appFixedDimensions.cartDrop.triangle}px 
                    ${theme.appFixedDimensions.cartDrop.triangle}px`,
      position: "absolute",
      right: 57,
      [theme.breakpoints.down(theme.appFixedDimensions.customBreakpoints.tablet)]: {
        right: 23,
      },
      [theme.breakpoints.down(theme.appFixedDimensions.customBreakpoints.smallTablet)]: {
        display: "none",
      },
    },

    "&:after": {
      borderColor: `transparent transparent ${theme.appColors.white} transparent`,
      top: -(theme.appFixedDimensions.cartDrop.triangle - 1),
    },
    "&:before": {
      borderColor: `transparent transparent ${theme.appColors.weakGrey} transparent`,
      top: -theme.appFixedDimensions.cartDrop.triangle,
      [theme.breakpoints.down(theme.appFixedDimensions.customBreakpoints.tablet)]: {
        right: 23,
      },
    },
  },
});
