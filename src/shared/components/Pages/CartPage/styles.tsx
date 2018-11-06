import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  title: {
    height: '36px',
    marginTop: theme.spacing.unit * 2,
    marginBottom: theme.spacing.unit * 2,
  },
  fullWidth: {
    width: '100%',
  },
  listItem: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
  },
  imgWrapper: {
    width: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    marginRight: theme.spacing.unit * 3,
    position: 'relative',
  },
  itemWrapper: {
    width: '40%',
  },
  itemName: {
    fontSize: theme.appFixedDimensions.fontSize.large,
     color: '#111111',
  },
  itemAttr: {
    letterSpacing: '0.4px',
    color: '#787878',
  },
  quantityForm: {
    width: '20%',
    textAlign: 'right',
    paddingRight: theme.spacing.unit,
  },
  priceWrapper: {
    width: '20%',
    textAlign: 'right',
    paddingRight: theme.spacing.unit * 3,

  },
  totalMsg: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.unit * 3
  },
  footer: {
    margin: `${theme.spacing.unit * 3}px 0`,
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
