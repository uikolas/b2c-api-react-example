import { Theme } from '@material-ui/core/styles/createMuiTheme';
import createStyles from '@material-ui/core/styles/createStyles';

export const styles = (theme: Theme) => createStyles({
  root: {
    marginBottom: theme.spacing.unit * 4,
  },
  fullWidth: {
    width: '100%',
  },
  listItem: {
    paddingTop: theme.spacing.unit * 3,
    paddingBottom: theme.spacing.unit * 3,
    alignItems: 'start',
  },
  listTitle: {
    width: '100%',
    height: '18px',
    marginTop: theme.spacing.unit * 3,
    marginBottom: theme.spacing.unit * 2,
    display: 'flex',
    letterSpacing: '0.2px',
    color: theme.appColors.grey,
  },
  calcDivider: {
    width: '100%',
    marginTop: '58px'
  },
  imgWrapper: {
    width: '20%',
    minWidth: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '4px',
    position: 'relative',
  },
  itemWrapper: {
    width: '40%',
    paddingLeft: theme.spacing.unit * 3,
  },
  itemName: {
    fontSize: theme.appFixedDimensions.fontSize.large,
  },
  itemAttr: {
    letterSpacing: '0.2px',
    color: theme.appColors.grey,
    lineHeight: '24px',
  },
  textCapitalize: {
    textTransform: 'capitalize',
  },
  remove: {
    letterSpacing: '0.4px',
    textTransform: 'uppercase',
    fontSize: theme.appFixedDimensions.fontSize.small,
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
  sumWrapper: {
    lineHeight: '26px',
    verticalAlign: 'middle',
  },
  totalMsg: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: theme.spacing.unit * 3,
  },
  grandTotal: {
    marginBottom: theme.spacing.unit * 3,
    fontSize: '24px',
    fontWeight: 'bold',
    letterSpacing: '0.5px',
  },
  btnWrapper: {
    margin: `${theme.spacing.unit * 3}px 0`,
    height: '44px',
  },
  mainCurrency: {
    fontSize: theme.appFixedDimensions.fontSize.large,
  },
  eachCurrency: {
    fontSize: theme.appFixedDimensions.fontSize.medium,
  },
  select: {
    width: '50px',
    height: '22px',
  },
  shippingMsg: {
    textTransform: 'none',
    marginTop: '-16px',
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
