import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {},
  container: {
    justifyContent: "space-between",
  },
  leftColumn: {
    maxWidth: 588,
    [theme.breakpoints.down('sm')]: {
      maxWidth: "100%",
    },
  },
  rightColumn: {
    [theme.breakpoints.down('sm')]: {
      maxWidth: "100%",
    },
  },
  link: {
    color: theme.appColors.black,
    fontWeight: 'bold',
    transition: 'color 0.5s ease-in-out',
    '&:hover': {
      color: theme.appColors.blue
    },
  },
  thank: {
    fontSize: theme.appFixedDimensions.fontSize.small,
    letterSpacing: '0.2px',
    lineHeight: '18px',
    marginTop: theme.spacing.unit * 4,
  },
  order: {
    fontWeight: 'bold',
    marginTop: theme.spacing.unit * 2,
  }
});
