import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  title: {
    height: '36px',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  root: {
    width: '100%',
    margin: '2%',
  },
  listWrapper: {},
  listItem: {
   // display: 'flex',
    alignItems: "center",
  },
  imgWrapper: {
    width: '129px',
    height: '129px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    marginRight: theme.spacing.unit * 3,
    position: 'relative',
  },
  itemWrapper: {
    width: '282px',
    marginRight: '95px',
  },
  itemName: {
    fontSize: theme.appFixedDimensions.fontSize.large,
     color: '#111111',
  },
  totalMsg: {
    display: 'flex',
    justifyContent: 'space-between'
  },
  delIcon: {
    fontSize: 32,
    color: theme.palette.secondary.light,
  },
  footer: {
    margin: theme.spacing.unit * 3,
  },
  actionAreaOverlay: {
    position: "absolute",
    background: "rgba(0, 0, 0, 0.10)",
    borderRadius: '1.5px',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 350,
  },
});
