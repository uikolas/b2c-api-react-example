import {Theme} from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {},
  contentHelper: {
    [theme.breakpoints.up('lg')]: {
      width: '98.7vw',
      position: 'relative',
      left: '50%',
      transform: 'translateX(-50%)',
    },
    background: '#f8f8f8',
    padding: '12vmin 2vmin',
  },
  contentContainer: {
    fontSize: theme.appFixedDimensions.fontSize.medium,
    color: theme.appColors.black,
    ...theme.appContainerStyles,
  },
  productDetailsBlock: {
    maxWidth: 435,
    marginRight: "auto",
  },
  descriptionBlock: {
    maxWidth: 435,
    marginLeft: "auto",
  },
  descriptionTitle: {
    fontSize: 34,
    margin: '0 0 38px',
  },
  descriptionSku: {
    fontSize: theme.appFixedDimensions.fontSize.small,
    color: theme.appColors.grey,
    textTransform: 'uppercase',
    paddingTop: 25,
  },
});
